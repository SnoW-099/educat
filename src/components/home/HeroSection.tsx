"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Hash,
  Trophy,
  CheckCircle2,
  Flame,
  Zap,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const HeroSection = () => {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [typewriterText, setTypewriterText] = useState("");

  const hasSession = !loading && !!user && !!profile;

  useEffect(() => {
    const phrases = [
      "Una experiència d'aprenentatge adaptativa.",
      "Gamificació dissenyada per a l'era digital.",
      "Gratuït per a tothom.",
      "Aprèn al teu ritme, sense pressa.",
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

  const chips = [
    { icon: BookOpen, text: "Recursos complets" },
    { icon: GraduationCap, text: "Per a tots els nivells" },
    { icon: Hash, text: "Exercicis pràctics" },
    { icon: Trophy, text: "Sistema de medalles" },
    { icon: CheckCircle2, text: "Seguiment del progrés" },
  ];

  return (
    <section className="relative overflow-hidden pt-24 pb-20 lg:pt-28 lg:pb-24">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="glass-card inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-foreground shadow-card">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Creada per estudiants, per a estudiants
            </div>

            <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Domina el català
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                fàcilment.
              </span>
            </h1>

            <p className="mt-6 h-8 text-lg font-medium text-muted-foreground sm:text-xl">
              <span className="font-semibold text-foreground">{typewriterText}</span>
              <span className="animate-pulse text-primary">|</span>
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                onClick={() => (hasSession ? router.push("/studentdashboard") : router.push("/auth"))}
                size="lg"
                className={`h-14 rounded-full px-10 text-lg font-bold shadow-hover transition-all hover:-translate-y-1 hover:scale-105 ${
                  hasSession
                    ? "bg-success text-success-foreground hover:bg-success/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {hasSession ? "Continuar aprenent" : "Començar gratis"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="glass-card h-14 rounded-full border border-border bg-background/70 px-10 text-lg font-semibold text-foreground"
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  featuresSection?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Saber-ne més
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
              {chips.map((chip) => (
                <div
                  key={chip.text}
                  className="glass-card flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-4 py-2"
                >
                  <chip.icon className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{chip.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="glass-card rounded-3xl border border-primary/25 bg-card/70 p-6 shadow-elevation">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Progressió setmanal</p>
                    <h3 className="text-xl font-bold text-foreground">Ratxa de 12 dies</h3>
                  </div>
                  <div className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5">
                    <Flame className="h-5 w-5 animate-pulse fill-warning text-warning" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">Gramàtica</span>
                      <span className="font-bold text-primary">94%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-primary/20">
                      <div className="h-full w-[94%] rounded-full bg-primary" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/70 p-3">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">Vocabulari</span>
                      <span className="font-bold text-primary/80">88%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
                      <div className="h-full w-[88%] rounded-full bg-primary/80" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card absolute -bottom-6 -left-6 hidden rounded-2xl border border-primary/25 bg-card/70 p-4 shadow-card md:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2 text-primary">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Exercici actiu</p>
                    <p className="text-sm font-bold text-foreground">#42 · Nivell A2</p>
                  </div>
                </div>
              </div>

              <div className="glass-card absolute -right-5 -top-5 hidden rounded-2xl border border-primary/25 bg-card/70 p-3 shadow-card md:block">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  XP +120
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
