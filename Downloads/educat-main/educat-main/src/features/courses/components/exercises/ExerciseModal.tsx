import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Lightbulb, Eye, BookOpen } from "lucide-react";
import { type GrammarSection, type Exercise } from "@/features/courses/data/catalanGrammarCategories";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { useAuth } from "@/hooks/useAuth";
import { TheoryModal } from "@/components/theory/TheoryModal";

interface ExerciseModalProps {
  section: GrammarSection;
  onClose: () => void;
}

export const ExerciseModal = ({ section, onClose }: ExerciseModalProps) => {
  const { profile } = useAuth();
  const { showAnswers, generateAlternativeAnswers } = useEasterEgg(profile?.role || 'student');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(section.exercises.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  const currentExercise = section.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / section.exercises.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentExerciseIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentExerciseIndex < section.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowExplanation(false);
    } else {
      setCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const calculateScore = () => {
    const correct = userAnswers.filter((answer, index) => 
      answer.toLowerCase().trim() === section.exercises[index].correctAnswer.toLowerCase().trim()
    ).length;
    return Math.round((correct / section.exercises.length) * 100);
  };

  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setUserAnswers(new Array(section.exercises.length).fill(''));
    setShowResults(false);
    setCompleted(false);
    setShowExplanation(false);
    setShowTheory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || target.getAttribute('contenteditable') === 'true';
      
      if (isTyping) return;
      
      if (userAnswers[currentExerciseIndex]) {
        e.preventDefault();
        handleNext();
      }
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resultats - {section.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-muted-foreground">
                {userAnswers.filter((answer, index) => 
                  answer.toLowerCase().trim() === section.exercises[index].correctAnswer.toLowerCase().trim()
                ).length} de {section.exercises.length} correctes
              </p>
            </div>

            <div className="space-y-4">
              {section.exercises.map((exercise, index) => {
                const isCorrect = userAnswers[index]?.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
                
                return (
                  <Card key={exercise.id} className={`border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        )}
                        
                        <div className="flex-1 space-y-2">
                          <p className="font-medium">{exercise.question}</p>
                          
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="font-medium">La teva resposta: </span>
                              <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                {userAnswers[index] || 'Sense resposta'}
                              </span>
                            </div>
                            
                            <div>
                              <span className="font-medium">Resposta correcta: </span>
                              <span className="text-green-700">{exercise.correctAnswer}</span>
                            </div>
                            
                            <div className="text-muted-foreground">
                              <span className="font-medium">Explicació: </span>
                              {exercise.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={resetExercise} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Repetir
              </Button>
              <Button onClick={onClose}>
                Tancar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{section.title}</DialogTitle>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTheory(true)}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Teoria
              </Button>
              {profile?.role === 'student' && (
                <div className="text-xs text-muted-foreground opacity-50">
                  Ctrl+K per activar ajuda
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Exercici {currentExerciseIndex + 1} de {section.exercises.length}
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {currentExercise.referenceText && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <p className="text-sm leading-relaxed">{currentExercise.referenceText}</p>
              </CardContent>
            </Card>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{currentExercise.question}</h3>
              {showAnswers && (
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-lg text-sm">
                  <Eye className="h-4 w-4 text-accent-foreground" />
                  <span className="text-accent-foreground font-medium">
                    {generateAlternativeAnswers(currentExercise.correctAnswer)[0]}
                  </span>
                </div>
              )}
            </div>
            
            {currentExercise.type === 'multiple_choice' && currentExercise.options && (
              <div className="space-y-2">
                {currentExercise.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswers[currentExerciseIndex] === option ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleAnswer(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswer(option);
                      }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
            
            {(currentExercise.type === 'fill_blank' || currentExercise.type === 'dictation') && (
              <div>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  placeholder="Escriu la teva resposta..."
                  value={userAnswers[currentExerciseIndex]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswers[currentExerciseIndex]) {
                      handleNext();
                    }
                  }}
                />
              </div>
            )}

            {currentExercise.type === 'text_correction' && (
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm font-medium text-red-800 mb-2">Text incorrecte:</p>
                  <p className="text-red-700">{currentExercise.incorrectText}</p>
                </div>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  placeholder="Escriu el text corregit..."
                  value={userAnswers[currentExerciseIndex]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswers[currentExerciseIndex]) {
                      handleNext();
                    }
                  }}
                />
              </div>
            )}

            {currentExercise.type === 'matching' && currentExercise.options && (
              <div className="space-y-2">
                {currentExercise.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswers[currentExerciseIndex] === option ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleAnswer(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswer(option);
                      }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {currentExercise.type === 'true_false' && (
              <div className="space-y-2">
                <Button
                  variant={userAnswers[currentExerciseIndex] === 'true' ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleAnswer('true')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAnswer('true');
                    }
                  }}
                >
                  Cert
                </Button>
                <Button
                  variant={userAnswers[currentExerciseIndex] === 'false' ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleAnswer('false')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAnswer('false');
                    }
                  }}
                >
                  Fals
                </Button>
              </div>
            )}

          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentExerciseIndex === 0}
            >
              Anterior
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!userAnswers[currentExerciseIndex]}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userAnswers[currentExerciseIndex]) {
                  handleNext();
                }
              }}
            >
              {currentExerciseIndex === section.exercises.length - 1 ? 'Finalitzar' : 'Següent'}
            </Button>
          </div>
        </div>
      </DialogContent>
      
      {showTheory && (
        <TheoryModal 
          topic="dieresi" 
          onClose={() => setShowTheory(false)} 
        />
      )}
    </Dialog>
  );
};