import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, RotateCcw, Volume2, Zap } from 'lucide-react';
import { OrthographyExercise as ExerciseType } from '@/utils/catalanOrthographyData';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useToast } from '@/hooks/use-toast';

interface XPOrthographyExerciseProps {
  exercise: ExerciseType;
  onComplete: (exerciseId: string, isCorrect: boolean, xpEarned: number) => void;
  showFeedback?: boolean;
  userRole?: 'student' | 'professor';
  hideAnswersUntilComplete?: boolean;
  allExercisesCompleted?: boolean;
  category?: string;
}

export const XPOrthographyExercise = ({
  exercise,
  onComplete,
  showFeedback = true,
  userRole = 'student',
  hideAnswersUntilComplete = false,
  allExercisesCompleted = false,
  category = 'ortografia'
}: XPOrthographyExerciseProps) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const { toast } = useToast();
  const { showAnswers } = useEasterEgg(userRole);

  // Reset state when exercise changes
  useEffect(() => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setXpEarned(0);
  }, [exercise.id]);

  const checkAnswer = (answer: string) => {
    if (Array.isArray(exercise.correctAnswer)) {
      return exercise.correctAnswer.some(correct =>
        answer.toLowerCase().trim() === correct.toLowerCase().trim()
      );
    }
    return answer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
  };

  const calculateXP = (isCorrect: boolean, difficulty: number) => {
    if (!isCorrect) return 0;

    // Base XP with multipliers based on difficulty
    const baseXP = 10;
    const multipliers = {
      1: 1.1,   // Fàcil - 11 XP
      2: 1.3,   // Normal - 13 XP
      3: 1.6,   // Difícil - 16 XP
      4: 2.0    // Master - 20 XP
    };

    const multiplier = multipliers[difficulty] || 1.3;
    return Math.round(baseXP * multiplier);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    if (exercise.type === 'multiple_choice') {
      handleSubmit(answer);
    }
  };

  const handleSubmit = (submitAnswer?: string) => {
    const finalAnswer = submitAnswer || userAnswer;
    const correct = checkAnswer(finalAnswer);
    const earnedXP = calculateXP(correct, exercise.difficulty);

    setIsCorrect(correct);
    setShowResult(true);

    // Only show explanation if all exercises are completed or hideAnswersUntilComplete is false
    if (!hideAnswersUntilComplete || allExercisesCompleted) {
      setShowExplanation(true);
    }

    setXpEarned(earnedXP);

    if (showFeedback) {
      onComplete(exercise.id, correct, earnedXP);

      if (correct) {
        toast({
          title: "Correcte!",
          description: `${(!hideAnswersUntilComplete || allExercisesCompleted) ? (exercise.explanation || "Ben fet!") : "Ben fet!"} +${earnedXP} XP`,
          duration: 3000,
        });
      } else {
        const correctAnswerText = Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer.join(' o ')
          : exercise.correctAnswer;

        toast({
          title: "Incorrecte",
          description: (!hideAnswersUntilComplete || allExercisesCompleted) ? `La resposta correcta és: ${correctAnswerText}` : "Resposta incorrecta. Continua amb els altres exercicis.",
          variant: "destructive",
          duration: 4000,
        });
      }
    }
  };

  const handleReset = () => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setXpEarned(0);
  };

  const canSubmit = () => {
    return userAnswer.trim().length > 0 && !showResult;
  };

  const getDifficultyColor = (difficulty: number) => {
    const colors = [
      '',
      'bg-success/10 text-success border-success/20',
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-accent/10 text-accent border-accent/20',
      'bg-warning/10 text-warning border-warning/20',
      'bg-destructive/10 text-destructive border-destructive/20'
    ];
    return colors[difficulty] || 'bg-muted text-muted-foreground border-muted';
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ortografia': return 'Ortografia';
      case 'morfosintaxi': return 'Morfosintaxi';
      case 'lexic': return 'Lèxic';
      default: return 'General';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ortografia': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'morfosintaxi': return 'bg-green-100 text-green-700 border-green-300';
      case 'lexic': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const playDictationAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ca-ES';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className={`transition-all duration-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${showResult ? (isCorrect ? 'border-success/50 bg-success/5 dark:bg-success/10' : 'border-destructive/50 bg-destructive/5 dark:bg-destructive/10') : 'hover:shadow-md'
      }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{exercise.question}</CardTitle>
            {showResult && (
              isCorrect ? (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    +{xpEarned} XP
                  </Badge>
                </div>
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )
            )}
          </div>
          <Badge className={getCategoryColor(category)} variant="outline">
            {getCategoryLabel(category)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Multiple Choice */}
        {exercise.type === 'multiple_choice' && exercise.options && (
          <div className="space-y-3">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-start text-left h-auto py-3 px-4 rounded-lg border transition-colors ${userAnswer === option
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white'
                  } ${showResult ? (
                    (!hideAnswersUntilComplete || allExercisesCompleted) && option === exercise.correctAnswer ? 'border-success bg-success/10 dark:bg-success/20 text-success dark:text-emerald-400' :
                      (!hideAnswersUntilComplete || allExercisesCompleted) && option === userAnswer && option !== exercise.correctAnswer ? 'border-destructive bg-destructive/10 dark:bg-destructive/20 text-destructive' :
                        'opacity-60'
                  ) : ''
                  } ${showResult ? 'pointer-events-none' : ''}`}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showAnswers && option === exercise.correctAnswer && (
                  <CheckCircle className="h-4 w-4 ml-auto text-success" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Fill in the Blank */}
        {exercise.type === 'fill_blank' && (
          <div className="space-y-3">
            <Input
              type="text"
              className={`w-full ${showResult ? (isCorrect ? 'border-success' : 'border-destructive') : ''
                }`}
              placeholder="Escriu la teva resposta..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showResult}
              autoComplete="off"
              spellCheck="false"
            />
            {showAnswers && (!hideAnswersUntilComplete || allExercisesCompleted) && (
              <div className="text-sm text-success bg-success/10 p-2 rounded">
                Respostes possibles: {Array.isArray(exercise.correctAnswer)
                  ? exercise.correctAnswer.join(', ')
                  : exercise.correctAnswer}
              </div>
            )}
          </div>
        )}

        {/* Dictation */}
        {exercise.type === 'dictation' && (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="mb-4"
              onClick={() => playDictationAudio(
                Array.isArray(exercise.correctAnswer)
                  ? exercise.correctAnswer[0]
                  : exercise.correctAnswer as string
              )}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Reproduir àudio
            </Button>
            <textarea
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none ${showResult ? (isCorrect ? 'border-success' : 'border-destructive') : ''
                }`}
              rows={3}
              placeholder="Escriu el que has escoltat..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showResult}
              autoComplete="off"
              spellCheck="false"
            />
            {showAnswers && (!hideAnswersUntilComplete || allExercisesCompleted) && (
              <div className="text-sm text-success bg-success/10 p-2 rounded">
                Text correcte: {Array.isArray(exercise.correctAnswer)
                  ? exercise.correctAnswer.join(' / ')
                  : exercise.correctAnswer}
              </div>
            )}
          </div>
        )}

        {/* Transformation */}
        {exercise.type === 'transformation' && (
          <div className="space-y-3">
            <Input
              type="text"
              className={`w-full ${showResult ? (isCorrect ? 'border-success' : 'border-destructive') : ''
                }`}
              placeholder="Escriu la transformació..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showResult}
              autoComplete="off"
              spellCheck="false"
            />
            {showAnswers && (!hideAnswersUntilComplete || allExercisesCompleted) && (
              <div className="text-sm text-success bg-success/10 p-2 rounded">
                Transformació correcta: {Array.isArray(exercise.correctAnswer)
                  ? exercise.correctAnswer.join(' / ')
                  : exercise.correctAnswer}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {exercise.type !== 'multiple_choice' && (
          <div className="flex items-center gap-2 pt-4">
            {!showResult ? (
              <Button
                onClick={() => handleSubmit()}
                disabled={!canSubmit()}
                className="bg-primary hover:bg-primary/90"
              >
                Comprovar Resposta
              </Button>
            ) : (
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Tornar a Intentar
              </Button>
            )}
          </div>
        )}

        {/* Reset button for multiple choice when answered */}
        {exercise.type === 'multiple_choice' && showResult && (
          <div className="flex items-center gap-2 pt-4">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Tornar a Intentar
            </Button>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && exercise.explanation && (!hideAnswersUntilComplete || allExercisesCompleted) && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-md">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-primary mb-1">Explicació</h4>
                <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Show correct answer when wrong and not using easter egg */}
        {showResult && !isCorrect && !showAnswers && exercise.difficulty <= 2 && (!hideAnswersUntilComplete || allExercisesCompleted) && (
          <div className="mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-md">
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-destructive mb-1">Resposta correcta</h4>
                <p className="text-sm text-muted-foreground">
                  {Array.isArray(exercise.correctAnswer)
                    ? exercise.correctAnswer.join(' o ')
                    : exercise.correctAnswer}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Don't show answers for difficult exercises unless easter egg is active */}
        {showResult && !isCorrect && exercise.difficulty > 2 && !showAnswers && (
          <div className="mt-4 p-4 bg-muted/20 border border-muted/30 rounded-md">
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-muted-foreground mb-1">Exercici avançat</h4>
                <p className="text-sm text-muted-foreground">
                  Consulta les explicacions teòriques per millorar en aquest tipus d'exercici.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};