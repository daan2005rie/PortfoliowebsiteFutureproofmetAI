import React from 'react';
import { Layers, Calendar } from 'lucide-react';
import { TypeStory } from '../types';

interface HeaderProps {
  currentStory: TypeStory;
  allStories: TypeStory[];
  onSelectStory?: (code: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStory,
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'story', label: 'User Story' },
    { id: 'acceptance', label: 'Acceptatiecriteria' },
    { id: 'quality', label: 'Kwaliteitscriteria' },
    { id: 'questions', label: 'Dagelijkse vragen' },
    { id: 'diary', label: 'Dagboek' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 shadow-xs sticky top-0 z-30">
      {/* Brand / Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>HBO Student Tracker</span>
            <span className="text-indigo-600 font-extrabold">/ {currentStory.code}</span>
          </h1>
        </div>
      </div>

      {/* Navigation and User Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="flex gap-2 sm:gap-5 text-xs sm:text-sm font-medium text-slate-500 overflow-x-auto py-1 scrollbar-none" aria-label="Tabs">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1 font-bold'
                    : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent pb-1'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* User Info from theme */}
        <div className="hidden md:flex items-center gap-2.5 border-l pl-5 border-slate-200">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900 leading-tight">Daan van Veen</p>
            <p className="text-[10px] text-slate-500 leading-tight">B2C Marketing Student</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
            DV
          </div>
        </div>
      </div>
    </header>
  );
};

