/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyQuoteCard } from './components/DailyQuoteCard';
import { StoryCard } from './components/StoryCard';
import { ProgressCard } from './components/ProgressCard';
import { CriteriaSection } from './components/CriteriaSection';
import { DailyReflectionSection } from './components/DailyReflectionSection';
import { DiarySection } from './components/DiarySection';
import { TYPE_STORIES, getCurrentStory } from './data/storyRegistry';
import { StorageService } from './services/storageService';
import { CriteriaProgressState, CriterionStatus, QuestionAnswer } from './types';
import { BookOpen, CheckCircle2, Target, HelpCircle, Code2, Layers } from 'lucide-react';

export default function App() {
  const [currentStoryCode, setCurrentStoryCode] = useState<string>('RS');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [progress, setProgress] = useState<CriteriaProgressState>({});
  const [showArchInfo, setShowArchInfo] = useState<boolean>(false);

  const currentStory = getCurrentStory(currentStoryCode);

  useEffect(() => {
    const loaded = StorageService.getCriteriaProgress(currentStory);
    setProgress(loaded);
  }, [currentStory]);

  const handleUpdateCriterionStatus = (criterionId: string, status: CriterionStatus, notes?: string) => {
    const updated = StorageService.updateCriterionStatus(currentStory, criterionId, status, notes);
    setProgress({ ...updated });
  };

  const handleSyncCriteriaFromAnswers = (answers: QuestionAnswer[]) => {
    const updated = { ...progress };

    const mapStatus = (answer: string | null): CriterionStatus => {
      if (answer === 'ja') return 'behaald';
      if (answer === 'gedeeltelijk') return 'bezig';
      return 'nog_niet';
    };

    answers.forEach((a) => {
      if (a.questionId === 'rq-1') {
        updated['ac-1'] = { status: mapStatus(a.answer), notes: a.explanation || updated['ac-1']?.notes, lastUpdated: new Date().toISOString() };
      } else if (a.questionId === 'rq-2') {
        updated['ac-2'] = { status: mapStatus(a.answer), notes: a.explanation || updated['ac-2']?.notes, lastUpdated: new Date().toISOString() };
      } else if (a.questionId === 'rq-3') {
        updated['ac-3'] = { status: mapStatus(a.answer), notes: a.explanation || updated['ac-3']?.notes, lastUpdated: new Date().toISOString() };
      } else if (a.questionId === 'rq-4') {
        updated['ac-4'] = { status: mapStatus(a.answer), notes: a.explanation || updated['ac-4']?.notes, lastUpdated: new Date().toISOString() };
      } else if (a.questionId === 'rq-5') {
        const qStatus = mapStatus(a.answer);
        ['qc-1', 'qc-2', 'qc-3', 'qc-4'].forEach((qcId) => {
          updated[qcId] = { status: qStatus, notes: a.explanation || updated[qcId]?.notes, lastUpdated: new Date().toISOString() };
        });
      }
    });

    StorageService.saveCriteriaProgress(updated);
    setProgress(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Sticky Header with Navigation Tabs */}
      <Header
        currentStory={currentStory}
        allStories={TYPE_STORIES}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: UNIFIED DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-7">
            {/* Top Grid: Quote of the Day & Progress Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-6 flex flex-col">
                <DailyQuoteCard />
              </div>
              <div className="lg:col-span-6 flex flex-col">
                <ProgressCard
                  story={currentStory}
                  progress={progress}
                  onOpenReflection={() => setActiveTab('questions')}
                />
              </div>
            </div>

            {/* Mijn User Story */}
            <StoryCard story={currentStory} />

            {/* Criteria Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <CriteriaSection
                  story={currentStory}
                  progress={progress}
                  onUpdateStatus={handleUpdateCriterionStatus}
                  filterType="acceptance"
                />
              </div>
              <div>
                <CriteriaSection
                  story={currentStory}
                  progress={progress}
                  onUpdateStatus={handleUpdateCriterionStatus}
                  filterType="quality"
                />
              </div>
            </div>

            {/* Daily Reflection & Diary Preview */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-7">
                <DailyReflectionSection
                  story={currentStory}
                  onSyncCriteriaFromAnswers={handleSyncCriteriaFromAnswers}
                />
              </div>
              <div className="xl:col-span-5">
                <DiarySection storyCode={currentStory.code} />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MIJN USER STORY */}
        {activeTab === 'story' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <StoryCard story={currentStory} />

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                Koppeling met Leeruitkomsten (LU 1 & LU 3)
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Deze Research Story legt een onderbouwde basis om te bepalen welke AI-toepassingen daadwerkelijk waarde toevoegen binnen het B2C werkveld en welke skills je dient te ontwikkelen om als HBO marketeer future-proof te opereren.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-slate-900 block">LU 1: Analyseren & Onderzoeken</span>
                  <span className="text-slate-600">
                    Onderbouwd in kaart brengen van AI-kansen, bedreigingen en ethiek via triangulatie en betrouwbare bronnen.
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-slate-900 block">LU 3: Professionele Vaardigheden</span>
                  <span className="text-slate-600">
                    Identificatie van de top 5 AI-skills en feedbackverwerking in het professionele werkveld.
                  </span>
                </div>
              </div>
            </div>

            <ProgressCard
              story={currentStory}
              progress={progress}
              onOpenReflection={() => setActiveTab('questions')}
            />
          </div>
        )}

        {/* VIEW 3: ACCEPTATIECRITERIA */}
        {activeTab === 'acceptance' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <CriteriaSection
              story={currentStory}
              progress={progress}
              onUpdateStatus={handleUpdateCriterionStatus}
              filterType="acceptance"
            />
          </div>
        )}

        {/* VIEW 4: KWALITEITSCRITERIA */}
        {activeTab === 'quality' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <CriteriaSection
              story={currentStory}
              progress={progress}
              onUpdateStatus={handleUpdateCriterionStatus}
              filterType="quality"
            />
          </div>
        )}

        {/* VIEW 5: DAGELIJKSE VRAGEN */}
        {activeTab === 'questions' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <DailyReflectionSection
              story={currentStory}
              onSyncCriteriaFromAnswers={handleSyncCriteriaFromAnswers}
            />
          </div>
        )}

        {/* VIEW 6: MIJN DAGBOEK */}
        {activeTab === 'diary' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <DiarySection storyCode={currentStory.code} />
          </div>
        )}
      </main>

      {/* Footer & Architecture Readiness Note */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>HBO Student Dagboek & Progress Tracker</span>
            <span>•</span>
            <span className="font-medium text-slate-700">RS – Research Story</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowArchInfo(!showArchInfo)}
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Modulaire architectuur (Type Story Register)</span>
            </button>
          </div>
        </div>

        {/* Architecture Info Drawer */}
        {showArchInfo && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Flexibele Type Story Architectuur</span>
              </div>
              <p>
                De applicatie is gebouwd met een strikt modulaire architectuur via <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[11px]">TypeStory</code> en het <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[11px]">TYPE_STORIES</code> register. Op dit moment is uitsluitend de gevraagde <strong>RS (Research Story)</strong> actief, met exact de 4 acceptatiecriteria en 4 kwaliteitscriteria.
              </p>
              <p>
                Toekomstige Type Stories (zoals DS – Design Story of IS – Implementation Story) kunnen naadloos worden toegevoegd door simpelweg een object toe te voegen aan het register, zonder dat de layout, het dagboek of de voortgangslogica herschreven hoeft te worden.
              </p>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}
