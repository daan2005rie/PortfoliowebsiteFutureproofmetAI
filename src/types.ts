/**
 * Types for the HBO Student Diary & Progress Tracker
 * Built with modular architecture to support future Type Stories.
 */

export type CriterionType = 'acceptance' | 'quality';

export type CriterionStatus = 'behaald' | 'bezig' | 'nog_niet';

export interface Criterion {
  id: string;
  type: CriterionType;
  title?: string; // Optional short title (e.g. "Triangulatie & Bronkwaliteit")
  description: string;
  doWeText?: string; // e.g. "Doen we de juiste dingen?" or "Doen we de dingen juist?"
}

export interface ReflectionQuestion {
  id: string;
  question: string;
  relatedCriterionId?: string;
  explanationHint?: string;
}

export interface TypeStory {
  code: string; // e.g., "RS"
  name: string; // e.g., "Research Story"
  tag: string; // e.g., "🏷️ RS – Research Story"
  definition: {
    role: string; // "Als B2C online marketeer,"
    want: string; // "wil ik de impact (kansen, bedreigingen en ethische aspecten) van AI op mijn werkveld analyseren en de benodigde skills in kaart brengen,"
    benefit: string; // "zodat ik een onderbouwde basis heb om te bepalen welke AI-toepassingen waarde toevoegen en welke vaardigheden ik moet ontwikkelen (gekoppeld aan LU 1 & LU 3)."
    fullText?: string;
  };
  acceptanceCriteria: Criterion[];
  qualityCriteria: Criterion[];
  reflectionQuestions: ReflectionQuestion[];
}

export type AnswerOption = 'ja' | 'gedeeltelijk' | 'nee';

export interface QuestionAnswer {
  questionId: string;
  answer: AnswerOption | null;
  explanation: string;
}

export interface DailyReflectionEntry {
  id: string;
  date: string; // YYYY-MM-DD
  storyCode: string;
  answers: QuestionAnswer[];
  calculatedScore?: number; // percentage based on Ja (100%), Gedeeltelijk (50%), Nee (0%)
  createdAt: string;
  updatedAt: string;
}

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  storyCode: string;
  content: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CriteriaProgressState {
  [criterionId: string]: {
    status: CriterionStatus;
    notes?: string;
    lastUpdated?: string;
  };
}

export interface QuoteData {
  quote: string;
  author: string;
  source: 'gemini' | 'fallback';
  fetchedDate?: string;
}
