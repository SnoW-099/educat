import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsSource {
  name: string;
  url: string;
  description: string;
  category: string;
}

const NEWS_SOURCES: NewsSource[] = [
  {
    name: '3Cat',
    url: 'https://www.3cat.cat/',
    description: 'Corporació Catalana de Mitjans Audiovisuals',
    category: 'Públic'
  },
  {
    name: 'Ara',
    url: 'https://www.ara.cat/',
    description: 'Diari català d\'informació general',
    category: 'General'
  },
  {
    name: 'El Periódico de Catalunya',
    url: 'https://www.elperiodico.cat/',
    description: 'Diari d\'informació general en català',
    category: 'General'
  },
  {
    name: 'La Vanguardia',
    url: 'https://www.lavanguardia.com/',
    description: 'Diari d\'àmplia cobertura nacional i internacional',
    category: 'General'
  },
  {
    name: 'El Punt Avui',
    url: 'https://www.elpuntavui.cat/',
    description: 'Mitjà de comunicació català independent',
    category: 'General'
  },
  {
    name: 'NacióDigital',
    url: 'https://www.naciodigital.cat/',
    description: 'Diari digital català d\'actualitat',
    category: 'Digital'
  },
  {
    name: 'VilaWeb',
    url: 'https://www.vilaweb.cat/',
    description: 'Portal d\'informació en català',
    category: 'Digital'
  },
  {
    name: 'Diari de Girona',
    url: 'https://www.diaridegirona.cat/',
    description: 'Diari de la demarcació de Girona',
    category: 'Regional'
  },
  {
    name: 'Diari de Tarragona',
    url: 'https://www.diaridetarragona.com/',
    description: 'Diari de la demarcació de Tarragona',
    category: 'Regional'
  },
  {
    name: 'Segre',
    url: 'https://www.segre.com/',
    description: 'Diari de Lleida i comarques',
    category: 'Regional'
  },
  {
    name: 'Regió7',
    url: 'https://www.regio7.cat/',
    description: 'Diari de la Catalunya Central',
    category: 'Regional'
  },
  {
    name: 'Catalunya Ràdio',
    url: 'https://www.ccma.cat/catradio/',
    description: 'Emissora pública catalana',
    category: 'Ràdio'
  },
  {
    name: 'RAC1',
    url: 'https://www.rac1.cat/',
    description: 'Emissora de ràdio generalista',
    category: 'Ràdio'
  },
  {
    name: 'Sport',
    url: 'https://www.sport.es/ca/',
    description: 'Diari esportiu en català',
    category: 'Esports'
  },
  {
    name: 'Mundo Deportivo',
    url: 'https://www.mundodeportivo.com/',
    description: 'Diari esportiu generalista',
    category: 'Esports'
  },
  {
    name: 'Time Out Barcelona',
    url: 'https://www.timeout.cat/barcelona/',
    description: 'Guia de cultura i oci de Barcelona',
    category: 'Cultura'
  },
  {
    name: 'adolescents.cat',
    url: 'https://www.adolescents.cat/',
    description: 'Notícies i contingut per a joves',
    category: 'Digital'
  },
  {
    name: 'InfoK (3Cat)',
    url: 'https://www.ccma.cat/infok/',
    description: 'Informatiu infantil i juvenil de 3Cat',
    category: 'Públic'
  }
];

export const NewsList = () => {
  const groupedSources = NEWS_SOURCES.reduce((acc, source) => {
    if (!acc[source.category]) {
      acc[source.category] = [];
    }
    acc[source.category].push(source);
    return acc;
  }, {} as Record<string, NewsSource[]>);

  const categoryColors: Record<string, string> = {
    'Públic': 'from-blue-500 to-blue-600',
    'General': 'from-purple-500 to-purple-600',
    'Digital': 'from-green-500 to-green-600',
    'Regional': 'from-orange-500 to-orange-600',
    'Ràdio': 'from-pink-500 to-pink-600',
    'Esports': 'from-red-500 to-red-600',
    'Cultura': 'from-indigo-500 to-indigo-600'
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary-dark p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Notícies en Català
              </h2>
              <p className="text-white/90 text-lg">
                Fonts d'informació en català per mantenir-te actualitzat
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.keys(groupedSources).map((category) => (
              <span key={category} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                {category} ({groupedSources[category].length})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedSources).map(([category, sources], idx) => (
          <div key={category}>
            <div className="mb-4 flex items-center gap-3">
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${categoryColors[category] || 'from-primary to-primary-dark'}`}></div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {category}
              </h3>
              <span className="text-sm text-muted-foreground">({sources.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sources.map((source, sourceIdx) => (
                <Card 
                  key={source.name}
                  className="hover:shadow-xl transition-all duration-300 group border-l-4"
                  style={{ 
                    borderLeftColor: `hsl(var(--primary))`
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between group-hover:text-primary transition-colors">
                      <span className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${categoryColors[category] || 'from-primary to-primary-dark'}`}></div>
                        {source.name}
                      </span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 line-clamp-2">
                      {source.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      onClick={() => window.open(source.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visitar web
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer tip */}
      <Card className="glass-card border-dashed border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3 shrink-0">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Consell per millorar el teu català</p>
              <p className="text-sm text-muted-foreground">
                Llegir notícies en català regularment t'ajudarà a millorar 
                la comprensió lectora, ampliar el vocabulari i mantenir-te informat sobre l'actualitat.
                Dedica 10-15 minuts diaris a la lectura!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};