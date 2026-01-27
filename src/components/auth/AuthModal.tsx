import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { validatePassword, validateEmail, validateName } from "@/utils/validation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    if (!isLogin) {
      const validation = validatePassword(password);
      setPasswordErrors(validation.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      Object.keys(localStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
    }
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Error",
        description: "El format del correu electrònic no és vàlid",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin) {
      if (!validateName(formData.name)) {
        toast({
          title: "Error",
          description: "El nom ha de tenir entre 2 i 50 caràcters",
          variant: "destructive"
        });
        return;
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        toast({
          title: "Contrasenya no vàlida",
          description: passwordValidation.errors[0],
          variant: "destructive"
        });
        return;
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: 'https://edu-cat.vercel.app/',
            data: {
              name: formData.name,
              role: 'student'
            }
          }
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Error",
              description: "Ja existeix un usuari amb aquest correu electrònic",
              variant: "destructive"
            });
          } else {
            throw error;
          }
          return;
        }

        if (data.user) {
          toast({
            title: "Registre exitós!",
            description: "El teu compte s'ha creat correctament",
          });

          window.location.href = '/';
          return;
        }
      } catch (error: any) {
        console.error('Error during signup:', error);
        toast({
          title: "Error",
          description: error.message || "No s'ha pogut crear el compte",
          variant: "destructive"
        });
        return;
      }
    } else {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Error",
              description: "Credencials incorrectes",
              variant: "destructive"
            });
          } else {
            throw error;
          }
          return;
        }

        if (data.user) {
          toast({
            title: "Benvingut de nou!",
            description: "Has entrat correctament",
          });

          window.location.href = '/';
          return;
        }
      } catch (error: any) {
        console.error('Error during login:', error);
        toast({
          title: "Error",
          description: error.message || "No s'ha pogut iniciar sessió",
          variant: "destructive"
        });
        return;
      }
    }

    onClose();
    
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setPasswordErrors([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {isLogin ? 'Inicia sessió' : 'Registra\'t'} a EduCat
          </DialogTitle>
        </DialogHeader>

        <Tabs value={isLogin ? 'login' : 'register'} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
              Iniciar sessió
            </TabsTrigger>
            <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
              Registrar-se
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correu electrònic</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contrasenya</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {!isLogin && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    La contrasenya ha de contenir:
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className={`${formData.password.length >= 8 ? 'text-success' : 'text-muted-foreground'}`}>
                      ✓ Mínim 8 caràcters
                    </li>
                    <li className={`${/[A-Z]/.test(formData.password) ? 'text-success' : 'text-muted-foreground'}`}>
                      ✓ Una majúscula
                    </li>
                    <li className={`${/[0-9]/.test(formData.password) ? 'text-success' : 'text-muted-foreground'}`}>
                      ✓ Un número
                    </li>
                    <li className={`${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-success' : 'text-muted-foreground'}`}>
                      ✓ Un símbol especial
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? 'Iniciar sessió' : 'Registrar-se'}
            </Button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
