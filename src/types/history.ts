export type EraId = 'rashidun' | 'umayyad';

export type PageView =
  | 'home'
  | 'eras'
  | 'era-detail'
  | 'story'
  | 'timeline'
  | 'map'
  | 'scholars';

export interface HistoricalSource {
  id: string;
  title: string;
  author: string;
  type: 'مصدر كلاسيكي أولي' | 'دراسة أكاديمية حديثة';
  eraNote?: string;
  citationNote: string;
}

export interface RulerProfile {
  id: string;
  name: string;
  title: string;
  reignHijri: string;
  reignGregorian: string;
  capital: string;
  summary: string;
  keyDevelopments: {
    category: 'سياسي' | 'إداري' | 'عسكري' | 'اجتماعي وثقافي';
    detail: string;
  }[];
  scholarlyNote?: string;
}

export interface HistoricalEra {
  id: EraId;
  name: string;
  englishName: string;
  periodHijri: string;
  periodGregorian: string;
  capital: string;
  image: string;
  imageCaption: string;
  summary: string;
  introduction: string;
  politicalOverview: string;
  administrativeAndCultural: string;
  expansionSummary: string;
  closingTransition: string;
  rulers: RulerProfile[];
  keyEvents: {
    yearHijri: string;
    yearGregorian: string;
    title: string;
    description: string;
    isApproximate?: boolean;
  }[];
  sources: HistoricalSource[];
}

export interface StoryScene {
  id: string;
  sceneNumber: number;
  title: string;
  dateHijri: string;
  dateGregorian: string;
  isApproximateDate?: boolean;
  location: string;
  illustration: string;
  illustrationCaption: string;
  narrative: string[];
  historicalContext: string;
  methodologyNote: {
    establishedFact: string;
    scholarlyPerspective: string;
  };
}

export interface StoryQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface HistoricalStory {
  id: string;
  eraId: EraId;
  eraLabel: string;
  title: string;
  subtitle: string;
  periodHijri: string;
  periodGregorian: string;
  readingTimeMinutes: number;
  coverImage: string;
  summary: string;
  featured?: boolean;
  scenes: StoryScene[];
  lessons: {
    factsSummary: string[];
    analyticalInsights: string[];
  };
  quiz: StoryQuizQuestion[];
  sources: HistoricalSource[];
  relatedStoryIds: string[];
}

export interface TimelineEvent {
  id: string;
  eraId: EraId;
  yearHijriNum: number;
  yearHijriLabel: string;
  yearGregorianLabel: string;
  isApproximate?: boolean;
  title: string;
  category: 'سياسي' | 'إداري' | 'عمراني وثقافي' | 'جغرافي وعسكري';
  location: string;
  summary: string;
  historicalSignificance: string;
  relatedEventIds?: string[];
  linkedStoryId?: string;
  sourceRef: string;
}

export type ScholarDiscipline =
  | 'العلوم الشرعية'
  | 'الحديث'
  | 'الفقه'
  | 'التاريخ'
  | 'الأدب'
  | 'العلوم والطب'
  | 'الرياضيات والفلك';

export interface MuslimScholar {
  id: string;
  name: string;
  honorificOrRole: string;
  eraId: EraId;
  eraLabel: string;
  disciplines: ScholarDiscipline[];
  birthLabel: string;
  deathLabel: string;
  isBirthApproximate?: boolean;
  city: string;
  biography: string;
  scientificContributions: string[];
  importantWorksOrLegacy: string[];
  scholarlyCaveat?: string;
  references: string[];
}

export interface MapSnapshot {
  id: string;
  eraId: EraId;
  yearLabel: string;
  title: string;
  subtitle: string;
  boundaryDisclaimer: string;
  activeRegions: string[];
  routes: {
    id: string;
    name: string;
    description: string;
    pathD: string;
  }[];
  cities: {
    id: string;
    name: string;
    eraRole: string;
    x: number;
    y: number;
    foundingOrHighlight: string;
    events: string[];
    linkedStoryId?: string;
  }[];
}

export interface HistoricalArticle {
  id: string;
  eraId: EraId;
  eraLabel: string;
  title: string;
  excerpt: string;
  readingTimeMinutes: number;
  dateLabel: string;
  category: string;
  content: string[];
  sourceNote: string;
}
