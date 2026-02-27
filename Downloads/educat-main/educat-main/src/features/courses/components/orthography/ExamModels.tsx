import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, CheckCircle, XCircle, Award, Timer, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEasterEgg } from '@/hooks/useEasterEgg';

interface ExamQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  textReference?: string; // Reference to the theoretical text source
}

interface ExamModel {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  hideAnswersUntilComplete?: boolean; // New property to control answer visibility
  sections: {
    name: string;
    questions: ExamQuestion[];
  }[];
}

const EXAM_MODELS: ExamModel[] = [
  {
    id: 'model-1',
    title: 'Model d\'Examen 1',
    description: 'Examen complet amb totes les àrees: comprensió oral, lectora, expressió escrita, gramàtica i lèxic',
    timeLimit: 60,
    hideAnswersUntilComplete: true,
    sections: [
      {
        name: 'Àrea 2. Comprensió lectora',
        questions: [
          {
            id: 'cl-1',
            type: 'true-false',
            question: 'L\'Ajuntament de Badalona ha nomenat fill adoptiu Pompeu Fabra després d\'una persistent reivindicació ciutadana.',
            correctAnswer: 'false',
            explanation: 'Segons el text, Pompeu Fabra ja era fill adoptiu abans de la reivindicació ciutadana.',
            textReference: 'Text: "Pompeu Fabra a Badalona" - Paràgraf 1',
            points: 2
          },
          {
            id: 'cl-2',
            type: 'true-false',
            question: 'Una placa commemorativa recorda Pompeu Fabra davant de l\'edifici municipal del Viver.',
            correctAnswer: 'false',
            explanation: 'La placa està al carrer de la Mercè, no davant de l\'edifici del Viver.',
            textReference: 'Text: "Pompeu Fabra a Badalona" - Paràgraf 2',
            points: 2
          },
          {
            id: 'cl-3',
            type: 'true-false',
            question: 'La demografia actual badalonina s\'ajusta molt a la concepció que tenia Fabra de la llengua.',
            correctAnswer: 'true',
            explanation: 'El text indica que la realitat actual de Badalona és "diversa" com la llengua que Fabra va fer.',
            points: 2
          },
          {
            id: 'cl-4',
            type: 'true-false',
            question: 'La placa explica que Fabra defensava el català com a eix vertebrador bàsic de la societat.',
            correctAnswer: 'false',
            explanation: 'Aquesta informació no consta a la placa, sinó en les paraules de Marcel Mauri.',
            points: 2
          },
          {
            id: 'cl-5',
            type: 'true-false',
            question: 'A Badalona, abans del seu exili forçós a l\'Estat francès, Fabra va escriure el més important de la seva obra.',
            correctAnswer: 'true',
            explanation: 'El text diu que va escriure "bona part del bo i el millor de la seva obra".',
            points: 2
          },
          {
            id: 'cl-6',
            type: 'multiple-choice',
            question: 'Segons el text, què caracteritza la llengua catalana que va codificar Fabra?',
            options: ['És una llengua pura i homogènia', 'És una llengua diversa i inclusiva', 'És una llengua només per a intel·lectuals', 'És una llengua difícil d\'aprendre'],
            correctAnswer: 'És una llengua diversa i inclusiva',
            explanation: 'El text destaca la diversitat com a característica positiva de la llengua catalana.',
            points: 3
          },
          {
            id: 'cl-7',
            type: 'multiple-choice',
            question: 'On va viure Pompeu Fabra durant el seu exili?',
            options: ['França', 'Itàlia', 'Alemanya', 'Suïssa'],
            correctAnswer: 'França',
            explanation: 'El text menciona el seu exili forçós a l\'Estat francès.',
            points: 2
          },
          {
            id: 'cl-8',
            type: 'fill-blank',
            question: 'Fabra va escriure a Badalona bona part del _____ i el _____ de la seva obra.',
            correctAnswer: ['bo millor'],
            explanation: 'Les paraules correctes són "bo" i "millor".',
            points: 4
          },
          {
            id: 'cl-9',
            type: 'true-false',
            question: 'La placa commemorativa de Fabra es troba en un edifici històric de Badalona.',
            correctAnswer: 'false',
            explanation: 'La placa està al carrer, no en un edifici.',
            points: 2
          },
          {
            id: 'cl-10',
            type: 'multiple-choice',
            question: 'Quin aspecte de Badalona actual reflecteix millor la visió de Fabra sobre la llengua?',
            options: ['La seva homogeneïtat cultural', 'La seva diversitat demogràfica', 'La seva tradició industrial', 'La seva proximitat a Barcelona'],
            correctAnswer: 'La seva diversitat demogràfica',
            explanation: 'El text relaciona la diversitat actual de Badalona amb la concepció diversa de la llengua de Fabra.',
            points: 3
          },
          {
            id: 'cl-11',
            type: 'short-answer',
            question: 'Explica breument per què Marcel Mauri considera que Fabra defensava el català com a eix vertebrador de la societat. (30-40 paraules)',
            correctAnswer: 'Resposta oberta sobre la funció cohesionadora del català',
            explanation: 'Ha de mencionar la funció social i cohesionadora de la llengua.',
            points: 5
          },
          {
            id: 'cl-12',
            type: 'true-false',
            question: 'Segons el text, la reivindicació ciutadana va ser l\'única raó pel reconeixement de Fabra.',
            correctAnswer: 'false',
            explanation: 'El reconeixement ja existia abans de la reivindicació.',
            points: 2
          }
        ]
      },
      {
        name: 'Àrea 3. Expressió escrita',
        questions: [
          {
            id: 'ee-1',
            type: 'short-answer',
            question: 'Nota: L\'ordinador no et funciona bé: no desa els canvis que hi introdueixes, així que vas a buscar el tècnic informàtic, però no hi és. Deixa-li una nota a la taula perquè vingui a resoldre\'t el problema. (50-70 paraules)',
            correctAnswer: 'Resposta oberta - ha de ser una nota adequada al context',
            points: 10
          },
          {
            id: 'ee-2',
            type: 'essay',
            question: 'Correu electrònic: Ets el/la director/a del grup de teatre de la teva localitat. Al local que feu servir per assajar s\'hi han de fer reformes urgents, per la qual cosa, durant les obres, que duraran un any, necessitareu un altre local. Escriu un correu electrònic a l\'Ajuntament per sol·licitar temporalment un local d\'assaig i aprofita per posar-los al corrent dels projectes que esteu preparant. (150-200 paraules)',
            correctAnswer: 'Resposta oberta - ha de ser un correu formal adequat',
            points: 15
          },
          {
            id: 'ee-3',
            type: 'short-answer',
            question: 'Text informatiu: Redacta un breu text informatiu sobre els beneficis de fer exercici físic regular. Ha de contenir una introducció, tres beneficis principals i una conclusió. (80-100 paraules)',
            correctAnswer: 'Resposta oberta - text informatiu estructurat',
            points: 12
          },
          {
            id: 'ee-4',
            type: 'short-answer',
            question: 'Carta formal: Escriu una carta formal a una empresa per reclamar un producte defectuós que vas comprar fa una setmana. Inclou tots els elements d\'una carta formal. (100-120 paraules)',
            correctAnswer: 'Resposta oberta - carta formal amb estructura correcta',
            points: 12
          }
        ]
      },
      {
        name: 'Àrea 4. Gramàtica i lèxic',
        questions: [
          {
            id: 'gl-1',
            type: 'fill-blank',
            question: 'Ompliu els buits: El dia es va a__ecar molt a__olellat i aquella bonança convida__a a fer un tomb',
            correctAnswer: ['alçar abellerit convidava'],
            explanation: 'Les grafies correctes són: alçar, abellerit, convidava',
            points: 6
          },
          {
            id: 'gl-2',
            type: 'multiple-choice',
            question: 'Quan algú s\'ennuega...',
            options: [
              'se li entravessa alguna cosa a la gola i no pot respirar',
              'esmena una feina que ja tenia mig feta',
              'es posa malalt',
              's\'equivoca'
            ],
            correctAnswer: 'se li entravessa alguna cosa a la gola i no pot respirar',
            points: 2
          },
          {
            id: 'gl-3',
            type: 'multiple-choice',
            question: 'Com escrivim el número 2.354.662?',
            options: [
              'dos millons tres-cents cinquanta-quatre mil sis-cents seixanta-dos',
              'dos milions tres-cents cinquanta quatre mil sis-cents seixanta-dos',
              'dos milions tres-cents cinquanta-quatre mil sis-cents seixanta-dos',
              'dos milions tres cents cinquanta-quatre mil sis-cents seixanta-dos'
            ],
            correctAnswer: 'dos milions tres-cents cinquanta-quatre mil sis-cents seixanta-dos',
            points: 3
          },
          {
            id: 'gl-4',
            type: 'multiple-choice',
            question: 'Un llogater és...',
            options: [
              'la persona que rep els diners d\'un lloguer',
              'la persona que paga un lloguer',
              'l\'autoritat que estableix els preus dels lloguers',
              'la llei que regula els contractes d\'arrendament'
            ],
            correctAnswer: 'la persona que paga un lloguer',
            points: 2
          },
          {
            id: 'gl-5',
            type: 'fill-blank',
            question: 'Completeu amb la forma verbal correcta: Ahir _______ (anar, 1a persona singular) al mercat i _______ (comprar, 1a persona singular) verdures.',
            correctAnswer: ['vaig anar vaig comprar'],
            explanation: 'Les formes correctes del passat perifràstic són "vaig anar" i "vaig comprar".',
            points: 4
          },
          {
            id: 'gl-6',
            type: 'multiple-choice',
            question: 'Quin és el plural correcte de "cavall"?',
            options: ['cavalls', 'cavals', 'cavalles', 'cavallses'],
            correctAnswer: 'cavalls',
            explanation: 'El plural de "cavall" és "cavalls".',
            points: 2
          },
          {
            id: 'gl-7',
            type: 'multiple-choice',
            question: 'Quina preposició és correcta: "Vam anar _____ Barcelona"?',
            options: ['a', 'en', 'per', 'de'],
            correctAnswer: 'a',
            explanation: 'Amb verbs de moviment i noms de llocs, s\'usa la preposició "a".',
            points: 2
          },
          {
            id: 'gl-8',
            type: 'fill-blank',
            question: 'Escriviu la forma correcta: _______ (aquest, femení plural) cases són molt _______ (bonic, femení plural).',
            correctAnswer: ['aquestes boniques'],
            explanation: 'Les formes correctes són "aquestes" (demostratiu femení plural) i "boniques" (adjectiu femení plural).',
            points: 4
          },
          {
            id: 'gl-9',
            type: 'multiple-choice',
            question: 'Quin pronom feble és correcte: "_____ dic la veritat" (a tu)?',
            options: ['et', 'te', 'ti', 'tu'],
            correctAnswer: 'et',
            explanation: 'El pronom feble de segona persona singular és "et".',
            points: 2
          },
          {
            id: 'gl-10',
            type: 'multiple-choice',
            question: 'Com s\'escriu correctament?',
            options: ['Amb tot i això', 'Amb tot i amb això', 'Tot i això', 'Tot i amb això'],
            correctAnswer: 'Tot i això',
            explanation: 'La locució correcta és "tot i això".',
            points: 3
          }
        ]
      }
    ]
  },
  {
    id: 'model-2',
    title: 'Model d\'Examen 2',
    description: 'Examen centrat en comprensió lectora i gramàtica avançada',
    timeLimit: 30,
    hideAnswersUntilComplete: true,
    sections: [
      {
        name: 'Àrea 2. Comprensió lectora',
        questions: [
          {
            id: 'cl2-1',
            type: 'true-false',
            question: 'L\'arribada de l\'agricultura a Europa no va modificar l\'aspecte físic i fisiològic dels europeus.',
            correctAnswer: 'false',
            explanation: 'El text indica que l\'ADN va experimentar canvis que van alterar diversos aspectes físics.',
            points: 2
          },
          {
            id: 'cl2-2',
            type: 'true-false',
            question: 'En aquest nou treball els científics han pogut seguir l\'evolució de la metamorfosi genètica dels europeus al llarg de milers d\'anys.',
            correctAnswer: 'true',
            explanation: 'El text confirma que ara poden observar com es van produir els canvis al llarg del temps.',
            points: 2
          },
          {
            id: 'cl2-3',
            type: 'true-false',
            question: 'Abans els investigadors feien la recerca basant-se en l\'ADN antic i ara ho fan amb l\'estudi acurat dels ossos.',
            correctAnswer: 'false',
            explanation: 'És al contrari: abans es basaven en ossos i ara usen ADN antic.',
            points: 2
          }
        ]
      },
      {
        name: 'Àrea 4. Gramàtica i lèxic',
        questions: [
          {
            id: 'gl2-1',
            type: 'multiple-choice',
            question: 'Què fa una mainadera?',
            options: [
              'Endreça',
              'Apedaça la roba vella',
              'Fa feines complementàries en una cuina',
              'Té cura d\'un infant'
            ],
            correctAnswer: 'Té cura d\'un infant',
            points: 2
          },
          {
            id: 'gl2-2',
            type: 'multiple-choice',
            question: 'Una rampoina és...',
            options: [
              'una cosa inservible, d\'escàs valor',
              'un desig sobtat de fer alguna cosa',
              'una classificació ordenada segons un criteri determinat',
              'una pla inclinat'
            ],
            correctAnswer: 'una cosa inservible, d\'escàs valor',
            points: 2
          },
          {
            id: 'gl2-3',
            type: 'multiple-choice',
            question: 'En aquest Jutjat, l\'any passat hi van entrar 5.324 demandes.',
            options: [
              'cinc-mil tres-centes vint-i-quatre',
              'cinc mil tres-cents vint-i-quatre',
              'cinc mil tres-centes vint-i-quatre',
              'cinc-mil tres cents vint-i-quatre'
            ],
            correctAnswer: 'cinc mil tres-centes vint-i-quatre',
            points: 2
          }
        ]
      }
    ]
  }
];

