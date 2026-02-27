import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ClassInfo {
  id: string;
  name: string;
  level: string;
  description: string;
  professor_name: string;
  student_count: number;
  max_students: number;
}

interface ClassChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUserId: string;
  onClassChanged: () => void;
}

export const ClassChangeModal = ({ open, onOpenChange, currentUserId, onClassChanged }: ClassChangeModalProps) => {
  const [classCode, setClassCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundClass, setFoundClass] = useState<ClassInfo | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();

  const searchClass = async () => {
    if (!classCode.trim()) return;

    try {
      setIsSearching(true);

      const { data, error } = await supabase
        .from('classes')
        .select(`
          id,
          name,
          level,
          description,
          max_students,
          is_active,
          allow_late_enrollment,
          professor_id,
          profiles!classes_professor_id_fkey (
            name
          ),
          enrollments (
            student_id,
            is_active
          )
        `)
        .eq('code', classCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        toast({
          title: 'Classe no trobada',
          description: 'No s\'ha trobat cap classe amb aquest codi',
          variant: 'destructive'
        });
        setFoundClass(null);
        return;
      }

      const studentCount = data.enrollments?.filter(e => e.is_active).length || 0;

      setFoundClass({
        id: data.id,
        name: data.name,
        level: data.level,
        description: data.description || '',
        professor_name: (data.profiles as any)?.name || 'Professor desconegut',
        student_count: studentCount,
        max_students: data.max_students || 50
      });

    } catch (error) {
      console.error('Error searching class:', error);
      toast({
        title: 'Error',
        description: 'Error cercant la classe',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const joinClass = async () => {
    if (!foundClass) return;

    try {
      setIsJoining(true);

      // First, deactivate current enrollment
      const { error: deactivateError } = await supabase
        .from('enrollments')
        .update({ is_active: false })
        .eq('student_id', currentUserId)
        .eq('is_active', true);

      if (deactivateError) throw deactivateError;

      // Check if student already has an enrollment (active or inactive) with this class
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('student_id', currentUserId)
        .eq('class_id', foundClass.id)
        .maybeSingle();

      if (existingEnrollment) {
        // Reactivate existing enrollment
        const { error: updateError } = await supabase
          .from('enrollments')
          .update({ is_active: true })
          .eq('id', existingEnrollment.id);

        if (updateError) throw updateError;
      } else {
        // Create new enrollment
        const { error: insertError } = await supabase
          .from('enrollments')
          .insert({
            student_id: currentUserId,
            class_id: foundClass.id,
            is_active: true
          });

        if (insertError) throw insertError;
      }

      toast({
        title: 'Classe canviada!',
        description: `T'has unit a la classe "${foundClass.name}"`,
      });

      onClassChanged();
      onOpenChange(false);
      setClassCode('');
      setFoundClass(null);

    } catch (error: any) {
      console.error('Error joining class:', error);

      if (error.message?.includes('límit màxim')) {
        toast({
          title: 'Classe plena',
          description: 'Aquesta classe ha assolit el límit màxim d\'estudiants',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: 'No s\'ha pogut canviar de classe',
          variant: 'destructive'
        });
      }
    } finally {
      setIsJoining(false);
    }
  };

  const leaveClass = async () => {
    try {
      setIsJoining(true);

      // Deactivate current enrollment
      const { error } = await supabase
        .from('enrollments')
        .update({ is_active: false })
        .eq('student_id', currentUserId)
        .eq('is_active', true);

      if (error) throw error;

      toast({
        title: 'Has abandonat la classe',
        description: 'Ja no estàs inscrit a cap classe',
      });

      onClassChanged();
      onOpenChange(false);
      setClassCode('');
      setFoundClass(null);

    } catch (error: any) {
      console.error('Error leaving class:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut abandonar la classe',
        variant: 'destructive'
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setClassCode('');
    setFoundClass(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Gestionar classe</span>
          </DialogTitle>
          <DialogDescription id="class-manage-desc" className="sr-only">Canvia o abandona la teva classe actual.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <form onSubmit={(e) => { e.preventDefault(); searchClass(); }} className="space-y-2">
            <Label htmlFor="classCode">Codi de la nova classe</Label>
            <div className="flex space-x-2">
              <Input
                id="classCode"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase().slice(0, 7))}
                placeholder="Ex: ABC1234"
                className="uppercase"
                maxLength={7}
              />
              <Button
                type="submit"
                disabled={!classCode.trim() || isSearching}
                variant="outline"
              >
                {isSearching ? 'Cercant...' : 'Cercar'}
              </Button>
            </div>
          </form>

          {foundClass && (
            <Card className="border-accent/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{foundClass.name}</CardTitle>
                  <Badge variant="secondary">{foundClass.level}</Badge>
                </div>
                <CardDescription>{foundClass.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Professor:</span>
                  <span className="font-medium">{foundClass.professor_name}</span>
                </div>

                {foundClass.student_count >= foundClass.max_students ? (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Classe plena</span>
                  </div>
                ) : (
                  <Button
                    onClick={joinClass}
                    disabled={isJoining}
                    className="w-full"
                  >
                    {isJoining ? 'Unint-se...' : 'Unir-se a aquesta classe'}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Button
              onClick={leaveClass}
              variant="destructive"
              className="w-full"
              disabled={isJoining}
            >
              {isJoining ? 'Abandonant...' : 'Abandonar classe actual'}
            </Button>

            <div className="text-xs text-muted-foreground">
              <p>• Canviar de classe desactivarà la teva inscripció actual</p>
              <p>• El teu progrés es mantindrà però estarà associat a la classe anterior</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};