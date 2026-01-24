"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const CTASectionLogged = () => {
  const router = useRouter();
  const { user, profile } = useAuth();

  const benefits = [
    "Sense targeta de crèdit",
    "Accés immediat",
    "Progrés guardat"
  ];

  const handleGetStarted = () => {
    // Siempre ir al dashboard del estudiante
    if (profile?.role === 'professor') {
      router.push('/teacherdashboard');
    } else if (profile?.role === 'student') {
      router.push('/studentdashboard');
    }
  };

  return (
    <section className="py-40 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-14">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 mb-20 animate-fade-in text-slate-900">
            <div className="text-center space-y-3">
              <p className="text-5xl sm:text-6xl font-bold font-mono text-blue-600">500+</p>
              <p className="text-sm sm:text-base text-slate-500 font-medium">Exercicis</p>
            </div>
            <div className="text-center space-y-3">
              <p className="text-5xl sm:text-6xl font-bold font-mono text-indigo-600">A1-C2</p>
              <p className="text-sm sm:text-base text-slate-500 font-medium">Nivells</p>
            </div>
            <div className="text-center space-y-3">
              <p className="text-5xl sm:text-6xl font-bold font-mono text-purple-600">100%</p>
              <p className="text-sm sm:text-base text-slate-500 font-medium">Gratuït</p>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Benvingut de nou, {profile?.name || 'Estudiant'}!
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Continua el teu aprenentatge de català on ho vas deixar
            </p>
          </div>

          {/* Benefits */}
          <div className="flex items-center justify-center gap-8 flex-wrap animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2.5 text-base text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 font-bold px-12 py-8 text-lg shadow-xl shadow-green-200 rounded-xl transition-all duration-300 hover:scale-105 group"
              onClick={handleGetStarted}
            >
              Continuar aprenent
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
