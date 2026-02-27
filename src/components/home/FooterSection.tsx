export const FooterSection = () => {
  return (
    <footer className="relative z-10 py-10 px-6">
      <div className="container mx-auto">
        <div className="glass-card max-w-5xl mx-auto rounded-3xl border border-primary/25 bg-card/65 backdrop-blur-2xl px-6 sm:px-10 py-10 shadow-card">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">EduCat</h3>
            <p className="text-muted-foreground max-w-md mx-auto font-light">
              La plataforma més completa per aprendre català de forma efectiva i gratuïta.
            </p>
          </div>

          <div className="w-full h-px bg-border/70 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
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
