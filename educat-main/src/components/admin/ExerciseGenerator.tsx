import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Database, Play, CheckCircle, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import { generateMassiveExercises } from '@/utils/generateExercises';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const ExerciseGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDailyGenerating, setIsDailyGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [dailyStatus, setDailyStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [generatedCount, setGeneratedCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const { toast } = useToast();

  const handleGenerateExercises = async () => {
    setIsGenerating(true);
    setStatus('generating');
    setProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const count = await generateMassiveExercises();
      
      clearInterval(progressInterval);
      setProgress(100);
      setGeneratedCount(count);
      setStatus('success');
      
      toast({
        title: "Exercicis generats!",
        description: `S'han creat ${count} exercicis nous de tots els nivells`,
      });
      
    } catch (error) {
      console.error('Error generating exercises:', error);
      setStatus('error');
      toast({
        title: "Error",
        description: "No s'han pogut generar els exercicis",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateDailyExercises = async () => {
    setIsDailyGenerating(true);
    setDailyStatus('generating');
    
    try {
      console.log('🚀 Calling daily exercise update function...');
      
      const { data, error } = await supabase.functions.invoke('daily-exercise-update', {
        body: {}
      });

      if (error) {
        console.error('❌ Error calling daily exercise update:', error);
        throw error;
      }

      console.log('✅ Daily exercise update response:', data);
      
      setDailyCount(data?.exercisesCount || 0);
      setDailyStatus('success');
      
      toast({
        title: "Exercicis diaris generats!",
        description: `S'han creat ${data?.exercisesCount || 0} exercicis diaris`,
      });
      
    } catch (error) {
      console.error('Error generating daily exercises:', error);
      setDailyStatus('error');
      toast({
        title: "Error",
        description: "No s'han pogut generar els exercicis diaris",
        variant: "destructive"
      });
    } finally {
      setIsDailyGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Exercises Card */}
      <Card className="w-full max-w-2xl mx-auto border-accent/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-accent" />
            <div>
              <CardTitle className="text-accent">Exercicis Diaris</CardTitle>
              <p className="text-sm text-muted-foreground">
                Genera exercicis diaris per a totes les classes actives
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{dailyCount || '200+'}</div>
              <div className="text-sm text-muted-foreground">Exercicis generats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">Daily</div>
              <div className="text-sm text-muted-foreground">Renovació automàtica</div>
            </div>
          </div>

          {dailyStatus === 'success' && (
            <div className="flex items-center space-x-2 p-3 bg-success/10 text-success rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">
                S'han generat {dailyCount} exercicis diaris correctament!
              </span>
            </div>
          )}

          {dailyStatus === 'error' && (
            <div className="flex items-center space-x-2 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                Error en generar els exercicis diaris. Torna-ho a intentar.
              </span>
            </div>
          )}

          <Button 
            onClick={handleGenerateDailyExercises}
            disabled={isDailyGenerating}
            className="w-full"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isDailyGenerating ? 'animate-spin' : ''}`} />
            {isDailyGenerating ? 'Generant exercicis diaris...' : 'Generar Exercicis Diaris Ara'}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            💡 Els exercicis diaris es generen automàticament cada dia per a cada classe
          </div>
        </CardContent>
      </Card>

      {/* Massive Exercises Card */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-accent" />
            <div>
              <CardTitle>Generador d'Exercicis Massiu</CardTitle>
              <p className="text-sm text-muted-foreground">
                Genera milers d'exercicis per a tots els nivells (A1-C2)
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1800+</div>
              <div className="text-sm text-muted-foreground">Exercicis totals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">6</div>
              <div className="text-sm text-muted-foreground">Nivells (A1-C2)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Categories incloses:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Ortografia</Badge>
              <Badge variant="outline">Gramàtica</Badge>
              <Badge variant="outline">Dictats</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Nivells inclosos:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800">A1</Badge>
              <Badge className="bg-blue-100 text-blue-800">A2</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">B1</Badge>
              <Badge className="bg-orange-100 text-orange-800">B2</Badge>
              <Badge className="bg-red-100 text-red-800">C1</Badge>
              <Badge className="bg-purple-100 text-purple-800">C2</Badge>
            </div>
          </div>

          {isGenerating && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Generant exercicis...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center space-x-2 p-3 bg-success/10 text-success rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">
                S'han generat {generatedCount} exercicis correctament!
              </span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center space-x-2 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                Error en generar els exercicis. Torna-ho a intentar.
              </span>
            </div>
          )}

          <Button 
            onClick={handleGenerateExercises}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generant exercicis...' : 'Generar Exercicis Massius'}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            ⚠️ Aquesta operació pot trigar uns minuts i generarà una gran quantitat d'exercicis
          </div>
        </CardContent>
      </Card>
    </div>
  );
};