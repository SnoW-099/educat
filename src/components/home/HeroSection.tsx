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
  const fullText = "Aprèn català de debò";
  
  // Verificar si tiene sesión
  const hasSession = !loading && !!user && !!profile;
  
  console.log('HeroSection - Estado:', { hasSession, loading, userName: profile?.name });

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
    let typingSpeed = 100;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setTypewriterText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypewriterText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of phrase
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }
    };

    const timer = setTimeout(type, typingSpeed);

    // Recursive timeout to handle variable speeds
    const loop = () => {
      type();
      setTimeout(loop, typingSpeed);
    };

    // We need a ref or a slightly different approach for the variable speed loop in a simple useEffect
    // A robust way simply uses a timeout that sets another timeout
    let timeoutId: NodeJS.Timeout;

    const runTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setTypewriterText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypewriterText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Wait before deleting
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Wait before typing next
      }

      timeoutId = setTimeout(runTyping, typingSpeed);
    };

    timeoutId = setTimeout(runTyping, 500);

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
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-20">

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Badge - SOLID BLUE */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white font-bold text-sm mb-10 animate-fade-in shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          La nova manera d'aprendre
        </div>

        {/* Hero Title - UPDATED TEXT */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-8 animate-scale-in max-w-5xl leading-[1.1] drop-shadow-sm">
          Domina el Català <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 drop-shadow-sm">fàcilment.</span>
        </h1>

        {/* Subtitle */}
        {/* Subtitle - Typewriter Effect */}
        <div className="h-16 mb-12 flex items-center justify-center">
          <p className="text-xl sm:text-2xl text-slate-600 font-medium">
            <span className="text-slate-900 font-bold">{typewriterText}</span>
            <span className="animate-pulse text-blue-600">|</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mb-24 animate-fade-in animation-delay-400">
          <Button
            onClick={() => {
              console.log('HeroSection - Botón clickeado, hasSession:', hasSession);
              if (hasSession) {
                if (profile?.role === 'professor') {
                  window.location.href = '/teacherdashboard';
                } else if (profile?.role === 'student') {
                  window.location.href = '/studentdashboard';
                }
              } else {
                router.push('/auth');
              }
            }}
            size="lg"
            className={`h-14 px-10 text-lg rounded-full shadow-xl transition-all hover:scale-105 hover:-translate-y-1 font-bold ${
              hasSession 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/30' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
            }`}
          >
            {hasSession ? 'Continuar aprenent' : 'Començar Gratis'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-10 text-lg border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 bg-white/50 backdrop-blur-sm rounded-full transition-all font-semibold"
          >
            Saber-ne més
          </Button>
        </div>

        {/* Floating UI Grid - REAL UI MOCKUPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-fade-in animation-delay-600 text-left">

          {/* Card 1: Exercise UI Mockup */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 transition-all overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Exercici #42</h3>
                  <p className="text-xs text-slate-500">Gramàtica · Nivell A2</p>
                </div>
              </div>
              {/* Simulated Exercise content */}
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">
                  Com es diu "Hello" en català?
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold text-center">Hola</div>
                  <div className="p-2 border border-slate-100 bg-white text-slate-500 rounded-lg text-xs text-center">Adéu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Streak & Classes UI Mockup */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 transition-all overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">

              {/* Streak Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Racha</h3>
                  <p className="text-xs text-slate-500">Mantén el ritme!</p>
                </div>
                <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                  <span className="text-sm font-black text-orange-600">12</span>
                </div>
              </div>

              {/* Week Visual */}
              <div className="flex justify-between items-center mb-6 px-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold border border-orange-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                  S
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                  D
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Habilitats</div>

                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">Gramàtica</span>
                      <span className="text-xs font-bold text-blue-600">94%</span>
                    </div>
                    <div className="h-1.5 w-full bg-blue-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[94%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">Vocabulari</span>
                      <span className="text-xs font-bold text-indigo-500">88%</span>
                    </div>
                    <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[88%] rounded-full"></div>
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