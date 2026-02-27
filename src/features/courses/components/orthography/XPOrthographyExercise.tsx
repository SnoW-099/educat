import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Lightbulb, RotateCcw, Volume2, Zap } from 'lucide-react';
import { OrthographyExercise as ExerciseType } from '@/features/courses/data/catalanOrthographyData';
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

const SuccessParticles = ({ active }: { active: boolean }) => {
  if (!active) return null;
  const colors = ['#16a34a', '#22c55e', '#4ade80', '#2dd4bf'];
  return (
    <div className="absolute -inset-2 overflow-visible pointer-events-none z-50">
      {[...Array(45)].map((_, i) => {
        const size = Math.random() * 5 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isCircle = Math.random() > 0.4;
        
        const side = Math.floor(Math.random() * 4);
        let left = 0;
        let top = 0;
        if (side === 0) { left = Math.random() * 100; top = 0; }
        else if (side === 1) { left = 100; top = Math.random() * 100; }
        else if (side === 2) { left = Math.random() * 100; top = 100; }
        else { left = 0; top = Math.random() * 100; }

        return (
          <div
            key={i}
            className={`absolute animate-success-particle ${isCircle ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              width: `${size}px`,
              height: `${isCircle ? size : size * 0.7}px`,
              backgroundColor: color,
              left: `${left}%`,
              top: `${top}%`,
              '--x': `${(left - 50) * 1.2}px`,
              '--y': `${(top - 50) * 0.8 - 40}px`,
              '--rotate': `${Math.random() * 360}deg`,
              animationDelay: `${Math.random() * 0.2}s`,
            } as any}
          />
        );
      })}
    </div>
  );
};

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
  const [classificationAnswers, setClassificationAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [triggerParticles, setTriggerParticles] = useState(false);
  const { toast } = useToast();
  const { showAnswers } = useEasterEgg(userRole);

  // Reset state when exercise changes
  useEffect(() => {
    setUserAnswer('');
    setClassificationAnswers(
      exercise.type === 'classification' && exercise.options
        ? exercise.options.map(() => '')
        : []
    );
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setXpEarned(0);
    setTriggerParticles(false);
  }, [exercise.id, exercise.type, exercise.options]);

  // Shuffle options for multiple choice
  const shuffledOptions = useMemo(() => {
    if (exercise.type === 'multiple_choice' && exercise.options) {
      return [...exercise.options].sort(() => Math.random() - 0.5);
    }
    return exercise.options || [];
  }, [exercise.id, exercise.options, exercise.type]);

  // Handle Easter Egg (Ctrl+K) to show answers
  useEffect(() => {
    if (showAnswers && !showResult) {
      if (exercise.type === 'multiple_choice') {
        setUserAnswer(exercise.correctAnswer as string);
      } else if (exercise.type === 'classification' && Array.isArray(exercise.correctAnswer)) {
        setClassificationAnswers(exercise.correctAnswer);
      } else if (typeof exercise.correctAnswer === 'string') {
        setUserAnswer(exercise.correctAnswer);
      } else if (Array.isArray(exercise.correctAnswer)) {
        setUserAnswer(exercise.correctAnswer[0]);
      }
    }
  }, [showAnswers, exercise, showResult]);

  const normalizeList = (value: string) =>
    value
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean)
      .sort();

  const normalizeText = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');

  const checkAnswer = (answer: string) => {
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
    if (Array.isArray(exercise.correctAnswer)) {
      const normalizedAnswer = normalizeText(answer);
      return exercise.correctAnswer.some(correct =>
        normalizedAnswer === normalizeText(correct)
      );
    }
    return normalizeText(answer) === normalizeText(exercise.correctAnswer as string);
  };

  const calculateXP = (correct: boolean, difficulty: number) => {
    if (!correct) return 0;
    const baseXP = 10;
    const multipliers = { 1: 1.1, 2: 1.3, 3: 1.6, 4: 2.0, 5: 2.5 };
    const multiplier = multipliers[difficulty as keyof typeof multipliers] || 1.3;
    return Math.round(baseXP * multiplier);
  };

  const handleSubmit = (answer: string = userAnswer) => {
    const correct = checkAnswer(answer);
    const xp = calculateXP(correct, exercise.difficulty);
    
    setIsCorrect(correct);
    setXpEarned(xp);
    setShowResult(true);
    
    if (correct) {
      setTriggerParticles(true);
      setTimeout(() => setTriggerParticles(false), 2000);
    }

    onComplete(exercise.id, correct, xp);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    if (exercise.type === 'multiple_choice') {
      handleSubmit(answer);
    }
  };

  const canSubmit = () => {
    if (exercise.type === 'classification') {
      return classificationAnswers.some(ans => ans.trim() !== '');
    }
    return userAnswer.trim() !== '';
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

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'ortografia': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'morfosintaxi': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'lexic': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <Card className={`relative transition-all duration-500 border-none bg-slate-900/60 backdrop-blur-2xl shadow-2xl overflow-hidden ${
      showResult ? (isCorrect ? 'ring-2 ring-emerald-500/50' : 'ring-2 ring-destructive/50') : 'hover:ring-1 hover:ring-white/10'
    }`}>
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] transition-all duration-1000 ${
        showResult ? (isCorrect ? 'bg-emerald-500/20' : 'bg-destructive/20') : 'bg-primary/5'
      }`} />
      
      <CardHeader className="pb-6 relative z-10 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`${getCategoryColor(category || 'ortografia')} border-none font-black text-[10px] uppercase tracking-tighter`}>
                {category || 'General'}
              </Badge>
              {showResult && (
                <div className={`flex items-center gap-1.5 animate-in zoom-in duration-300`}>
                  {isCorrect ? (
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-500 p-1 rounded-full"><CheckCircle className="h-3 w-3 text-black" /></div>
                      <span className="text-emerald-400 font-black text-xs">RESPOSTA CORRECTA</span>
                      <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black tracking-widest px-2">
                        <Zap className="h-2.5 w-2.5 mr-1 fill-current" />
                        +{xpEarned} XP
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="bg-destructive p-1 rounded-full"><XCircle className="h-3 w-3 text-white" /></div>
                      <span className="text-destructive font-black text-xs uppercase italic tracking-tighter">Torna a provar-ho</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-black text-white leading-tight mt-2">
              {exercise.question}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 pb-8 space-y-6 relative z-10">
        {/* Multiple Choice */}
        {exercise.type === 'multiple_choice' && shuffledOptions && (
          <div className="grid gap-3">
            {shuffledOptions.map((option, index) => (
              <button
                key={`${exercise.id}-opt-${index}`}
                className={`group relative w-full flex items-center justify-start text-left h-auto py-4 px-6 rounded-2xl border transition-all duration-300 ${
                  userAnswer === option
                    ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                  } ${showResult ? (
                    option === exercise.correctAnswer 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                      : option === userAnswer 
                      ? 'border-destructive bg-destructive/10 text-destructive' 
                      : 'opacity-40 grayscale-[0.5]'
                  ) : ''} ${showResult ? 'pointer-events-none' : ''}`}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
              >
                {showResult && isCorrect && option === exercise.correctAnswer && (
                  <SuccessParticles active={triggerParticles} />
                )}
                
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs mr-4 transition-colors ${
                  userAnswer === option ? 'bg-white/20' : 'bg-black/20 text-slate-500 group-hover:text-white'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-bold flex-1">{option}</span>
                
                {showResult && option === exercise.correctAnswer && (
                  <div className="bg-emerald-500 p-1 rounded-full animate-in zoom-in">
                    <CheckCircle className="h-3 w-3 text-black" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Classification */}
        {exercise.type === 'classification' && exercise.options && (
          <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
            <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-xs font-bold text-indigo-400 block italic">
              ✨ Assigna cada paraula a la seva categoria separant-les per comes.
            </div>
            
            <div className="grid gap-4">
              {exercise.options.map((option, index) => (
                <div key={index} className="space-y-2 p-5 rounded-3xl bg-black/20 border border-white/5 shadow-inner">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-black text-white uppercase tracking-widest">{option}</Label>
                    {showResult && (
                      <div className="text-[10px] font-black text-slate-500">RESPOSTA ESPERADA</div>
                    )}
                  </div>
                  <Input
                    className={`bg-white/5 border-white/10 text-white rounded-xl h-12 transition-all focus:ring-2 focus:ring-primary ${
                      showResult ? (isCorrect ? 'border-emerald-500/50' : 'border-destructive/50') : ''
                    }`}
                    placeholder="Paraules..."
                    value={classificationAnswers[index] || ''}
                    onChange={(e) => {
                      const newAnswers = [...classificationAnswers];
                      newAnswers[index] = e.target.value;
                      setClassificationAnswers(newAnswers);
                      setUserAnswer(newAnswers.join('|'));
                    }}
                    disabled={showResult}
                    autoComplete="off"
                  />
                  {showResult && (
                    <div className="p-2.5 rounded-xl bg-black/40 text-[11px] font-medium text-emerald-400/90 italic leading-relaxed">
                      Correcte: {Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer[index] : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fill in Blank / Correction */}
        {(exercise.type === 'fill_blank' || exercise.type === 'text_correction') && (
          <div className="space-y-4 animate-in zoom-in duration-300">
             <div className="p-6 bg-black/30 rounded-3xl border border-white/5 shadow-inner">
               <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Escriu la teva resposta</Label>
               <Input
                className={`bg-white/5 border-white/10 text-white h-14 text-lg font-bold rounded-2xl transition-all ${
                  showResult ? (isCorrect ? 'border-emerald-500' : 'border-destructive') : ''
                }`}
                placeholder="Resposta..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canSubmit() && !showResult && handleSubmit()}
                disabled={showResult}
                autoComplete="off"
              />
            </div>
            {showResult && (
               <div className="animate-in slide-in-from-top-2 duration-300">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  Solució: {Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer.join(' / ') : exercise.correctAnswer}
                </div>
               </div>
            )}
          </div>
        )}

        {/* Dictation */}
        {exercise.type === 'dictation' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-16 rounded-2xl bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:scale-[1.01] transition-all font-black"
              onClick={() => playDictationAudio(
                Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer[0] : exercise.correctAnswer as string
              )}
            >
              <Volume2 className="h-6 w-6 mr-3 animate-bounce" />
              REPRODUIR ÀUDIO
            </Button>
            
            <div className="p-6 bg-black/30 rounded-3xl border border-white/5 shadow-inner">
              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block underline decoration-primary decoration-2 underline-offset-4">Transcripció</Label>
              <Textarea
                className={`bg-white/5 border-white/10 text-white min-h-[120px] rounded-2xl font-medium leading-relaxed transition-all ${
                  showResult ? (isCorrect ? 'border-emerald-500' : 'border-destructive') : ''
                }`}
                placeholder="Escriu el que hagis escoltat..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showResult}
                autoComplete="off"
              />
            </div>

            {showResult && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold leading-relaxed italic">
                {Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer.join(' / ') : exercise.correctAnswer}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 relative">
          <SuccessParticles active={triggerParticles} />
          {!showResult ? (
            <Button
              onClick={() => handleSubmit()}
              disabled={!canSubmit()}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-20"
            >
              Comprovar Resposta
            </Button>
          ) : (
            <div className="w-full flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowExplanation(!showExplanation)}
                  variant="outline"
                  className="flex-1 h-14 rounded-2xl border-white/10 text-white font-black hover:bg-white/5"
                >
                  <Lightbulb className={`h-5 w-5 mr-2 ${showExplanation ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                  Explicació
                </Button>
                
                {!isCorrect && (
                  <Button
                    onClick={() => {
                      setShowResult(false);
                      setUserAnswer('');
                      setClassificationAnswers(exercise.options ? exercise.options.map(() => '') : []);
                    }}
                    className="flex-[1.5] h-14 rounded-2xl bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/50 font-black transition-all group"
                  >
                    <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-[-45deg] transition-transform" />
                    Torna-ho a provar
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Explanation Toggle */}
        {showExplanation && (
          <div className="mt-4 p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Lightbulb className="h-24 w-24 text-indigo-500" />
            </div>
            <h4 className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-widest mb-3">
              💡 Per què és així?
            </h4>
            <p className="text-sm text-slate-300 font-medium leading-relaxed italic relative z-10">
              {exercise.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
