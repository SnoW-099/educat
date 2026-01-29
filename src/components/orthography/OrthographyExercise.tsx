import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { OrthographyExercise as ExerciseType } from '@/utils/catalanOrthographyData';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useToast } from '@/hooks/use-toast';

interface OrthographyExerciseProps {
  exercise: ExerciseType;
  onComplete: (exerciseId: string, isCorrect: boolean) => void;
  showFeedback?: boolean;
  hideAnswersUntilComplete?: boolean;
  allExercisesCompleted?: boolean;
  category?: string;
}

export const OrthographyExercise = ({ exercise, onComplete, showFeedback = true, hideAnswersUntilComplete = false, allExercisesCompleted = false, category = 'ortografia' }: OrthographyExerciseProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [classificationAnswers, setClassificationAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedAnswer('');
    setTextAnswer('');
    setClassificationAnswers(
      exercise.type === 'classification' && exercise.options
        ? exercise.options.map(() => '')
        : []
    );
    setSubmitted(false);
    setShowExplanation(false);
  }, [exercise.id]);

  const normalizeList = (value: string) =>
    value
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean)
      .sort();

  const handleSubmit = () => {
    if (!submitted) {
      const isCorrect = (() => {
        if (exercise.type === 'classification') {
          if (!exercise.options || !Array.isArray(exercise.correctAnswer)) {
            return false;
          }
          return exercise.options.every((_, index) => {
            const userList = normalizeList(classificationAnswers[index] || '');
            const correctList = normalizeList(exercise.correctAnswer[index] || '');
            return userList.length === correctList.length && userList.every((item, idx) => item === correctList[idx]);
          });
        }
        const userAnswer = exercise.type === 'fill_blank' || exercise.type === 'dictation' || exercise.type === 'transformation' || exercise.type === 'text_correction' || exercise.type === 'text_completion' || exercise.type === 'ordering'
          ? textAnswer.trim().toLowerCase()
          : selectedAnswer;

        const correctAnswer = Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer[0].toLowerCase()
          : exercise.correctAnswer.toLowerCase();

        return userAnswer === correctAnswer;
      })();

      setSubmitted(true);

      // Only show explanation if all exercises are completed or hideAnswersUntilComplete is false
      if (!hideAnswersUntilComplete || allExercisesCompleted) {
        setShowExplanation(true);
      }

      if (showFeedback) {
        onComplete(exercise.id, isCorrect);

        if (isCorrect) {
          toast({
            title: "Correcte!",
            description: (!hideAnswersUntilComplete || allExercisesCompleted) ? exercise.explanation : "Ben fet!",
            duration: 3000,
          });
        } else {
          toast({
            title: "Incorrecte",
            description: (!hideAnswersUntilComplete || allExercisesCompleted) ? `La resposta correcta és: ${exercise.correctAnswer}` : "Resposta incorrecta. Continua amb els altres exercicis.",
            variant: "destructive",
            duration: 4000,
          });
        }
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setTextAnswer('');
    setSubmitted(false);
    setShowExplanation(false);
  };

  const isCorrect = () => {
    if (exercise.type === 'classification') {
      if (!exercise.options || !Array.isArray(exercise.correctAnswer)) {
        return false;
      }
      return exercise.options.every((_, index) => {
        const userList = normalizeList(classificationAnswers[index] || '');
        const correctList = normalizeList(exercise.correctAnswer[index] || '');
        return userList.length === correctList.length && userList.every((item, idx) => item === correctList[idx]);
      });
    }
    const userAnswer = exercise.type === 'fill_blank' || exercise.type === 'dictation' || exercise.type === 'transformation' || exercise.type === 'text_correction' || exercise.type === 'text_completion' || exercise.type === 'ordering'
      ? textAnswer.trim().toLowerCase()
      : selectedAnswer;

    const correctAnswer = Array.isArray(exercise.correctAnswer)
      ? exercise.correctAnswer[0].toLowerCase()
      : exercise.correctAnswer.toLowerCase();

    return userAnswer === correctAnswer;
  };

  const canSubmit = () => {
    if (exercise.type === 'classification') {
      return classificationAnswers.length > 0 && classificationAnswers.every((answer) => answer.trim().length > 0);
    }
    if (exercise.type === 'fill_blank' || exercise.type === 'dictation' || exercise.type === 'transformation' || exercise.type === 'text_correction' || exercise.type === 'text_completion' || exercise.type === 'ordering') {
      return textAnswer.trim().length > 0;
    }
    return selectedAnswer.length > 0;
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800 border-green-200';
      case 2: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 4: return 'bg-orange-100 text-orange-800 border-orange-200';
      case 5: return 'bg-red-100 text-red-800 border-red-200';
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ortografia': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'morfosintaxi': return 'bg-green-100 text-green-700 border-green-300';
      case 'lexic': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Card className={`transition-all duration-200 ${submitted ? (isCorrect() ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50') : 'hover:shadow-md'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{exercise.question}</CardTitle>
            {submitted && (
              isCorrect() ?
                <CheckCircle className="h-5 w-5 text-green-600" /> :
                <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <Badge className={getCategoryColor(category)}>
            {getCategoryLabel(category)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Multiple Choice & True/False */}
        {(exercise.type === 'multiple_choice' || exercise.type === 'true_false') && (() => {
          // Compute effective options: use provided options, or default to Cert/Fals for true_false
          const effectiveOptions = (exercise.options && exercise.options.length > 0)
            ? exercise.options
            : (exercise.type === 'true_false' ? ['Cert', 'Fals'] : []);

          return (
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              disabled={submitted}
              className="space-y-2"
            >
              {effectiveOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => !submitted && setSelectedAnswer(option)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${submitted ? (
                    (!hideAnswersUntilComplete || allExercisesCompleted) && option === exercise.correctAnswer ? 'bg-green-100 border-green-300' :
                      (!hideAnswersUntilComplete || allExercisesCompleted) && option === selectedAnswer && option !== exercise.correctAnswer ? 'bg-red-100 border-red-300' :
                        'bg-gray-50 border-gray-200'
                  ) : selectedAnswer === option ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50 border-gray-200'
                    }`}
                >
                  <RadioGroupItem value={option} id={`ex-${exercise.id}-opt-${index}`} />
                  <Label htmlFor={`ex-${exercise.id}-opt-${index}`} className="flex-1 cursor-pointer font-medium">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          );
        })()}

        {/* Classification */}
        {exercise.type === 'classification' && exercise.options && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Escriu les paraules separades per comes dins de cada categoria.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {exercise.options.map((option, index) => (
                <div key={option} className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{option}</Label>
                  <Textarea
                    value={classificationAnswers[index] || ''}
                    onChange={(e) => {
                      const next = [...classificationAnswers];
                      next[index] = e.target.value;
                      setClassificationAnswers(next);
                    }}
                    placeholder="Ex: panet, remei, desmai"
                    disabled={submitted}
                    className={submitted ? (isCorrect() ? 'border-green-500' : 'border-red-500') : ''}
                  />
                  {submitted && !isCorrect() && (!hideAnswersUntilComplete || allExercisesCompleted) && Array.isArray(exercise.correctAnswer) && (
                    <p className="text-xs text-red-600">
                      Correcte: <span className="font-medium">{exercise.correctAnswer[index]}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fill in the Blank, Dictation, Transformation, Text Correction, Text Completion & Ordering */}
        {(exercise.type === 'fill_blank' || exercise.type === 'dictation' || exercise.type === 'transformation' || exercise.type === 'text_correction' || exercise.type === 'text_completion' || exercise.type === 'ordering') && (
          <div className="space-y-2">
            <Input
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder={exercise.type === 'transformation' ? "Escriu la transformació..." : "Escriu la teva resposta..."}
              disabled={submitted}
              className={submitted ? (isCorrect() ? 'border-green-500' : 'border-red-500') : ''}
            />
            {submitted && !isCorrect() && (!hideAnswersUntilComplete || allExercisesCompleted) && (
              <p className="text-sm text-red-600">
                Resposta correcta: <span className="font-medium">{exercise.correctAnswer}</span>
              </p>
            )}
          </div>
        )}

        {/* Ordering Preview (if options available) */}
        {exercise.type === 'ordering' && exercise.options && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Elements per ordenar:</p>
            <div className="flex flex-wrap gap-2">
              {exercise.options.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
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

        {/* Explanation */}
        {showExplanation && exercise.explanation && (!hideAnswersUntilComplete || allExercisesCompleted) && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Explicació</h4>
                <p className="text-sm text-blue-800">{exercise.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
