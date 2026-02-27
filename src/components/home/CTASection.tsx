"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const CTASection = () => {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const hasSession = !loading && !!user && !!profile;

  const benefits = ["Sense targeta de crèdit", "Accés immediat", "Progrés guardat"];

  const handleGetStarted = () => {
    if (hasSession) {
      router.push('/studentdashboard');
    } else {
      router.push('/auth');
    }
  };

  return (
    <section className="py-40 relative overflow-hidden z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card max-w-5xl mx-auto text-center space-y-14 rounded-[2rem] border border-primary/25 bg-card/65 px-6 sm:px-10 py-12 sm:py-16 shadow-card relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 animate-fade-in text-foreground relative z-10">
            <div className="glass-card text-center space-y-2 rounded-2xl border border-border bg-background/70 py-5 px-4">
              <p className="text-4xl sm:text-5xl font-bold font-mono text-primary">500+</p>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">Exercicis</p>
            </div>
            <div className="glass-card text-center space-y-2 rounded-2xl border border-border bg-background/70 py-5 px-4">
              <p className="text-4xl sm:text-5xl font-bold font-mono text-primary/85">A1-C2</p>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">Nivells</p>
            </div>
            <div className="glass-card text-center space-y-2 rounded-2xl border border-border bg-background/70 py-5 px-4">
              <p className="text-4xl sm:text-5xl font-bold font-mono text-primary/70">100%</p>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">Gratuït</p>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up relative z-10" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight text-balance">
              {hasSession
                ? `Benvingut de nou, ${profile?.name || "Estudiant"}!`
                : "Comença la teva aventura amb el català"}
            </h2>
            <p className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light text-balance">
              {hasSession
                ? "Continua el teu aprenentatge de català on ho vas deixar"
                : "Uneix-te a estudiants que ja estan aprenent català de forma divertida i efectiva"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap animate-fade-in relative z-10" style={{ animationDelay: "0.2s" }}>
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2.5 text-base text-foreground/85">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="animate-scale-in relative z-10" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className={`${hasSession ? "bg-success hover:bg-success/90 text-success-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"} font-bold px-12 py-8 text-lg shadow-hover rounded-xl transition-all duration-300 hover:scale-105 group`}
              onClick={handleGetStarted}
            >
              {hasSession ? "Continuar aprenent" : "Començar gratis"}
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

