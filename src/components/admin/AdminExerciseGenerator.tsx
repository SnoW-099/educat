import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateMassiveExercises } from '@/utils/generateExercises';
import { BookOpen, Users, Clock, Award } from 'lucide-react';

export const AdminExerciseGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateExercises = async () => {
    setIsGenerating(true);
    try {
      const insertedCount = await generateMassiveExercises();
      toast({
        title: "Èxit!",
        description: `S'han generat ${insertedCount} exercicis correctament`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error generating exercises:', error);
      toast({
        title: "Error",
        description: "No s'han pogut generar els exercicis",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-accent" />
            Generador d'Exercicis Massiu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed border-primary/20">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="font-semibold">Exercicis Regulars</h3>
                <p className="text-sm text-muted-foreground">
                  1800+ exercicis base (A1-C2)
                </p>
                <Badge variant="outline" className="mt-2">
                  Ortografia, Gramàtica, Dictats
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-accent/20">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto text-accent mb-2" />
                <h3 className="font-semibold">Exercicis de Repàs</h3>
                <p className="text-sm text-muted-foreground">
                  20+ exercicis de morfosintaxi i lèxic
                </p>
                <Badge variant="outline" className="mt-2">
                  Morfosintaxi, Lèxic, Expressions
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-success/20">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto text-success mb-2" />
                <h3 className="font-semibold">Exercicis de Llibre</h3>
                <p className="text-sm text-muted-foreground">
                  200+ exercicis d'ortografia del llibre
                </p>
                <Badge variant="outline" className="mt-2">
                  Ortografia Catalana
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Aquest procés generarà més de 2000 exercicis nous per a tots els nivells de català.
              Els exercicis inclouen varietat de tipus i categories per oferir una experiència
              d'aprenentatge completa.
            </p>
            
            <Button 
              onClick={handleGenerateExercises}
              disabled={isGenerating}
              size="lg"
              className="min-w-48"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generant exercicis...
                </>
              ) : (
                'Generar Tots els Exercicis'
              )}
            </Button>

            {isGenerating && (
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <p className="text-sm text-info">
                  <strong>Procés en curs:</strong> S'estan generant els exercicis en lots per evitar 
                  sobrecàrrega del sistema. Aquest procés pot trigar uns minuts.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};