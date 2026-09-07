import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, XCircle, Save, Calendar, History, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { AnswerOption, DailyReflectionEntry, QuestionAnswer, TypeStory } from '../types';
import { StorageService } from '../services/storageService';

interface DailyReflectionSectionProps {
  story: TypeStory;
  onSavedReflection?: () => void;
  onSyncCriteriaFromAnswers?: (answers: QuestionAnswer[]) => void;
}

export const DailyReflectionSection: React.FC<DailyReflectionSectionProps> = ({
  story,
  onSavedReflection,
  onSyncCriteriaFromAnswers,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [answers, setAnswers] = useState<Record<string, { answer: AnswerOption | null; explanation: string }>>({});
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<DailyReflectionEntry[]>([]);

  // Load reflection for selected date
  useEffect(() => {
    const existing = StorageService.getReflectionForDate(selectedDate);
    const initialMap: Record<string, { answer: AnswerOption | null; explanation: string }> = {};

    story.reflectionQuestions.forEach((q) => {
      const match = existing?.answers.find((a) => a.questionId === q.id);
      initialMap[q.id] = {
        answer: match?.answer || null,
        explanation: match?.explanation || '',
      };
    });

    setAnswers(initialMap);
    setIsSavedSuccess(false);
  }, [selectedDate, story]);

  // Load history
  const refreshHistory = () => {
    setHistoryList(StorageService.getDailyReflections());
  };

  useEffect(() => {
    refreshHistory();
  }, []);

  const handleSelectAnswer = (questionId: string, answer: AnswerOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer,
      },
    }));
    setIsSavedSuccess(false);
  };

  const handleExplanationChange = (questionId: string, explanation: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        explanation,
      },
    }));
    setIsSavedSuccess(false);
  };

  const calculateScore = () => {
    let score = 0;
    let answered = 0;
    const total = story.reflectionQuestions.length;

    story.reflectionQuestions.forEach((q) => {
      const a = answers[q.id];
      if (a?.answer === 'ja') {
        score += 100;
        answered++;
      } else if (a?.answer === 'gedeeltelijk') {
        score += 50;
        answered++;
      } else if (a?.answer === 'nee') {
        answered++;
      }
    });

    if (answered === 0) return 0;
    return Math.round(score / total);
  };

  const handleSave = () => {
    const questionAnswers: QuestionAnswer[] = story.reflectionQuestions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id]?.answer || null,
      explanation: answers[q.id]?.explanation || '',
    }));

    const score = calculateScore();

    StorageService.saveDailyReflection({
      date: selectedDate,
      storyCode: story.code,
      answers: questionAnswers,
      calculatedScore: score,
    });

    setIsSavedSuccess(true);
    refreshHistory();
    if (onSavedReflection) onSavedReflection();

    setTimeout(() => {
      setIsSavedSuccess(false);
    }, 4000);
  };

  const handleApplyToCriteria = () => {
    handleSave();
    if (onSyncCriteriaFromAnswers) {
      const questionAnswers: QuestionAnswer[] = story.reflectionQuestions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id]?.answer || null,
        explanation: answers[q.id]?.explanation || '',
      }));
      onSyncCriteriaFromAnswers(questionAnswers);
    }
  };

  const totalAnswered = story.reflectionQuestions.filter((q) => {
    const a = answers[q.id];
    return a && a.answer !== null && a.answer !== undefined;
  }).length;
  const currentScore = calculateScore();

  return (
    <section id="daily-questions-card" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-100">
            📝
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Dagelijkse reflectie (De 5 vragen)
            </h2>
            <p className="text-[11px] text-slate-500">
              Gericht op de User Story, de 4 acceptatiecriteria en de 4 kwaliteitscriteria
            </p>
          </div>
        </div>

        {/* Date Selector and History Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none focus:outline-none font-medium text-slate-800 text-xs cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Geschiedenis ({historyList.length})</span>
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* History Drawer */}
      {showHistory && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Eerdere reflecties
          </h4>
          {historyList.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Nog geen eerdere reflecties opgeslagen.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {historyList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedDate(item.date);
                    setShowHistory(false);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDate === item.date
                      ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{item.date}</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold text-[10px]">
                      {item.calculatedScore ?? 0}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {item.answers.filter((a) => a.answer === 'ja').length}x Ja,{' '}
                    {item.answers.filter((a) => a.answer === 'gedeeltelijk').length}x Gedeeltelijk
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Progress banner for answering */}
      <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700">
            Voortgang vandaag ({selectedDate}):
          </span>
          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-xs">
            {totalAnswered} van de 5 beantwoord
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Reflectie-score:</span>
          <span className="font-bold text-indigo-700 text-sm">{currentScore}%</span>
        </div>
      </div>

      {/* The 5 Questions */}
      <div className="space-y-5">
        {story.reflectionQuestions.map((q, idx) => {
          const currentAnswer = answers[q.id]?.answer;
          const currentExpl = answers[q.id]?.explanation || '';

          return (
            <div
              key={q.id}
              id={`question-item-${q.id}`}
              className="bg-white rounded-xl p-4 border border-slate-200/90 space-y-3 transition-colors hover:border-slate-300"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-100">
                  V{idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                  {q.relatedCriterionId && (
                    <span className="inline-block text-[10px] font-medium text-slate-400 mt-0.5">
                      {q.relatedCriterionId === 'qc-all'
                        ? 'Gekoppeld aan: 4 Kwaliteitscriteria'
                        : `Gekoppeld aan: Acceptatiecriterium ${idx + 1}`}
                    </span>
                  )}
                </div>
              </div>

              {/* Answer Choices: Ja, Gedeeltelijk, Nee */}
              <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                {/* Ja */}
                <button
                  type="button"
                  id={`btn-answer-${q.id}-ja`}
                  onClick={() => handleSelectAnswer(q.id, 'ja')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentAnswer === 'ja'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ja</span>
                </button>

                {/* Gedeeltelijk */}
                <button
                  type="button"
                  id={`btn-answer-${q.id}-gedeeltelijk`}
                  onClick={() => handleSelectAnswer(q.id, 'gedeeltelijk')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentAnswer === 'gedeeltelijk'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deels</span>
                </button>

                {/* Nee */}
                <button
                  type="button"
                  id={`btn-answer-${q.id}-nee`}
                  onClick={() => handleSelectAnswer(q.id, 'nee')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentAnswer === 'nee'
                      ? 'bg-slate-700 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Nee</span>
                </button>
              </div>

              {/* Toelichting field */}
              <div>
                <input
                  type="text"
                  value={currentExpl}
                  onChange={(e) => handleExplanationChange(q.id, e.target.value)}
                  placeholder={q.explanationHint || 'Korte toelichting (optioneel)...'}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          {isSavedSuccess && (
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reflectie succesvol opgeslagen voor {selectedDate}!</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
          <button
            type="button"
            id="btn-sync-criteria"
            onClick={handleApplyToCriteria}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Opslaan & criteria bijwerken</span>
          </button>

          <button
            type="button"
            id="btn-save-reflection"
            onClick={handleSave}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Opslaan</span>
          </button>
        </div>
      </div>
    </section>
  );
};
