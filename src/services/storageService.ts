import { CriteriaProgressState, DailyReflectionEntry, DiaryEntry, QuoteData, TypeStory } from '../types';

const STORAGE_KEYS = {
  CRITERIA_PROGRESS: 'hbo_tracker_criteria_progress_v1',
  DAILY_REFLECTIONS: 'hbo_tracker_daily_reflections_v1',
  DIARY_ENTRIES: 'hbo_tracker_diary_entries_v1',
  DAILY_QUOTE: 'hbo_tracker_daily_quote_v1',
};

// Initial default state for criteria
export function getInitialCriteriaProgress(story: TypeStory): CriteriaProgressState {
  const initial: CriteriaProgressState = {};
  const allCriteria = [...story.acceptanceCriteria, ...story.qualityCriteria];
  allCriteria.forEach((crit) => {
    initial[crit.id] = {
      status: 'nog_niet',
      notes: '',
      lastUpdated: new Date().toISOString(),
    };
  });
  return initial;
}

export const StorageService = {
  // --- Criteria Progress ---
  getCriteriaProgress(story: TypeStory): CriteriaProgressState {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CRITERIA_PROGRESS);
      if (!saved) return getInitialCriteriaProgress(story);
      const parsed = JSON.parse(saved);
      // Ensure all criteria are present
      const initial = getInitialCriteriaProgress(story);
      return { ...initial, ...parsed };
    } catch {
      return getInitialCriteriaProgress(story);
    }
  },

  saveCriteriaProgress(progress: CriteriaProgressState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CRITERIA_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save criteria progress', e);
    }
  },

  updateCriterionStatus(
    story: TypeStory,
    criterionId: string,
    status: 'behaald' | 'bezig' | 'nog_niet',
    notes?: string
  ): CriteriaProgressState {
    const current = this.getCriteriaProgress(story);
    current[criterionId] = {
      status,
      notes: notes !== undefined ? notes : current[criterionId]?.notes || '',
      lastUpdated: new Date().toISOString(),
    };
    this.saveCriteriaProgress(current);
    return current;
  },

  // --- Daily Reflections (The 5 Questions) ---
  getDailyReflections(): DailyReflectionEntry[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_REFLECTIONS);
      if (!saved) return [];
      const list: DailyReflectionEntry[] = JSON.parse(saved);
      // Sort newest date first
      return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
      return [];
    }
  },

  getReflectionForDate(dateStr: string): DailyReflectionEntry | undefined {
    const list = this.getDailyReflections();
    return list.find((r) => r.date === dateStr);
  },

  saveDailyReflection(entry: Omit<DailyReflectionEntry, 'id' | 'createdAt' | 'updatedAt'>): DailyReflectionEntry {
    const list = this.getDailyReflections();
    const existingIndex = list.findIndex((r) => r.date === entry.date && r.storyCode === entry.storyCode);
    const now = new Date().toISOString();

    let savedEntry: DailyReflectionEntry;

    if (existingIndex >= 0) {
      savedEntry = {
        ...list[existingIndex],
        ...entry,
        updatedAt: now,
      };
      list[existingIndex] = savedEntry;
    } else {
      savedEntry = {
        ...entry,
        id: `refl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: now,
        updatedAt: now,
      };
      list.unshift(savedEntry);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_REFLECTIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save daily reflection', e);
    }

    return savedEntry;
  },

  // --- Diary Notes ---
  getDiaryEntries(): DiaryEntry[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES);
      if (!saved) {
        // Seed an initial friendly welcome diary note so the student sees immediate layout clarity
        const initialDate = new Date().toISOString().split('T')[0];
        const initialEntries: DiaryEntry[] = [
          {
            id: 'initial_entry_1',
            date: initialDate,
            storyCode: 'RS',
            title: 'Start van het AI B2C marketing onderzoek',
            content: 'Vandaag gestart met het in kaart brengen van de onderzoeksvragen en de opzet van het verslag. Reeds begonnen met gestructureerde prompts in meerdere LLM\'s voor triangulatie van bronnen.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ];
        localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(initialEntries));
        return initialEntries;
      }
      const list: DiaryEntry[] = JSON.parse(saved);
      // Newest first by date and createdAt
      return list.sort((a, b) => {
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } catch {
      return [];
    }
  },

  saveDiaryEntry(entry: { id?: string; date: string; storyCode: string; content: string; title?: string }): DiaryEntry {
    const list = this.getDiaryEntries();
    const now = new Date().toISOString();

    if (entry.id) {
      const idx = list.findIndex((e) => e.id === entry.id);
      if (idx >= 0) {
        const updated: DiaryEntry = {
          ...list[idx],
          date: entry.date,
          content: entry.content,
          title: entry.title,
          updatedAt: now,
        };
        list[idx] = updated;
        localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(list));
        return updated;
      }
    }

    const newEntry: DiaryEntry = {
      id: `diary_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: entry.date,
      storyCode: entry.storyCode,
      content: entry.content,
      title: entry.title,
      createdAt: now,
      updatedAt: now,
    };

    list.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(list));
    return newEntry;
  },

  deleteDiaryEntry(id: string): void {
    const list = this.getDiaryEntries();
    const filtered = list.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(filtered));
  },

  // --- Quote of the Day ---
  getCachedQuote(): QuoteData | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_QUOTE);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  },

  saveCachedQuote(quote: QuoteData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_QUOTE, JSON.stringify(quote));
    } catch (e) {
      console.error('Failed to cache quote', e);
    }
  }
};
