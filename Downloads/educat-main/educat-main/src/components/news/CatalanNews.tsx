import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Newspaper, ExternalLink, Clock, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  urlToImage?: string;
}

export const CatalanNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast } = useToast();

  // Remove emojis from text to keep news clean
  const stripEmojis = (text: string) => text.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '');

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using NewsAPI with Catalan news sources
      // For production, you should store the API key in Supabase secrets
      const sources = ['3cat', 'ara', 'elperiodico', 'lavanguardia'];
      
      // Simulated news data - In production, replace with actual API call
      // const response = await fetch(`https://newsapi.org/v2/top-headlines?country=es&language=ca&apiKey=YOUR_API_KEY`);
      
      // Mock data for demonstration - In production, use real APIs
      const mockNews: NewsArticle[] = [
        {
          title: "Catalunya impulsa un nou pla d'energies renovables",
          description: "El govern català ha aprovat una inversió de 500 milions d'euros per fomentar l'energia solar i eòlica a tot el territori.",
          url: "https://www.ara.cat/economia/energia-renovable",
          publishedAt: new Date().toISOString(),
          source: "Ara",
          urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop"
        },
        {
          title: "El Barça torna a guanyar a la Champions",
          description: "El FC Barcelona aconsegueix una victòria important davant el seu rival europeu amb un marcador de 3-1.",
          url: "https://www.sport.es/ca/barca",
          publishedAt: new Date(Date.now() - 1800000).toISOString(),
          source: "Sport",
          urlToImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop"
        },
        {
          title: "Nova reforma educativa: Més hores de català a les escoles",
          description: "El Parlament de Catalunya ha aprovat una nova llei que incrementa les hores lectives de llengua catalana en un 20%.",
          url: "https://www.ara.cat/educacio",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: "Ara",
          urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop"
        },
        {
          title: "Descobriment arqueològic a Empúries",
          description: "Un equip d'arqueòlegs ha trobat restes d'una vil·la romana del segle II amb mosaics ben conservats.",
          url: "https://www.3cat.cat/cultura/arqueologia",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: "3Cat",
          urlToImage: "https://images.unsplash.com/photo-1587634863533-1afca28f2b70?w=800&auto=format&fit=crop"
        },
        {
          title: "El MWC Barcelona bat rècords d'assistència",
          description: "El Mobile World Congress supera les 100.000 persones assistents, consolidant Barcelona com a capital tecnològica europea.",
          url: "https://www.lavanguardia.com/tecnologia/mwc",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          source: "La Vanguardia",
          urlToImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
        },
        {
          title: "Festival Grec: Programació excepcional aquest estiu",
          description: "El prestigiós festival de teatre i dansa anuncia més de 50 espectacles amb artistes internacionals.",
          url: "https://www.timeout.cat/barcelona/teatre/festival-grec",
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          source: "TimeOut",
          urlToImage: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&auto=format&fit=crop"
        },
        {
          title: "Nous mesures per millorar el transport públic",
          description: "TMB inverteix 200 milions en renovar la flota d'autobusos i ampliar la xarxa de metro amb dues noves estacions.",
          url: "https://www.elperiodico.cat/barcelona/transport",
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          source: "El Periódico",
          urlToImage: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800&auto=format&fit=crop"
        },
        {
          title: "La Sagrada Família completa una nova torre",
          description: "L'emblemàtica basílica acaba la torre de la Verge Maria, penúltima de les 18 torres previstes per Gaudí.",
          url: "https://www.ara.cat/cultura/sagrada-familia",
          publishedAt: new Date(Date.now() - 21600000).toISOString(),
          source: "Ara",
          urlToImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop"
        },
        {
          title: "Record de turistes a la Costa Brava",
          description: "Les localitats de la Costa Brava superen els 5 milions de visitants aquest any, amb un creixement del 15%.",
          url: "https://www.3cat.cat/economia/turisme",
          publishedAt: new Date(Date.now() - 25200000).toISOString(),
          source: "3Cat",
          urlToImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop"
        },
        {
          title: "Girona guanya la Copa del Rei de bàsquet",
          description: "El Bàsquet Girona fa història i aconsegueix el seu primer títol de Copa en una final emocionant.",
          url: "https://www.sport.es/ca/basquet",
          publishedAt: new Date(Date.now() - 28800000).toISOString(),
          source: "Sport",
          urlToImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop"
        },
        {
          title: "Catalunya lidera la producció de vi ecològic",
          description: "Les vinyes catalanes representen el 40% de la producció espanyola de vi ecològic, amb denominacions d'origen reconegudes.",
          url: "https://www.lavanguardia.com/gastronomia",
          publishedAt: new Date(Date.now() - 32400000).toISOString(),
          source: "La Vanguardia",
          urlToImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop"
        },
        {
          title: "Premis Gaudí: Nit de cinema català",
          description: "La gala dels Premis Gaudí reconeix el millor del cinema català amb més de 20 categories.",
          url: "https://www.ara.cat/cultura/cinema",
          publishedAt: new Date(Date.now() - 36000000).toISOString(),
          source: "Ara",
          urlToImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop"
        }
      ];

      setNews(mockNews);
      setLastUpdate(new Date());
      
      toast({
        title: "Notícies actualitzades",
        description: "Les últimes notícies en català han estat carregades.",
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "No s'han pogut carregar les notícies. Torna-ho a provar.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      fetchNews();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 60) {
      return `Fa ${diffInMinutes} minuts`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Fa ${hours} ${hours === 1 ? 'hora' : 'hores'}`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Fa ${days} ${days === 1 ? 'dia' : 'dies'}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Newspaper className="h-8 w-8" />
            Notícies en Català
          </h2>
          <p className="text-muted-foreground mt-2">
            Les últimes notícies d'actualitat en català
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Última actualització: {lastUpdate.toLocaleTimeString('ca-ES')}
          </div>
          <Button
            onClick={fetchNews}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualitzar
          </Button>
        </div>
      </div>

      {loading && news.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all cursor-pointer overflow-hidden"
              onClick={() => window.open(article.url, '_blank')}
            >
              {article.urlToImage && (
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {article.source}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug line-clamp-2">
                    {stripEmojis(article.title)}
                  </CardTitle>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {stripEmojis(article.description || '')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Nota:</strong> Les notícies s'actualitzen automàticament cada 30 minuts. 
            Pots clicar qualsevol notícia per llegir-la completa a la seva font original.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
