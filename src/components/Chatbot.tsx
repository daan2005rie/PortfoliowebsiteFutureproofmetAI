import { FormEvent, useState } from 'react';
import { LoaderCircle, Send, Sparkles } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

export function Chatbot() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    const nextMessages = [...messages, { role: 'user' as const, text: trimmedQuestion }];
    setMessages(nextMessages);
    setQuestion('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gemini kon geen antwoord geven.');
      }

      const answer = data.answer;
      if (!answer) throw new Error('Gemini gaf geen tekst terug.');
      setMessages((current) => [...current, { role: 'model', text: answer }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Er ging iets mis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="chatbot-section" aria-labelledby="chatbot-title">
      <div className="chatbot-heading">
        <div>
          <p className="section-kicker"><Sparkles size={14} /> Gemini chatbot</p>
          <h2 id="chatbot-title">Stel een vraag over mijn portfolio</h2>
        </div>
      </div>

      <div className="chatbot-messages" aria-live="polite">
        {messages.length === 0 && <p className="chatbot-empty">Stel hieronder je eerste vraag.</p>}
        {messages.map((message, index) => (
          <div className={`chatbot-message ${message.role}`} key={`${message.role}-${index}`}>
            {message.text}
          </div>
        ))}
        {isLoading && <div className="chatbot-message model chatbot-loading"><LoaderCircle size={16} /> Gemini denkt na...</div>}
      </div>

      <form className="chatbot-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Typ je vraag..."
          aria-label="Jouw vraag"
          disabled={isLoading}
        />
        <button type="submit" aria-label="Vraag versturen" disabled={!question.trim() || isLoading}>
          <Send size={17} />
        </button>
      </form>
      {error && <p className="chatbot-error">{error}</p>}
    </section>
  );
}