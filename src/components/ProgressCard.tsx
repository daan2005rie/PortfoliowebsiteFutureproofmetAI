import React from 'react';
import { Award, CheckCircle2, Clock, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';
import { CriteriaProgressState, TypeStory } from '../types';

interface ProgressCardProps {
  story: TypeStory;
  progress: CriteriaProgressState;
  onOpenReflection: () => void;
  reflectionScore?: number | null;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  story,
  progress,
  onOpenReflection,
  reflectionScore,
}) => {
  const allCriteria = [...story.acceptanceCriteria, ...story.qualityCriteria];
  const totalCount = allCriteria.length; // 8

  const acceptanceTotal = story.acceptanceCriteria.length; // 4
  const qualityTotal = story.qualityCriteria.length; // 4

  const acceptanceAchieved = story.acceptanceCriteria.filter(
    (c) => progress[c.id]?.status === 'behaald'
  ).length;

  const qualityAchieved = story.qualityCriteria.filter(
    (c) => progress[c.id]?.status === 'behaald'
  ).length;

  const totalAchieved = acceptanceAchieved + qualityAchieved;
  const inProgressCount = allCriteria.filter((c) => progress[c.id]?.status === 'bezig').length;
  const notStartedCount = allCriteria.filter((c) => !progress[c.id] || progress[c.id]?.status === 'nog_niet').length;

  const percentage = Math.round((totalAchieved / totalCount) * 100);

  // Status message based on percentage
  let statusText = 'Nog te starten';
  let statusColor = 'text-slate-600 bg-slate-100';
  if (percentage === 100) {
    statusText = 'Alle criteria behaald! 🎉';
    statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (percentage >= 75) {
    statusText = 'Eindfase: Bijna alle criteria behaald';
    statusColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
  } else if (percentage >= 50) {
    statusText = 'Goed op weg: Helft van de criteria behaald';
    statusColor = 'text-blue-700 bg-blue-50 border-blue-200';
  } else if (percentage > 0 || inProgressCount > 0) {
    statusText = 'In uitvoering';
    statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  return (
    <section
      id="student-progress-card"
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">Voortgang van de student</h2>
            <p className="text-[11px] text-slate-500">
              Meting op basis van de 4 acceptatie- en 4 kwaliteitscriteria
            </p>
          </div>
        </div>

        <span className={`self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusColor}`}>
          {statusText}
        </span>
      </div>

      {/* Main Metric Hero */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Big percentage & counter */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalAchieved}
              <span className="text-sm font-medium text-slate-400"> / {totalCount}</span>
            </span>
            <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
          </div>
          <p className="text-[11px] font-semibold text-slate-600 mt-1">
            Criteria behaald
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            {totalAchieved === totalCount
              ? 'Volledige User Story succesvol afgerond!'
              : `Nog ${totalCount - totalAchieved} criteria te voltooien`}
          </p>
        </div>

        {/* Breakdown counters */}
        <div className="space-y-2.5 md:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {/* Behaald */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-950 text-sm">{totalAchieved}</div>
                <div className="text-emerald-700 text-[10px] font-medium">Behaald</div>
              </div>
            </div>

            {/* Bezig */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold text-amber-950 text-sm">{inProgressCount}</div>
                <div className="text-amber-700 text-[10px] font-medium">In uitvoering</div>
              </div>
            </div>

            {/* Nog niet */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-sm">{notStartedCount}</div>
                <div className="text-slate-500 text-[10px] font-medium">Nog niet gestart</div>
              </div>
            </div>
          </div>

          {/* Sub-breakdown: Acceptatie vs Kwaliteit */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
                  Acceptatiecriteria
                </span>
                <span className="font-bold text-slate-800 text-xs">
                  {acceptanceAchieved} van {acceptanceTotal} behaald
                </span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
                  Kwaliteitscriteria
                </span>
                <span className="font-bold text-slate-800 text-xs">
                  {qualityAchieved} van {qualityTotal} behaald
                </span>
              </div>
            </div>

            <button
              id="btn-quick-reflect"
              type="button"
              onClick={onOpenReflection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200/80 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Beantwoord de 5 vragen</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
