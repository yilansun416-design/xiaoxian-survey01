export interface SurveyData {
  id: string;
  timestamp: number;
  // Section B: Basic Info
  ageGroup: string;
  identity: string; // Multi-select stored as comma joined string or primary selection
  identityOther?: string;
  redInterest: number; // 1-5 scale mapped from options
  firstTime: string;

  // Section C: Overall Experience (1-5)
  c1_easyToPlay: number;
  c2_smoothUI: number;
  c3_duration: number;
  c4_immersion: number;
  c5_funFactor: number;

  // Section D: Narrative (1-5)
  d1_plotHook: number;
  d2_historySense: number;
  d3_balance: number;
  d4_curiosity: number;

  // Section E: Emotional (1-5)
  e1_resonance: number;
  e2_empathy: number;
  e3_values: number;
  e4_recommend: number;

  // Section F: Offline & Consumption
  f1_visitIntent: number; // 1-5
  f2_checkinIntent: number; // 1-5
  f3_buyIntent: number; // 1-5
  f4_offlineActivities: string[]; // Multi-select
  f4_offlineActivitiesOther?: string;

  // Section G: Satisfaction
  g1_overallSatisfaction: number;
  g2_likedPoint: string;
  g3_improvementPoint: string;
  g4_futureContent: string;
}

export interface QuestionOption {
  value: string | number;
  label: string;
}

export interface Question {
  id: keyof SurveyData;
  text: string;
  type: 'radio' | 'scale' | 'checkbox' | 'text' | 'textarea';
  options?: QuestionOption[];
  allowOther?: boolean; // For "Other: ___"
}

export interface SurveySection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}
