import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, RotateCcw, Volume2 } from 'lucide-react';
import { OrthographyExercise as ExerciseType } from '@/utils/catalanOrthographyData';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useToast } from '@/hooks/use-toast';
import { checkAnswerWithNormalization } from '@/utils/textUtils';

interface EnhancedOrthographyExerciseProps {
  exercise: ExerciseType;
  onComplete: (exerciseId: string, isCorrect: boolean) => void;
  showFeedback?: boolean;
  userRole?: 'student' | 'professor';
  hideAnswersUntilComplete?: boolean;
  allExercisesCompleted?: boolean;
  category?: string;
}

export const EnhancedOrthographyExercise = ({
  exercise,
  onComplete,
  showFeedback = true,
  userRole = 'student',
  hideAnswersUntilComplete = false,
  allExercisesCompleted = false,
  category = 'ortografia'
}: EnhancedOrthographyExerciseProps) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();
  const { showAnswers, generateAlternativeAnswers } = useEasterEgg(userRole);

  // Reset state when exercise changes
  useEffect(() => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
  }, [exercise.id]);

  const checkAnswer = (answer: string) => {
    return checkAnswerWithNormalization(answer, exercise.correctAnswer);
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

    setIsCorrect(correct);
    setShowResult(true);

    // Only show explanation if all exercises are completed or hideAnswersUntilComplete is false
    if (!hideAnswersUntilComplete || allExercisesCompleted) {
      setShowExplanation(true);
    }

    if (showFeedback) {
      onComplete(exercise.id, correct);

      if (correct) {
        toast({
          title: "Correcte!",
          description: (!hideAnswersUntilComplete || allExercisesCompleted) ? (exercise.explanation || "Ben fet!") : "Ben fet!",
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
    <Card className={`transition-all duration-200 ${showResult ? (isCorrect ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5') : 'hover:shadow-md'
      }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{exercise.question}</CardTitle>
            {showResult && (
              isCorrect ?
                <CheckCircle className="h-5 w-5 text-success" /> :
                <XCircle className="h-5 w-5 text-destructive" />
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
              <Button
                key={index}
                variant={userAnswer === option ? 'default' : 'outline'}
                className={`w-full justify-start text-left h-auto py-3 ${showResult ? (
                  (!hideAnswersUntilComplete || allExercisesCompleted) && option === exercise.correctAnswer ? 'border-success bg-success/10 text-success' :
                    (!hideAnswersUntilComplete || allExercisesCompleted) && option === userAnswer && option !== exercise.correctAnswer ? 'border-destructive bg-destructive/10 text-destructive' :
                      'opacity-60'
                ) : ''
                  }`}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showAnswers && option === exercise.correctAnswer && (
                  <CheckCircle className="h-4 w-4 ml-auto text-success" />
                )}
              </Button>
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
            {showAnswers && (
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
            {showAnswers && (
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
            {showAnswers && (
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
        {showResult && !isCorrect && !showAnswers && (!hideAnswersUntilComplete || allExercisesCompleted) && (
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
      </CardContent>
    </Card>
  );
};