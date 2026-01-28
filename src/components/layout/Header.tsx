"use client"

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ProfileManagement } from "@/components/profile/ProfileManagement";
import { UserProfile } from "@/hooks/useAuth";
import { LogOut, BookOpen, Home, User, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";


interface HeaderProps {
  user?: UserProfile;
  onLogout?: () => void;
  onNavigateToAuth?: () => void;
}

export const Header = ({ user, onLogout, onNavigateToAuth }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-black/40 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl shadow-black/30 border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary/90 backdrop-blur-xl rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/40 border border-primary/40">
                <BookOpen className="h-5 w-5 text-primary-foreground drop-shadow" />
              </div>

              <span className="font-bold text-xl text-foreground tracking-tight">EduCat</span>
              <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[9999] animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="p-1">
                  {/* Página Principal */}
                  <button
                    onClick={() => {
                      // Siempre ir a home
                      window.location.href = '/home';
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Pàgina Principal</div>
                      <div className="text-xs text-muted-foreground">Anar a la pàgina d'inici</div>
                    </div>
                  </button>

                  {/* Menú Estudiante */}
                  <button
                    onClick={() => {
                      window.location.href = '/studentdashboard';
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Menú Estudiant</div>
                      <div className="text-xs text-muted-foreground">Tauler d'estudiant</div>
                    </div>
                  </button>

                  {/* Ajustes de Cuenta */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Ajustes del Compte</div>
                      <div className="text-xs text-muted-foreground">Configurar perfil</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        {!user ? (
          <div className="flex items-center gap-4">
            <ModeToggle />
            {onNavigateToAuth && (
              <Button
                variant="default"
                size="default"
                onClick={onNavigateToAuth}
                className="font-semibold transition-all rounded-lg"
              >
                Inicia sessió
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="flex items-center gap-3 px-4 py-2.5 border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
              <Avatar className="h-8 w-8 ring-2 ring-white/10 rounded-full">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold rounded-full backdrop-blur-sm">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-foreground leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</p>
              </div>
            </div>


            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="h-10 w-10 rounded-xl hover:bg-white/10 hover:text-destructive transition-colors border border-transparent hover:border-white/10 backdrop-blur-sm"
                title="Tancar sessió"
              >
                <LogOut className="h-4.5 w-4.5" />
              </Button>
            )}

            {/* Profile Modal */}
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
                <ProfileManagement variant="modal" />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </header>
  );
};
