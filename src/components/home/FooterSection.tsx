import { Github, Twitter } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">EduCat</h3>
            <p className="text-slate-500 max-w-md mx-auto font-light">
              La plataforma més completa per aprendre català de forma efectiva i gratuïta.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center mb-12">
            <a href="/auth" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">
              Iniciar sessió
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-200 mb-8" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} EduCat. Tots els drets reservats.</p>
            <p>
              Creat per <span className="text-slate-600 font-medium">Neevets</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};