import { Github, Twitter } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-background relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">EduCat</h3>
            <p className="text-muted-foreground max-w-md mx-auto font-light">
              La plataforma més completa per aprendre català de forma efectiva i gratuïta.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-8" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EduCat. Tots els drets reservats.</p>
            <p>
              Fet per <span className="text-foreground font-medium">Steeven</span>, <span className="text-foreground font-medium">Angel</span> i <span className="text-foreground font-medium">Bryan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
