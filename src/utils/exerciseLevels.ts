// Exercise difficulty levels and XP calculation

export type ExerciseLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface LevelConfig {
  level: ExerciseLevel;
  baseXP: number;
  multiplier: number;
  description: string;
  color: string;
}

export const LEVEL_CONFIGS: Record<ExerciseLevel, LevelConfig> = {
  A1: {
    level: 'A1',
    baseXP: 10,
    multiplier: 1.0,
    description: 'Nivell bàsic - Iniciant',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  A2: {
    level: 'A2',
    baseXP: 15,
    multiplier: 1.2,
    description: 'Nivell elemental',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  B1: {
    level: 'B1',
    baseXP: 20,
    multiplier: 1.5,
    description: 'Nivell intermedi',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  B2: {
    level: 'B2',
    baseXP: 30,
    multiplier: 1.8,
    description: 'Nivell intermedi alt',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  C1: {
    level: 'C1',
    baseXP: 40,
    multiplier: 2.2,
    description: 'Nivell avançat',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  C2: {
    level: 'C2',
    baseXP: 50,
    multiplier: 2.5,
    description: 'Nivell de domini',
    color: 'bg-pink-100 text-pink-800 border-pink-200'
  }
};

export const calculateXP = (level: ExerciseLevel, baseScore: number): number => {
  const config = LEVEL_CONFIGS[level];
  return Math.round(baseScore * config.multiplier);
};

export const getNextLevel = (currentLevel: ExerciseLevel): ExerciseLevel | null => {
  const levels: ExerciseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
};

export const getLevelProgress = (completedLevels: Set<ExerciseLevel>): number => {
  const totalLevels = 6;
  return Math.round((completedLevels.size / totalLevels) * 100);
};
