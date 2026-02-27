import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Award, Play } from 'lucide-react';

interface ReviewQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'classification' | 'correction' | 'time_writing' | 'antonym';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

interface ReviewExerciseRendererProps {
  exercise: {
    id: string;
    title: string;
    level: string;
    content: ReviewQuestion[];
    timeLimit?: number;
  };
  onComplete: (answers: Record<string, string>) => void;
  onCancel: () => void;
}

export const ReviewExerciseRenderer = ({ exercise, onComplete, onCancel }: ReviewExerciseRendererProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    exercise.timeLimit ? exercise.timeLimit * 60 : null
  );

  const currentQuestion = exercise.content[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exercise.content.length) * 100;

  const answerQuestion = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < exercise.content.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(userAnswers);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-blue-100 text-blue-800',
      'B1': 'bg-yellow-100 text-yellow-800',
      'B2': 'bg-orange-100 text-orange-800',
      'C1': 'bg-red-100 text-red-800',
      'C2': 'bg-purple-100 text-purple-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                variant={userAnswers[currentQuestion.id] === option ? 'default' : 'outline'}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => answerQuestion(currentQuestion.id, option)}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        );

      case 'fill_blank':
      case 'classification':
      case 'correction':
      case 'time_writing':
      case 'antonym':
        return (
          <div className="space-y-3">
            <Input
              type="text"
              className="w-full"
              placeholder={
                currentQuestion.type === 'classification' ? 'Classifica els elements...' :
                currentQuestion.type === 'correction' ? 'Escriu la correcció...' :
                currentQuestion.type === 'time_writing' ? 'Escriu l\'hora amb lletres...' :
                currentQuestion.type === 'antonym' ? 'Escriu l\'antònim...' :
                'Escriu la teva resposta...'
              }
              value={userAnswers[currentQuestion.id] || ''}
              onChange={(e) => answerQuestion(currentQuestion.id, e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            {currentQuestion.type === 'classification' && (
              <div className="text-sm text-muted-foreground">
                <p>Exemple de format: Cap: paraula1, paraula2; Tronc: paraula3, paraula4</p>
              </div>
            )}
            {currentQuestion.type === 'correction' && (
              <div className="text-sm text-muted-foreground">
                <p>Escriu les paraules correctes separades per comes</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Card className="shadow-elevation glass-card border-white/20 overflow-hidden">
        <CardHeader className="bg-gradient-to-b from-white/50 to-transparent pb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-xl bg-gradient-accent text-accent shadow-minimal">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">{exercise.title}</CardTitle>
                <Badge variant="outline" className="mt-1 bg-white/50 backdrop-blur-sm border-accent/10 text-accent font-medium uppercase tracking-wider text-[10px]">
                  {exercise.level}
                </Badge>
              </div>
            </div>
            {timeRemaining !== null && (
              <div className="flex items-center space-x-3 bg-secondary/50 px-4 py-2 rounded-full border border-white/20">
                <Clock className={`h-4 w-4 ${timeRemaining < 60 ? 'text-destructive animate-pulse' : 'text-accent'}`} />
                <span className={`font-mono text-sm font-bold ${timeRemaining < 60 ? 'text-destructive' : 'text-foreground'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <span>Pregunta {currentQuestionIndex + 1} de {exercise.content.length}</span>
              <span>{Math.round(progress)}% completat</span>
            </div>
            <Progress value={progress} className="h-2.5 bg-secondary/30" />
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <div className="text-xl font-semibold leading-relaxed text-foreground bg-accent/5 p-6 rounded-2xl border border-accent/10 italic">
            {currentQuestion.question}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderQuestionContent()}
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-accent/5">
            <Button
              variant="outline"
              onClick={onCancel}
              className="hover-lift border-secondary hover:bg-secondary/50 font-medium"
            >
              Abandonar
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={!userAnswers[currentQuestion.id]}
              className="bg-gradient-accent hover:shadow-hover px-8 py-6 font-bold text-lg rounded-xl shadow-minimal transition-all"
            >
              {currentQuestionIndex < exercise.content.length - 1 ? (
                <>
                  Següent
                  <Play className="h-5 w-5 ml-2 fill-accent" />
                </>
              ) : 'Finalitzar exercici'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};