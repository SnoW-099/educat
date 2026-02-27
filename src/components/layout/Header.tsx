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
<<<<<<< HEAD
import { LogOut, BookOpen, Home, User, Settings, ChevronDown, Users, Shield } from "lucide-react";
=======
import { LogOut, BookOpen, Home, User, Settings, ChevronDown } from "lucide-react";
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
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
    <header className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl sticky top-0 z-50 shadow-lg shadow-black/5 dark:shadow-black/20">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary/90 backdrop-blur-xl rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 border border-primary/30">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>

              <span className="font-bold text-xl text-foreground tracking-tight">EduCat</span>
              <ChevronDown className={`h-3 w-3 text-foreground transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg shadow-2xl z-[9999] animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="p-1">
                  {/* Página Principal */}
                  <button
                    onClick={() => {
                      // Siempre ir a home
                      window.location.href = '/home';
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left"
                  >
                    <Home className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Pàgina Principal</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Anar a la pàgina d'inici</div>
                    </div>
                  </button>

                  {/* Menú Estudiante */}
                  <button
                    onClick={() => {
                      window.location.href = '/studentdashboard';
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left"
                  >
                    <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Menú Estudiant</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Tauler d'estudiant</div>
                    </div>
                  </button>

<<<<<<< HEAD
                  {/* Panell Admin - Solo si es admin */}
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => {
                        window.location.href = '/admin';
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-indigo-600/10 dark:hover:bg-indigo-600/20 transition-colors text-left border-l-2 border-indigo-600"
                    >
                      <Shield className="h-4 w-4 text-indigo-600" />
                      <div>
                        <div className="text-sm font-medium text-indigo-600">Panell Admin</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Verificació de professors</div>
                      </div>
                    </button>
                  )}

                  {/* Menú Professor - Solo si es profesor */}
                  {user?.role === 'professor' && (
                    <button
                      onClick={() => {
                        window.location.href = '/professordashboard';
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors text-left border-l-2 border-primary"
                    >
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-primary">Menú Professor</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Gestió de classes</div>
                      </div>
                    </button>
                  )}

=======
>>>>>>> 281e5f277d1a22fe983bb2f49ab903edb50397dc
                  {/* Ajustes de Cuenta */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left"
                  >
                    <Settings className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Ajustes del Compte</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Configurar perfil</div>
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
            <div className="flex items-center gap-3 px-4 py-2.5 border border-white/20 bg-white/10 backdrop-blur-xl rounded-lg">
              <Avatar className="h-8 w-8 ring-2 ring-white/20 rounded-full">
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
                className="h-10 w-10 rounded-lg hover:bg-white/10 hover:text-destructive transition-colors border border-transparent hover:border-white/20 backdrop-blur-sm"
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
