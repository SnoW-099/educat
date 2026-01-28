import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Trophy, Zap, Star, PenTool } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Exercicis Variats",
      description: "Dictats, ortografia, redaccions, comprensió oral i escrita. Tot adaptat al teu nivell des d'A1 fins C2."
    },
    {
      icon: PenTool,
      title: "Exercicis d'Ortografia",
      description: "Exercicis específics amb vocals àtones A/E i O/U, accentuació i dièresi. Practica amb exemples reals."
    },
    {
      icon: Users,
      title: "Classes Virtuals",
      description: "Uneix-te a classes amb professors i altres alumnes. Xat integrat i seguiment del progrés en temps real."
    },
    {
      icon: Zap,
      title: "Anàlisi Intel·ligent",
      description: "El sistema analitza el teu rendiment i detecta les teves àrees fortes i febles amb recomanacions personalitzades."
    },
    {
      icon: Trophy,
      title: "Seguiment Complet",
      description: "Visualitza el teu progrés, puntuacions i àrees de millora amb estadístiques detallades i motivadores."
    },
    {
      icon: Star,
      title: "100% Gratuït",
      description: "Desenvolupat per estudiants, per a estudiants. Accés complet a totes les funcionalitats sense cost."
    }
  ];

  return (
    <section id="features" className="py-24 container mx-auto px-6 relative z-10 scroll-mt-24">
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-white/10 text-primary text-sm font-semibold mb-6 rounded-full shadow-lg shadow-primary/20 border border-white/10">
          Funcionalitats Clau
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight leading-10">
          Tot el que necessites <br />per ser un expert en català
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
          Una plataforma dissenyada per maximitzar el teu potencial educatiu.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="block group">
            <Card className="h-full border border-white/10 bg-white/5 shadow-lg shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/40 rounded-3xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-primary/15 border border-primary/20 rounded-2xl transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:rotate-6">
                    <feature.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base text-muted-foreground leading-relaxed font-normal group-hover:text-foreground/80">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
