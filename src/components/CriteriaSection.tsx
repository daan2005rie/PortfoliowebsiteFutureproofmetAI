import React, { useState } from 'react';
import { CheckCircle2, Clock, Circle, MessageSquare, ChevronDown, ChevronUp, Check, Save } from 'lucide-react';
import { Criterion, CriterionStatus, CriteriaProgressState, TypeStory } from '../types';

interface CriteriaSectionProps {
  story: TypeStory;
  progress: CriteriaProgressState;
  onUpdateStatus: (criterionId: string, status: CriterionStatus, notes?: string) => void;
  filterType?: 'all' | 'acceptance' | 'quality';
}

export const CriteriaSection: React.FC<CriteriaSectionProps> = ({
  story,
  progress,
  onUpdateStatus,
  filterType = 'all',
}) => {
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const handleStatusChange = (criterionId: string, newStatus: CriterionStatus) => {
    const currentNote = noteInputs[criterionId] !== undefined ? noteInputs[criterionId] : progress[criterionId]?.notes;
    onUpdateStatus(criterionId, newStatus, currentNote);
  };

  const handleSaveNote = (criterionId: string) => {
    const currentStatus = progress[criterionId]?.status || 'nog_niet';
    const noteText = noteInputs[criterionId] !== undefined ? noteInputs[criterionId] : progress[criterionId]?.notes || '';
    onUpdateStatus(criterionId, currentStatus, noteText);
    setOpenNoteId(null);
  };

  const toggleNote = (id: string, currentSavedNote = '') => {
    if (openNoteId === id) {
      setOpenNoteId(null);
    } else {
      setOpenNoteId(id);
      if (noteInputs[id] === undefined) {
        setNoteInputs((prev) => ({ ...prev, [id]: currentSavedNote }));
      }
    }
  };

  const renderCriterionItem = (criterion: Criterion, index: number) => {
    const state = progress[criterion.id] || { status: 'nog_niet', notes: '' };
    const currentStatus = state.status;
    const isNoteOpen = openNoteId === criterion.id;
    const noteValue = noteInputs[criterion.id] !== undefined ? noteInputs[criterion.id] : state.notes || '';
    const isQuality = criterion.type === 'quality';

    return (
      <div
        key={criterion.id}
        id={`criterion-card-${criterion.id}`}
        className={`transition-all rounded-xl p-3 sm:p-3.5 border ${
          currentStatus === 'behaald'
            ? 'bg-slate-50 border-slate-200/90'
            : currentStatus === 'bezig'
            ? 'bg-amber-50/40 border-amber-200'
            : 'border border-dashed border-slate-300 bg-white'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          {/* Criterion Content matching Sleek theme */}
          <div className="flex items-start gap-3 flex-1">
            {isQuality ? (
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  currentStatus === 'behaald'
                    ? 'bg-indigo-600'
                    : currentStatus === 'bezig'
                    ? 'bg-amber-500'
                    : 'bg-slate-300'
                }`}
              />
            ) : (
              <button
                type="button"
                onClick={() => handleStatusChange(criterion.id, currentStatus === 'behaald' ? 'nog_niet' : 'behaald')}
                className="mt-0.5 shrink-0 cursor-pointer focus:outline-none"
                title={currentStatus === 'behaald' ? 'Markeer als nog niet' : 'Markeer als behaald'}
              >
                <input
                  type="checkbox"
                  checked={currentStatus === 'behaald'}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                />
              </button>
            )}

            <div className="space-y-1 flex-1">
              <p className={`text-xs sm:text-xs leading-snug ${
                currentStatus === 'nog_niet' ? 'text-slate-500' : 'text-slate-700 font-medium'
              }`}>
                {criterion.title && (
                  <span className="font-bold text-slate-900 mr-1.5">
                    {criterion.title}:
                  </span>
                )}
                {criterion.description}
              </p>

              {state.notes && !isNoteOpen && (
                <div className="mt-1.5 text-[11px] bg-white border border-slate-200/80 rounded-lg p-2 text-slate-600 flex items-start gap-1.5">
                  <MessageSquare className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-700">Notitie: </span>
                    <span>{state.notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Sleek Status Selection and Note Button */}
          <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0">
            <button
              type="button"
              id={`btn-${criterion.id}-behaald`}
              onClick={() => handleStatusChange(criterion.id, 'behaald')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                currentStatus === 'behaald'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              Ja
            </button>

            <button
              type="button"
              id={`btn-${criterion.id}-bezig`}
              onClick={() => handleStatusChange(criterion.id, 'bezig')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                currentStatus === 'bezig'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              Deels
            </button>

            <button
              type="button"
              id={`btn-${criterion.id}-nog-niet`}
              onClick={() => handleStatusChange(criterion.id, 'nog_niet')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                currentStatus === 'nog_niet'
                  ? 'bg-slate-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Nee
            </button>

            {/* Toggle Note Input */}
            <button
              type="button"
              onClick={() => toggleNote(criterion.id, state.notes)}
              title="Aantekening toevoegen of bewerken"
              className={`p-1 rounded text-xs border transition-colors cursor-pointer ${
                isNoteOpen || state.notes
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Note Drawer */}
        {isNoteOpen && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 space-y-2">
            <textarea
              rows={2}
              value={noteValue}
              onChange={(e) => setNoteInputs({ ...noteInputs, [criterion.id]: e.target.value })}
              placeholder="Korte toelichting, bewijslast of bronlink..."
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            />
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setOpenNoteId(null)}
                className="px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded"
              >
                Sluiten
              </button>
              <button
                type="button"
                onClick={() => handleSaveNote(criterion.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                <Save className="w-3 h-3" />
                <span>Opslaan</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const showAcceptance = filterType === 'all' || filterType === 'acceptance';
  const showQuality = filterType === 'all' || filterType === 'quality';

  return (
    <div className="space-y-6">
      {/* 1. Acceptatiecriteria */}
      {showAcceptance && (
        <section
          id="acceptance-criteria-card"
          className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col shadow-xs"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              Acceptatiecriteria
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              {story.acceptanceCriteria.filter((c) => progress[c.id]?.status === 'behaald').length} van de 4 behaald
            </span>
          </div>

          <div className="space-y-2.5 flex-grow">
            {story.acceptanceCriteria.map((crit, idx) => renderCriterionItem(crit, idx))}
          </div>
        </section>
      )}

      {/* 2. Kwaliteitscriteria */}
      {showQuality && (
        <section
          id="quality-criteria-card"
          className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col shadow-xs"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs">
                🎯
              </span>
              Kwaliteitscriteria
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              {story.qualityCriteria.filter((c) => progress[c.id]?.status === 'behaald').length} van de 4 behaald
            </span>
          </div>

          <div className="space-y-2.5 flex-grow">
            {story.qualityCriteria.map((crit, idx) => renderCriterionItem(crit, idx))}
          </div>
        </section>
      )}
    </div>
  );
};
