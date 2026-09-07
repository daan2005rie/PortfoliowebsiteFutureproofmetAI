import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { QuoteData } from '../types';

export const DailyQuoteCard: React.FC = () => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchQuote = async (forceNew = false) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/quote');
      if (!response.ok) {
        throw new Error('Kon geen spreuk ophalen');
      }
      const data: { quote: string; author: string; source: 'gemini' | 'fallback' } = await response.json();
      const today = new Date().toISOString().split('T')[0];
      const newQuote: QuoteData = {
        quote: data.quote,
        author: data.author || 'Google AI',
        source: data.source,
        fetchedDate: today,
      };
      setQuoteData(newQuote);
      StorageService.saveCachedQuote(newQuote);
    } catch (err) {
      console.warn('Spreuk van de dag opgehaald via offline inspiratiemodus.');
      const fallback: QuoteData = {
        quote: 'De beste manier om de toekomst te voorspellen, is door deze zelf vorm te geven met de juiste kennis.',
        author: 'Inspiratie voor HBO-studenten',
        source: 'fallback',
        fetchedDate: new Date().toISOString().split('T')[0],
      };
      setQuoteData(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cached = StorageService.getCachedQuote();
    const today = new Date().toISOString().split('T')[0];

    if (cached && cached.fetchedDate === today && cached.quote) {
      setQuoteData(cached);
    } else {
      fetchQuote(false);
    }
  }, []);

  return (
    <section
      id="daily-quote-card"
      className="bg-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden flex-shrink-0"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">
              ✨ Spreuk van de dag
            </p>
            <span className="text-[10px] text-indigo-300/80 font-medium">
              {quoteData?.source === 'gemini' ? 'Google AI' : 'HBO Inspiratie'}
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-2 py-3 animate-pulse">
              <div className="h-4 bg-indigo-700/60 rounded w-5/6" />
              <div className="h-4 bg-indigo-700/60 rounded w-2/3" />
            </div>
          ) : (
            <blockquote className="text-base sm:text-lg font-serif italic mb-3 leading-snug text-indigo-50">
              "{quoteData?.quote || 'De beste manier om de toekomst te voorspellen, is door deze zelf vorm te geven met de juiste kennis.'}"
            </blockquote>
          )}

          {!isLoading && (
            <p className="text-xs text-indigo-300 font-sans mb-4">
              — {quoteData?.author || 'Google AI'}
            </p>
          )}
        </div>

        <div>
          <button
            id="btn-refresh-quote"
            type="button"
            onClick={() => fetchQuote(true)}
            disabled={isLoading}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Google AI genereert...' : 'Nieuwe spreuk'}</span>
          </button>
        </div>

        {errorMsg && (
          <p className="text-[10px] text-amber-200 mt-2 text-center opacity-80">
            {errorMsg}
          </p>
        )}
      </div>

      {/* Decorative Quote Watermark from Sleek Theme */}
      <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-white">
        <svg className="w-24 h-24 sm:w-28 sm:h-28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 7.55228 2.017 7V5C2.017 4.44772 2.46472 4 3.017 4H7.017C8.67386 4 10.017 5.34315 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H2.017Z" />
        </svg>
      </div>
    </section>
  );
};

