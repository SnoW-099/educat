import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, CheckCircle, Award } from 'lucide-react';
import { OrthographySection as SectionType } from '@/utils/catalanOrthographyData';
import { XPOrthographyExercise } from './XPOrthographyExercise';

interface OrthographySectionProps {
  section: SectionType;
  onExerciseComplete?: (sectionId: string, exerciseId: string, isCorrect: boolean, xpEarned?: number) => void;
  completedExercises?: Set<string>;
}

export const OrthographySection = ({
  section,
  onExerciseComplete,
  completedExercises = new Set()
}: OrthographySectionProps) => {
  // Load saved exercise index for this section
  const getSavedIndex = () => {
    const saved = localStorage.getItem(`exercise_index_${section.id}`);
    return saved ? parseInt(saved, 10) : 0;
  };

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(getSavedIndex());
  const [showExercises, setShowExercises] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Map<string, boolean>>(new Map());

  // Save current exercise index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`exercise_index_${section.id}`, currentExerciseIndex.toString());
  }, [currentExerciseIndex, section.id]);

  const handleExerciseComplete = (exerciseId: string, isCorrect: boolean, baseXP: number = 0) => {
    setSectionProgress(prev => new Map(prev.set(exerciseId, isCorrect)));

    const earnedXP = isCorrect ? 10 : 5;
    onExerciseComplete?.(section.id, exerciseId, isCorrect, earnedXP);

    // Auto-advance to next exercise if correct
    if (isCorrect && currentExerciseIndex < section.exercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
      }, 2000);
    }
  };

  const completedCount = section.exercises.filter(ex =>
    sectionProgress.get(ex.id) === true || completedExercises.has(ex.id)
  ).length;

  const progressPercentage = section.exercises.length > 0 ?
    Math.round((completedCount / section.exercises.length) * 100) : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ortografia': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'morfosintaxi': return 'bg-green-100 text-green-800 border-green-200';
      case 'lexic': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ortografia': return 'Ortografia';
      case 'morfosintaxi': return 'Morfosintaxi';
      case 'lexic': return 'Lèxic';
      default: return 'General';
    }
  };

  if (!showExercises) {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
        onClick={() => setShowExercises(true)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {section.title}
                </CardTitle>
                <Badge className={getCategoryColor(section.category)}>
                  {getCategoryLabel(section.category)}
                </Badge>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {section.description}
              </CardDescription>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{section.exercises.length} exercicis</span>
              </div>
              {completedCount > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>{completedCount}/{section.exercises.length} completats</span>
                </div>
              )}
            </div>

            {progressPercentage > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Progrés</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            {progressPercentage === 100 && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-md">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">Secció completada!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentExercise = section.exercises[currentExerciseIndex];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{section.title}</CardTitle>
                <Badge className={getCategoryColor(section.category)}>
                  {getCategoryLabel(section.category)}
                </Badge>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowExercises(false)}
              className="shrink-0"
            >
              ← Tornar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Exercici {currentExerciseIndex + 1} de {section.exercises.length}
              </span>
              <span className="font-medium">
                {completedCount}/{section.exercises.length} completats ({progressPercentage}%)
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Current Exercise */}
      {currentExercise && (
        <XPOrthographyExercise
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
          showFeedback={true}
          userRole="student"
          category={section.category}
        />
      )}

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
              disabled={currentExerciseIndex === 0}
            >
              ← Anterior
            </Button>


            <div className="flex gap-1 flex-wrap max-w-full overflow-x-auto">
              {(() => {
                const totalExercises = section.exercises.length;
                const current = currentExerciseIndex;
                const maxVisible = 7; // Maximum number of buttons to show

                // Helper to create a button
                const createButton = (index: number, label?: string) => (
                  <button
                    key={`ex-${index}`}
                    onClick={() => setCurrentExerciseIndex(index)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${index === currentExerciseIndex
                        ? 'bg-primary text-primary-foreground'
                        : sectionProgress.get(section.exercises[index].id) === true
                          ? 'bg-green-500 text-white'
                          : 'bg-muted hover:bg-muted-foreground/10'
                      }`}
                  >
                    {label || (index + 1)}
                  </button>
                );

                // If total exercises <= maxVisible, show all
                if (totalExercises <= maxVisible) {
                  return section.exercises.map((_, index) => createButton(index));
                }

                // Smart pagination logic
                const buttons: JSX.Element[] = [];

                // Always show first
                buttons.push(createButton(0));

                // Determine range around current
                let rangeStart = Math.max(1, current - 2);
                let rangeEnd = Math.min(totalExercises - 2, current + 2);

                // Adjust if near start
                if (current < 3) {
                  rangeEnd = Math.min(totalExercises - 2, 4);
                }

                // Adjust if near end
                if (current > totalExercises - 4) {
                  rangeStart = Math.max(1, totalExercises - 5);
                }

                // Add left ellipsis if needed
                if (rangeStart > 1) {
                  buttons.push(
                    <span key="ellipsis-left" className="w-8 h-8 flex items-center justify-center text-muted-foreground">
                      ...
                    </span>
                  );
                }

                // Add middle range
                for (let i = rangeStart; i <= rangeEnd; i++) {
                  buttons.push(createButton(i));
                }

                // Add right ellipsis if needed
                if (rangeEnd < totalExercises - 2) {
                  buttons.push(
                    <span key="ellipsis-right" className="w-8 h-8 flex items-center justify-center text-muted-foreground">
                      ...
                    </span>
                  );
                }

                // Always show last
                buttons.push(createButton(totalExercises - 1));

                return buttons;
              })()}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentExerciseIndex(prev =>
                Math.min(section.exercises.length - 1, prev + 1)
              )}
              disabled={currentExerciseIndex === section.exercises.length - 1}
            >
              Següent →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};