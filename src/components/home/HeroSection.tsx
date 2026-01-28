"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, GraduationCap, Hash, Trophy, CheckCircle2, Flame, Zap, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const HeroSection = () => {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [typewriterText, setTypewriterText] = useState("");

  // Verificar si tiene sesión
  const hasSession = !loading && !!user && !!profile;

  useEffect(() => {
    const phrases = [
      "Una experiència d'aprenentatge adaptativa.",
      "Gamificació dissenyada per a l'era digital.",
      "Gratuït per a tothom.",
      "Aprèn al teu ritme, sense pressa."
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    let timeoutId: NodeJS.Timeout;

    const runTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      const nextText = isDeleting
        ? currentPhrase.substring(0, currentCharIndex - 1)
        : currentPhrase.substring(0, currentCharIndex + 1);

      setTypewriterText(nextText);

      currentCharIndex = isDeleting ? currentCharIndex - 1 : currentCharIndex + 1;

      let typingSpeed = isDeleting ? 50 : 90;

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      timeoutId = setTimeout(runTyping, typingSpeed);
    };

    timeoutId = setTimeout(runTyping, 400);

    return () => clearTimeout(timeoutId);
  }, []);

  const features = [
    { icon: BookOpen, text: "Recursos complerts" },
    { icon: GraduationCap, text: "Per a tots els nivells" },
    { icon: Hash, text: "Exercicis pràctics" },
    { icon: Trophy, text: "Sistema de medalles" },
    { icon: CheckCircle2, text: "Seguiment del progrés" },
  ];

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-24">

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Badge - SOLID BLUE */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-primary font-semibold text-sm mb-10 animate-fade-in shadow-lg shadow-primary/20 border border-white/10 hover:scale-105 transition-transform cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          Creada per estudiants, per a estudiants
        </div>

        {/* Hero Title - UPDATED TEXT */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-8 animate-scale-in max-w-5xl leading-[1.1] drop-shadow-sm">
          Domina el Català <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-indigo-300 drop-shadow-sm">fàcilment.</span>
        </h1>

        {/* Subtitle */}
        {/* Subtitle - Typewriter Effect */}
        <div className="h-16 mb-12 flex items-center justify-center">
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
            <span className="text-foreground font-bold">{typewriterText}</span>
            <span className="animate-pulse text-primary">|</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mb-12 animate-fade-in animation-delay-400">
          <Button
            onClick={() => {
              if (hasSession) {
                router.push('/studentdashboard');
              } else {
                router.push('/auth');
              }
            }}
            size="lg"
            className={`h-14 px-10 text-lg rounded-full shadow-xl transition-all hover:scale-105 hover:-translate-y-1 font-bold ${hasSession
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30'
              }`}
          >
            {hasSession ? 'Continuar aprenent' : 'Començar Gratis'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-10 text-lg border-2 border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 bg-white/5 rounded-full transition-all font-semibold"
            onClick={() => {
              const featuresSection = document.getElementById("features");
              featuresSection?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Saber-ne més
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm text-muted-foreground">
          {features.map((feature) => (
            <div
              key={feature.text}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Floating UI Grid - REAL UI MOCKUPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-fade-in animation-delay-600 text-left">

          {/* Card 1: Exercise UI Mockup */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Exercici #42</h3>
                  <p className="text-xs text-muted-foreground">Gramàtica · Nivell A2</p>
                </div>
              </div>
              {/* Simulated Exercise content */}
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-sm font-medium text-foreground">
                  Com es diu "Hello" en català?
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border border-primary/50 bg-primary/20 text-primary rounded-lg text-xs font-bold text-center">Hola</div>
                  <div className="p-2 border border-white/10 bg-white/5 text-muted-foreground rounded-lg text-xs text-center">Adéu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Streak & Classes UI Mockup */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">

              {/* Streak Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-foreground text-lg">Ratxa</h3>
                  <p className="text-xs text-muted-foreground">Mantén el ritme!</p>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                  <Flame className="w-5 h-5 text-primary fill-primary animate-pulse" />
                  <span className="text-sm font-black text-primary">12</span>
                </div>
              </div>

              {/* Week Visual */}
              <div className="flex justify-between items-center mb-6 px-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold border border-primary/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold text-muted-foreground">
                  S
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold text-muted-foreground">
                  D
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Habilitats</div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-foreground text-sm">Gramàtica</span>
                      <span className="text-xs font-bold text-primary">94%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[94%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-foreground text-sm">Vocabulari</span>
                      <span className="text-xs font-bold text-indigo-300">88%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 w-[88%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
