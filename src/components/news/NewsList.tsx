
import { Newspaper, ExternalLink, Radio, Globe, Map, Trophy, Music, Building, ArrowUpRight, Landmark, MonitorSmartphone, MapPin, Dumbbell, Palette } from 'lucide-react';
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

  const categoryIcons: Record<string, any> = {
    'Públic': Landmark,
    'General': Newspaper,
    'Digital': MonitorSmartphone,
    'Regional': MapPin,
    'Ràdio': Radio,
    'Esports': Trophy,
    'Cultura': Palette
  };

  const categoryColors: Record<string, string> = {
    'Públic': 'bg-blue-600 text-white',
    'General': 'bg-slate-700 text-white',
    'Digital': 'bg-sky-600 text-white',
    'Regional': 'bg-amber-600 text-white',
    'Ràdio': 'bg-red-600 text-white',
    'Esports': 'bg-emerald-600 text-white',
    'Cultura': 'bg-blue-500 text-white'
  };

  return (
    <div className="space-y-8">
      {/* Minimalist Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-xl isolate">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none"></div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            <Newspaper className="h-7 w-7 text-blue-400" />
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              Premsa en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Català</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              Descobreix una selecció curada de diaris, ràdios i mitjans digitals per estar sempre informat.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12 stagger-build">
        {Object.entries(groupedSources).map(([category, sources], idx) => {
          const Icon = categoryIcons[category] || Newspaper;
          
          return (
            <div key={category} className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl ${categoryColors[category] || 'bg-slate-700 text-white'} shadow-md flex items-center justify-center`}>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                  {category}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 stagger-build">
                {sources.map((source, sourceIdx) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col h-full bg-white dark:bg-slate-900/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800/60 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden isolate focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-sky-500/0 group-hover:from-blue-500/5 group-hover:to-sky-500/5 transition-colors duration-500 -z-10"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-lg font-black bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent uppercase">
                          {source.name.charAt(0)}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {source.name}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {source.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer tip */}
      <div className="bg-transparent dark:bg-transparent border-dashed border-2 border-blue-200 dark:border-blue-500/30 rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-500/10 dark:bg-blue-500/20 p-3 shrink-0">
              <Newspaper className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Consell per millorar el teu català</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Llegir notícies en català regularment t'ajudarà a millorar
                la comprensió lectora, ampliar el vocabulari i mantenir-te informat sobre l'actualitat.
                Dedica 10-15 minuts diaris a la lectura!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};