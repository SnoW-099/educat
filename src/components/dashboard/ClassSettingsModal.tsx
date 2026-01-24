import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Eye, EyeOff } from 'lucide-react';

interface ClassSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: {
    id: string;
    name: string;
    allow_answer_checking: boolean;
  };
  onSettingsUpdate: () => void;
}

export const ClassSettingsModal = ({ 
  isOpen, 
  onClose, 
  classData, 
  onSettingsUpdate 
}: ClassSettingsModalProps) => {
  const [allowAnswerChecking, setAllowAnswerChecking] = useState(classData.allow_answer_checking);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('classes')
        .update({
          allow_answer_checking: allowAnswerChecking
        })
        .eq('id', classData.id);

      if (error) throw error;

      toast({
        title: "Configuració actualitzada",
        description: "Els canvis s'han desat correctament",
      });

      onSettingsUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating class settings:', error);
      toast({
        title: "Error",
        description: "No s'han pogut desar els canvis",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuració de la Classe: {classData.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5" />
                Control de Respostes
              </CardTitle>
              <CardDescription>
                Controla si els estudiants poden veure les respostes correctes durant els exercicis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="answer-checking" className="text-base font-medium">
                    Permetre visualització de respostes
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {allowAnswerChecking 
                      ? "Els estudiants poden veure les respostes correctes mentre fan els exercicis"
                      : "Els estudiants NO poden veure les respostes fins completar l'exercici"
                    }
                  </p>
                </div>
                <Switch
                  id="answer-checking"
                  checked={allowAnswerChecking}
                  onCheckedChange={setAllowAnswerChecking}
                />
              </div>

              {!allowAnswerChecking && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-800">
                    <EyeOff className="h-4 w-4" />
                    <span className="text-sm font-medium">Mode Examen Activat</span>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">
                    Els estudiants hauran de confiar en els seus coneixements sense poder comprovar les respostes fins al final.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancel·lar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Desant..." : "Desar Canvis"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};