import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Clock, CheckCircle, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EssayReview {
  id: string;
  essay_text: string;
  professor_feedback?: string;
  score?: number;
  status: 'pending' | 'reviewed';
  created_at: string;
  reviewed_at?: string;
  student_id: string;
  profiles?: {
    name: string;
    email: string;
  };
}

interface EssayReviewManagerProps {
  classId: string;
  userRole: 'professor' | 'student';
  userId: string;
}

export const EssayReviewManager = ({ classId, userRole, userId }: EssayReviewManagerProps) => {
  const [reviews, setReviews] = useState<EssayReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<EssayReview | null>(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState<number>(0);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEssayReviews();
  }, [classId, userRole, userId]);

  const fetchEssayReviews = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('essay_reviews')
        .select(`
          *,
          profiles!essay_reviews_student_id_fkey(
            name,
            email
          )
        `)
        .eq('class_id', classId);

      // Filter based on user role
      if (userRole === 'student') {
        query = query.eq('student_id', userId);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data?.map(item => ({
        ...item,
        status: item.status as 'pending' | 'reviewed',
        professor_feedback: item.professor_feedback || undefined,
        score: item.score ?? undefined,
        reviewed_at: item.reviewed_at || undefined,
        profiles: item.profiles ? {
          name: (item.profiles as any)?.name || '',
          email: (item.profiles as any)?.email || ''
        } : undefined
      })) || []);
    } catch (error) {
      console.error('Error fetching essay reviews:', error);
      toast({
        title: 'Error',
        description: 'No s\'han pogut carregar les redaccions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewEssay = async () => {
    if (!selectedReview) return;

    try {
      const { error } = await supabase
        .from('essay_reviews')
        .update({
          professor_feedback: feedback,
          score: score,
          status: 'reviewed',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', selectedReview.id);

      if (error) throw error;

      toast({
        title: 'Redacció corregida!',
        description: 'La correcció s\'ha desat correctament'
      });

      setIsReviewDialogOpen(false);
      setFeedback('');
      setScore(0);
      setSelectedReview(null);
      fetchEssayReviews();
    } catch (error) {
      console.error('Error reviewing essay:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut desar la correcció',
        variant: 'destructive'
      });
    }
  };

  const openReviewDialog = (review: EssayReview) => {
    setSelectedReview(review);
    setFeedback(review.professor_feedback || '');
    setScore(review.score || 0);
    setIsReviewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'reviewed':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-2xl font-bold text-foreground mb-2">Carregant...</div>
          <p className="text-muted-foreground">S'estan carregant les redaccions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">
            {userRole === 'professor' ? 'Redaccions per corregir' : 'Correccions del professor@'}
          </h3>
          <p className="text-muted-foreground">
            {userRole === 'professor'
              ? `${pendingCount} redaccions pendents de correcció`
              : 'Redaccions enviades i corregides'
            }
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  {userRole === 'professor'
                    ? 'No hi ha redaccions pendents de correcció'
                    : 'No has enviat cap redacció encara'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {userRole === 'professor' ? review.profiles?.name : 'Redacció'}
                    </CardTitle>
                    <CardDescription>
                      Enviat el {new Date(review.created_at).toLocaleDateString('ca-ES')}
                      {review.reviewed_at && (
                        <span> • Corregit el {new Date(review.reviewed_at).toLocaleDateString('ca-ES')}</span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(review.status)}>
                      {review.status === 'pending' ? (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Pendent
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Corregit
                        </>
                      )}
                    </Badge>
                    {review.score !== null && review.score !== undefined && (
                      <Badge variant="outline">
                        {review.score}/100 punts
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Redacció:</Label>
                    <p className="text-sm bg-muted p-3 rounded-lg mt-1 line-clamp-3">
                      {review.essay_text}
                    </p>
                  </div>

                  {review.professor_feedback && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Feedback del professor:</Label>
                      <p className="text-sm bg-accent/10 p-3 rounded-lg mt-1">
                        {review.professor_feedback}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    {userRole === 'professor' ? (
                      <Button
                        variant={review.status === 'pending' ? 'default' : 'outline'}
                        onClick={() => openReviewDialog(review)}
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {review.status === 'pending' ? 'Corregir' : 'Veure correcció'}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => openReviewDialog(review)}
                        size="sm"
                        disabled={review.status === 'pending'}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Veure detalls
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {userRole === 'professor' ? 'Corregir redacció' : 'Detalls de la redacció'}
            </DialogTitle>
            <DialogDescription>
              {selectedReview?.profiles?.name && userRole === 'professor' && (
                <>Redacció de {selectedReview.profiles.name}</>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Redacció de l'alumne:</Label>
                <div className="bg-muted p-4 rounded-lg mt-2">
                  <p className="whitespace-pre-wrap">{selectedReview.essay_text}</p>
                </div>
              </div>

              {userRole === 'professor' ? (
                <>
                  <div>
                    <Label htmlFor="score" className="text-sm font-medium">Puntuació (0-100):</Label>
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      max="100"
                      value={score}
                      onChange={(e) => setScore(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="feedback" className="text-sm font-medium">Feedback:</Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Escriu aquí els teus comentaris sobre la redacció..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsReviewDialogOpen(false)}
                    >
                      Cancel·lar
                    </Button>
                    <Button onClick={handleReviewEssay}>
                      {selectedReview.status === 'pending' ? 'Desar correcció' : 'Actualitzar correcció'}
                    </Button>
                  </div>
                </>
              ) : selectedReview.professor_feedback ? (
                <div>
                  <Label className="text-sm font-medium">Feedback del professor:</Label>
                  <div className="bg-accent/10 p-4 rounded-lg mt-2">
                    <p className="whitespace-pre-wrap">{selectedReview.professor_feedback}</p>
                  </div>
                  {selectedReview.score !== null && selectedReview.score !== undefined && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        Puntuació: {selectedReview.score}/100
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Aquesta redacció encara no ha estat corregida pel professor</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};