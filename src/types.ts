export interface Nutrient {
  id: string; // e.g. "vit-a", "min-iron"
  type: 'vitamin' | 'mineral';
  name: string;
  nicknames: string[];
  formula: string;
  discovery: string;
  curiosities: string[];
  mainFunction: string;
  benefits: {
    title: string;
    description: string;
    category: 'ossos' | 'imunidade' | 'pele' | 'cerebro' | 'energia' | 'hormonios' | 'coracao' | 'visao' | 'geral';
  }[];
  deficiency: {
    mild: string[];
    moderate: string[];
    severe: string[];
  };
  excess: {
    toxicity: string;
    riscos: string[];
    interactions: string[];
  };
  sources: {
    name: string;
    emoji: string;
    amount: string; // e.g. "100g = 120% RDA"
  }[];
  rda: {
    children: string;
    teens: string;
    men: string;
    women: string;
    pregnant: string;
    lactating: string;
    elderly: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface ScanResult {
  productName: string;
  score: number; // 0 to 100
  gradeText: string; // e.g., "92/100 Excelente"
  gradeColor: 'green' | 'yellow' | 'red';
  aiExplanation: string[];
  alerts: string[];
  detectedNutrients: {
    name: string;
    amount: string;
    percentage: string;
    status: 'high' | 'adequate' | 'low';
  }[];
  whatYouAreIngesting?: {
    item: string;
    category: 'positive' | 'neutral' | 'negative';
    description: string;
  }[];
  bodyImpact?: {
    organ: string;
    icon: string;
    intro: string;
    goodEffect: string;
    badEffect: string;
    doseGuideline: string;
  }[];
}

export interface QuizAnswer {
  age: number;
  gender: 'homem' | 'mulher' | 'outro';
  diet: string; // e.g. 'onivoro', 'vegetariano', 'vegano'
  dietQuality: string; // e.g. 'alta', 'media', 'baixa'
  sunExposure: string; // e.g. 'alta', 'moderada', 'pouca'
  energyLevel: string; // e.g. 'alto', 'medio', 'baixo'
  symptoms: string[];
}

export interface ProfileAnalysis {
  riskScore: number;
  vulnerabilities: {
    nutrient: string;
    severity: 'alta' | 'moderada' | 'baixa';
    explanation: string;
  }[];
  recommendations: string[];
  sunExpAdvice: string;
  dietAdvice: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

export interface UserProgress {
  xp: number;
  level: string; // e.g. "🌱 Iniciante Nutricional"
  scannedCount: number;
  articlesReadCount: number;
  completedQuiz: boolean;
  streak: number;
}

export interface CommunityPost {
  id: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  likes: number;
  likedByUser?: boolean;
  commentsCount: number;
  tag: string;
  timestamp: string;
}
