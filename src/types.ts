export type Language = 'en' | 'ru' | 'ky' | 'ar';

export interface TranslationSet {
  brandName: string;
  brandSub: string;
  heroTitle: string;
  heroSubtitle: string;
  startBtn: string;
  freeLessonBtn: string;
  statsLessons: string;
  statsWords: string;
  statsExercises: string;
  statsAI: string;
  
  // Navigation
  navHome: string;
  navAbout: string;
  navCourses: string;
  navAlphabet: string;
  navDict: string;
  navPractice: string;
  navTests: string;
  navAI: string;
  navBlog: string;
  navContact: string;
  navDashboard: string;
  navAdmin: string;

  // Sections
  selectLanguage: string;
  coursesTitle: string;
  coursesSubtitle: string;
  alphabetTitle: string;
  alphabetSubtitle: string;
  dictTitle: string;
  dictSubtitle: string;
  practiceTitle: string;
  practiceSubtitle: string;
  testsTitle: string;
  testsSubtitle: string;
  aiTitle: string;
  aiSubtitle: string;
  blogTitle: string;
  blogSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  adminTitle: string;
  adminSubtitle: string;
  pricingTitle: string;
  pricingSubtitle: string;
  
  // Common terms
  level: string;
  progress: string;
  completed: string;
  start: string;
  lessons: string;
  quiz: string;
  homework: string;
  certificate: string;
  search: string;
  categories: string;
  viewDetails: string;
  back: string;
  send: string;
  loading: string;
  score: string;
  result: string;
  retry: string;
  generateCertificate: string;
  fullName: string;
  congrats: string;
  next: string;
  previous: string;
}

export interface AlphabetLetter {
  letter: string;
  name: Record<Language, string>;
  sound: string;
  writingSteps: string[];
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  exampleWord: string;
  exampleWordAr: string;
  exampleWordTranslation: Record<Language, string>;
  exampleWordTranscription: string;
  exampleSentenceAr: string;
  exampleSentenceTranslation: Record<Language, string>;
  exampleSentenceTranscription: string;
}

export interface DictWord {
  id: string;
  word: string;
  transcription: string;
  category: string;
  translations: Record<Language, string>;
  exampleAr: string;
  exampleTranscription: string;
  exampleTranslations: Record<Language, string>;
}

export interface DialogueLine {
  speaker: string;
  speakerAr: string;
  textAr: string;
  transcription: string;
  translations: Record<Language, string>;
}

export interface Dialogue {
  id: string;
  title: Record<Language, string>;
  category: string;
  arabicTitle: string;
  icon: string;
  lines: DialogueLine[];
}

export interface CourseLesson {
  id: string;
  title: Record<Language, string>;
  duration: string;
  videoUrl: string;
  subtitles: Record<Language, string[]>;
  summary: Record<Language, string>;
  homeworkPrompt: Record<Language, string>;
}

export interface QuizQuestion {
  id: string;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
}

export interface CourseLevel {
  id: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: Record<Language, string>;
  description: Record<Language, string>;
  badgeColor: string;
  lessons: CourseLesson[];
  quiz: QuizQuestion[];
}

export interface BlogPost {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  category: Record<Language, string>;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
}

export interface Achievement {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  xpReward: number;
  unlocked: boolean;
  iconName: string;
}

export interface UserStats {
  xp: number;
  coins: number;
  streak: number;
  completedLessons: string[]; // lesson ids
  unlockedLevels: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[];
  achievements: string[]; // achievement ids
  dailyGoalProgress: number; // percentage
  joinedDate: string;
}
