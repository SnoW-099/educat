import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Zap, Star, PenTool } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Exercicis variats",
      description:
        "Dictats, ortografia, redaccions, comprensió oral i escrita. Tot adaptat al teu nivell des d'A1 fins C2.",
    },
    {
      icon: PenTool,
      title: "Ortografia guiada",
      description:
        "Treballa vocals àtones, accentuació i dièresi amb pràctica progressiva i exemples reals.",
    },
    {
      icon: Zap,
      title: "Anàlisi intel·ligent",
      description:
        "Detecta àrees fortes i febles automàticament per personalitzar el teu entrenament.",
    },
    {
      icon: Trophy,
      title: "Seguiment complet",
      description:
        "Visualitza puntuacions, evolució i objectius amb mètriques clares i motivadores.",
    },
    {
      icon: Star,
      title: "100% gratuït",
      description:
        "Desenvolupat per estudiants, per a estudiants, amb accés complet sense cost.",
    },
  ];

  return (
    <section id="features" className="relative z-10 scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="glass-card inline-block rounded-full border border-primary/20 bg-background/70 px-5 py-2 text-sm font-semibold text-foreground">
            Funcionalitats Clau
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Tot el que necessites per dominar el català
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Una experiència compacta, visual i centrada en progrés real.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`glass-card group relative overflow-hidden rounded-3xl border border-primary/20 bg-background/45 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/16 via-primary/4 to-transparent" />

              <CardHeader className="relative z-10 pb-3">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
