import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FileText, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EssaySubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseId: string;
  exerciseTitle: string;
  classId: string;
  studentId: string;
  professorId: string;
  onSubmissionComplete: () => void;
}

export const EssaySubmissionDialog = ({
  open,
  onOpenChange,
  exerciseId,
  exerciseTitle,
  classId,
  studentId,
  professorId,
  onSubmissionComplete
}: EssaySubmissionDialogProps) => {
  const [essayText, setEssayText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!essayText.trim()) {
      toast({
        title: 'Error',
        description: 'Has d\'escriure alguna cosa abans d\'enviar',
        variant: 'destructive'
      });
      return;
    }

    if (essayText.length < 50) {
      toast({
        title: 'Redacció massa curta',
        description: 'La redacció ha de tenir almenys 50 caràcters',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First create an exercise attempt with a temporary score
      const { data: attemptData, error: attemptError } = await supabase
        .from('exercise_attempts')
        .insert({
          exercise_id: exerciseId,
          student_id: studentId,
          answers: { essay: essayText },
          score: 0, // Temporary score until reviewed
          time_taken: null,
          cheating_detected: false
        })
        .select()
        .single();

      if (attemptError) throw attemptError;

      // Then create an essay review record
      const { error: reviewError } = await supabase
        .from('essay_reviews')
        .insert({
          exercise_attempt_id: attemptData.id,
          student_id: studentId,
          professor_id: professorId,
          class_id: classId,
          essay_text: essayText,
          status: 'pending'
        });

      if (reviewError) throw reviewError;

      toast({
        title: 'Redacció enviada!',
        description: 'La teva redacció ha estat enviada per a correcció'
      });

      setEssayText('');
      onOpenChange(false);
      onSubmissionComplete();
    } catch (error) {
      console.error('Error submitting essay:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut enviar la redacció',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Escriure redacció
          </DialogTitle>
          <DialogDescription>
            {exerciseTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="essay-text" className="text-sm font-medium">
              Escriu la teva redacció:
            </Label>
            <Textarea
              id="essay-text"
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Comença a escriure aquí..."
              className="mt-2 min-h-[300px] resize-none"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {essayText.length} caràcters (mínim 50)
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel·lar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || essayText.length < 50}
            >
              {isSubmitting ? (
                'Enviant...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar redacció
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};