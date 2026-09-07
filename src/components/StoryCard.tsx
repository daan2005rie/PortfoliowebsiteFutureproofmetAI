import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, User, Target } from 'lucide-react';
import { TypeStory } from '../types';

interface StoryCardProps {
  story: TypeStory;
  progressPercentage?: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, progressPercentage = 75 }) => {
  const [showFullBreakdown, setShowFullBreakdown] = useState<boolean>(false);

  const fullDefinitionText = `${story.definition.role}, ${story.definition.want.toLowerCase()}, ${story.definition.benefit.toLowerCase()}`;

  return (
    <section
      id="user-story-card"
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs transition-shadow hover:shadow-sm"
    >
      {/* Top flex: Badge + Title and Totale Voortgang indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded tracking-wider inline-block">
            Type Story: {story.code} – {story.name}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-2 leading-tight text-slate-900">
            Impact van AI op B2C Marketing
          </h2>
        </div>

        <div className="text-left sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl w-full sm:w-auto">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">
            Totale Voortgang
          </p>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-bold text-slate-900 text-sm">{progressPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Styled italic blockquote matching Sleek Interface theme */}
      <div className="relative">
        <p className="text-slate-600 text-sm italic leading-relaxed border-l-4 border-indigo-200 pl-4 py-1.5 bg-slate-50/60 rounded-r-xl">
          "{fullDefinitionText}"
        </p>
      </div>

      {/* Detail toggles & contextual tags */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold text-slate-700 bg-slate-100">
            <User className="w-3.5 h-3.5 text-slate-500" />
            B2C Marketeer
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            LU 1 & LU 3
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            4 Acceptatie + 4 Kwaliteitscriteria
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowFullBreakdown(!showFullBreakdown)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>{showFullBreakdown ? 'Verberg structuur' : 'Toon Als/Wil/Zodat'}</span>
          {showFullBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Structured Als / Wil ik / Zodat view when expanded */}
      {showFullBreakdown && (
        <div className="mt-4 space-y-2.5 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 shrink-0">
              Als
            </span>
            <p className="text-slate-800">{story.definition.role.replace(/^Als\s*/i, '')}</p>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-100 shrink-0">
              Wil ik
            </span>
            <p className="text-slate-800">{story.definition.want.replace(/^wil ik\s*/i, '')}</p>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shrink-0">
              Zodat
            </span>
            <p className="text-slate-800">{story.definition.benefit.replace(/^zodat\s*/i, '')}</p>
          </div>
        </div>
      )}
    </section>
  );
};