interface ExamModelsProps {
  onExamComplete?: (examId: string, score: number, totalPoints: number) => void;
}

export const ExamModels = ({ onExamComplete }: ExamModelsProps) => {
  const { showAnswers } = useEasterEgg('student');
  const [selectedExam, setSelectedExam] = useState<ExamModel | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [results, setResults] = useState<{ correct: number; total: number; score: number } | null>(null);
  const [completedExams, setCompletedExams] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (examStarted && timeLeft > 0 && !examFinished) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && examStarted && !examFinished) {
      handleTimeUp();
    }
  }, [timeLeft, examStarted, examFinished]);

  const handleTimeUp = useCallback(() => {
    toast({
      title: "Temps esgotat!",
      description: "L'examen s'ha finalitzat automàticament.",
      variant: "destructive"
    });
    finishExam();
  }, []);

  const startExam = (exam: ExamModel) => {
    if (completedExams.has(exam.id)) {
      toast({
        title: "Examen ja completat",
        description: "Només pots fer cada examen una vegada.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedExam(exam);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setTimeLeft(exam.timeLimit * 60); // Convert to seconds
    setExamStarted(true);
    setExamFinished(false);
    setResults(null);
  };

  const finishExam = () => {
    if (!selectedExam) return;
    
    setExamFinished(true);
    
    // Calculate results
    let correct = 0;
    let totalPoints = 0;
    
    selectedExam.sections.forEach(section => {
      section.questions.forEach(question => {
        totalPoints += question.points;
        const userAnswer = answers.get(question.id);
        
        if (userAnswer && isCorrectAnswer(question, userAnswer)) {
          correct += question.points;
        }
      });
    });
    
    const score = Math.round((correct / totalPoints) * 100);
    setResults({ correct, total: totalPoints, score });
    
    // Mark exam as completed
    setCompletedExams(prev => new Set(prev.add(selectedExam.id)));
    
    onExamComplete?.(selectedExam.id, score, totalPoints);
    
    toast({
      title: "Examen finalitzat!",
      description: `Puntuació: ${score}% (${correct}/${totalPoints} punts)`,
      duration: 5000
    });
  };

  const isCorrectAnswer = (question: ExamQuestion, userAnswer: string): boolean => {
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.some(correct => 
        userAnswer.toLowerCase().trim() === correct.toLowerCase().trim()
      );
    }
    return userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => new Map(prev.set(getCurrentQuestion().id, answer)));
  };

  const getCurrentQuestion = () => {
    if (!selectedExam) return null;
    return selectedExam.sections[currentSectionIndex]?.questions[currentQuestionIndex];
  };

  const nextQuestion = () => {
    if (!selectedExam) return;
    
    const currentSection = selectedExam.sections[currentSectionIndex];
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < selectedExam.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      finishExam();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = selectedExam?.sections[currentSectionIndex - 1];
      if (prevSection) {
        setCurrentQuestionIndex(prevSection.questions.length - 1);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!selectedExam) return 0;
    
    let totalQuestions = 0;
    let currentPosition = 0;
    
    selectedExam.sections.forEach((section, sectionIndex) => {
      totalQuestions += section.questions.length;
      if (sectionIndex < currentSectionIndex) {
        currentPosition += section.questions.length;
      } else if (sectionIndex === currentSectionIndex) {
        currentPosition += currentQuestionIndex;
      }
    });
    
    return Math.round((currentPosition / totalQuestions) * 100);
  };

  if (!selectedExam) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Models d'Examen</h2>
        </div>
        
        <div className="grid gap-6">
          {EXAM_MODELS.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                    <CardDescription className="mt-2">{exam.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {exam.timeLimit} min
                    </Badge>
                    {completedExams.has(exam.id) && (
                      <div>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completat
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {exam.sections.reduce((total, section) => total + section.questions.length, 0)} preguntes
                  </div>
                  <Button 
                    onClick={() => startExam(exam)}
                    disabled={completedExams.has(exam.id)}
                    variant={completedExams.has(exam.id) ? "outline" : "default"}
                  >
                    {completedExams.has(exam.id) ? "Ja completat" : "Començar examen"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (examFinished && results) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              {results.score >= 70 ? (
                <CheckCircle className="h-12 w-12 text-success" />
              ) : (
                <XCircle className="h-12 w-12 text-destructive" />
              )}
            </div>
            <CardTitle className="text-2xl">Examen finalitzat</CardTitle>
            <CardDescription>Resultats de {selectedExam.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-primary">
                {results.score}%
              </div>
              <div className="text-muted-foreground">
                {results.correct} de {results.total} punts
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results with Explanations and Text References */}
        <Card>
          <CardHeader>
            <CardTitle>Revisió detallada</CardTitle>
            <CardDescription>Respostes, explicacions i referències teòriques</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedExam.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="font-semibold text-lg mb-3 text-primary">{section.name}</h3>
                <div className="space-y-4">
                  {section.questions.map((question, questionIndex) => {
                    const userAnswer = answers.get(question.id) || '';
                    const isCorrect = isCorrectAnswer(question, userAnswer);
                    
                    return (
                      <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'}`}>
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1 space-y-3">
                            <div>
                              <h4 className="font-medium">{questionIndex + 1}. {question.question}</h4>
                              <div className="text-sm text-muted-foreground mt-1">
                                {question.points} punts
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium">La teva resposta: </span>
                                <span className={`text-sm ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                                  {userAnswer || 'No contestada'}
                                </span>
                              </div>
                              
                              {!isCorrect && (
                                <div>
                                  <span className="text-sm font-medium">Resposta correcta: </span>
                                  <span className="text-sm text-success">
                                    {Array.isArray(question.correctAnswer) 
                                      ? question.correctAnswer.join(' o ') 
                                      : question.correctAnswer}
                                  </span>
                                </div>
                              )}
                            </div>

                            {question.explanation && (
                              <div className="bg-primary/5 border border-primary/20 rounded p-3">
                                <div className="flex items-start gap-2">
                                  <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <div>
                                    <h5 className="font-medium text-primary text-sm">Explicació</h5>
                                    <p className="text-sm text-muted-foreground mt-1">{question.explanation}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {question.textReference && (
                              <div className="bg-accent/5 border border-accent/20 rounded p-3">
                                <div className="flex items-start gap-2">
                                  <BookOpen className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                  <div>
                                    <h5 className="font-medium text-accent text-sm">Referència teòrica</h5>
                                    <p className="text-sm text-muted-foreground mt-1">{question.textReference}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button onClick={() => {
            setSelectedExam(null);
            setExamStarted(false);
            setExamFinished(false);
            setResults(null);
            setAnswers(new Map());
            setCurrentSectionIndex(0);
            setCurrentQuestionIndex(0);
          }}>
            Tornar als models
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const currentSection = selectedExam.sections[currentSectionIndex];
  
  if (!currentQuestion || !currentSection) {
    return <div>Error: No s'ha trobat la pregunta actual</div>;
  }

  const userAnswer = answers.get(currentQuestion.id) || '';
  const progress = getProgress();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with timer and progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{selectedExam.title}</CardTitle>
              <CardDescription>{currentSection.name}</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-accent" />
                <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-destructive' : 'text-foreground'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Badge variant="outline">
                Pregunta {currentQuestionIndex + 1} de {currentSection.questions.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
          <div className="text-sm text-muted-foreground mt-1">
            {progress}% completat
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{currentQuestion.points} punts</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <RadioGroup value={userAnswer} onValueChange={handleAnswer}>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                      {showAnswers && !selectedExam.hideAnswersUntilComplete && option === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-4 w-4 ml-2 text-success inline" />
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {/* True/False */}
          {currentQuestion.type === 'true-false' && (
            <RadioGroup value={userAnswer} onValueChange={handleAnswer}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="cursor-pointer">
                    Cert
                    {showAnswers && !selectedExam.hideAnswersUntilComplete && currentQuestion.correctAnswer === 'true' && (
                      <CheckCircle className="h-4 w-4 ml-2 text-success inline" />
                    )}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="cursor-pointer">
                    Fals
                    {showAnswers && !selectedExam.hideAnswersUntilComplete && currentQuestion.correctAnswer === 'false' && (
                      <CheckCircle className="h-4 w-4 ml-2 text-success inline" />
                    )}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          )}

          {/* Fill in the blank */}
          {currentQuestion.type === 'fill-blank' && (
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Escriu la teva resposta..."
                value={userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full"
              />
              {showAnswers && !selectedExam.hideAnswersUntilComplete && (
                <div className="text-sm text-success bg-success/10 p-2 rounded">
                  Resposta correcta: {Array.isArray(currentQuestion.correctAnswer) 
                    ? currentQuestion.correctAnswer.join(', ') 
                    : currentQuestion.correctAnswer}
                </div>
              )}
            </div>
          )}

          {/* Short answer */}
          {currentQuestion.type === 'short-answer' && (
            <div className="space-y-3">
              <Textarea
                placeholder="Escriu la teva resposta..."
                value={userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full min-h-24"
              />
            </div>
          )}

          {/* Essay */}
          {currentQuestion.type === 'essay' && (
            <div className="space-y-3">
              <Textarea
                placeholder="Escriu el teu assaig..."
                value={userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full min-h-32"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={previousQuestion}
              disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
            >
              Anterior
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button onClick={finishExam} variant="destructive">
                Finalitzar examen
              </Button>
              
              <Button onClick={nextQuestion}>
                {currentSectionIndex === selectedExam.sections.length - 1 && 
                 currentQuestionIndex === currentSection.questions.length - 1 
                  ? 'Finalitzar' 
                  : 'Següent'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};