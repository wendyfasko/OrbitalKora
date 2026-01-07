
export enum AppView {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  ADHD = 'ADHD',
  DYSLEXIA = 'DYSLEXIA',
  AUTISM = 'AUTISM',
  MENTAL_HEALTH = 'MENTAL_HEALTH',
  SENSORY = 'SENSORY',
  MEDITATION = 'MEDITATION',
  WOMENS_HEALTH = 'WOMENS_HEALTH',
  AI_COMPANION = 'AI_COMPANION',
  MEMBERSHIP = 'MEMBERSHIP',
  JOURNEY_MAP = 'JOURNEY_MAP',
  RAGE_GAME = 'RAGE_GAME'
}

export type ColorblindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'ADHD' | 'AUTISM' | 'MENTAL_HEALTH' | 'SENSORY' | 'HEALTH';
  level: number;
  status: 'locked' | 'available' | 'completed';
}

export interface UserSettings {
  dyslexiaFont: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  textSize: 'small' | 'medium' | 'large';
  overwhelmMode: boolean;
  language: string;
  isPremium: boolean;
  colorblindMode: ColorblindMode;
}

export interface UserProgress {
  starShards: number;
  focusMinutes: number;
  cycleDay: number;
  lastPeriodDate: string;
  completedNodeIds: string[];
  stabilityCharge: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  type: 'text' | 'voice' | 'drawing';
  content: string;
  title?: string;
}
