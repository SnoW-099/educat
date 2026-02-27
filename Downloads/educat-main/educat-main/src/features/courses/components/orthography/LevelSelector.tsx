import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Lock } from 'lucide-react';
import { ExerciseLevel, LEVEL_CONFIGS } from '@/utils/exerciseLevels';

interface LevelSelectorProps {
  currentLevel: ExerciseLevel;
  completedLevels: Set<ExerciseLevel>;
  onLevelSelect: (level: ExerciseLevel) => void;
  unlockedLevels: Set<ExerciseLevel>;
}

export const LevelSelector = ({
  currentLevel,
  completedLevels,
  onLevelSelect,
  unlockedLevels
}: LevelSelectorProps) => {
  const levels: ExerciseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {levels.map((level) => {
        const config = LEVEL_CONFIGS[level];
        const isCompleted = completedLevels.has(level);
        const isUnlocked = unlockedLevels.has(level);
        const isCurrent = currentLevel === level;

        return (
          <Card
            key={level}
            className={`relative cursor-pointer transition-all duration-200 ${
              isCurrent
                ? 'ring-2 ring-primary shadow-lg scale-105'
                : isUnlocked
                ? 'hover:shadow-md hover:scale-102'
                : 'opacity-60 cursor-not-allowed'
            }`}
            onClick={() => isUnlocked && onLevelSelect(level)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={config.color} variant="outline">
                    {level}
                  </Badge>
                  {isCompleted && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  {!isUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  {config.description}
                </p>
                <div className="text-xs font-medium text-primary">
                  +{config.baseXP} XP base
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
