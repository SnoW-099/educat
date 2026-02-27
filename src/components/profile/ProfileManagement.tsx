import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  Settings,
  Fingerprint,
  Zap,
  Globe,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfileManagementProps {
  className?: string;
  variant?: 'default' | 'modal';
}

interface FormData {
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ProfileManagement = ({ className = '', variant = 'default' }: ProfileManagementProps) => {
  const { profile, user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: profile?.name || '',
    email: profile?.email || '',
    avatar_url: profile?.avatar_url || '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (profile && !isEditing) {
      setFormData(prev => ({
        ...prev,
        name: profile.name,
        email: profile.email,
        avatar_url: profile.avatar_url || ''
      }));
    }
  }, [profile, isEditing]);

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          avatar_url: formData.avatar_url
        })
        .eq('user_id', profile.user_id);

      if (error) throw error;
      await refreshProfile();
      toast({ title: 'Perfil actualitzat', description: 'Els canvis s\'han desat correctament' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({ title: 'Error', description: 'No s\'ha pogut actualitzar el perfil', variant: 'destructive' });
    }
  };

  const handleChangeEmail = async () => {
    if (!user || formData.email === profile?.email) return;
    try {
      const { error } = await supabase.auth.updateUser({ email: formData.email });
      if (error) throw error;
      toast({ title: 'Correu electrònic actualitzat', description: 'Revisa el teu correu per confirmar el canvi' });
    } catch (error) {
      console.error('Error updating email:', error);
      toast({ title: 'Error', description: 'No s\'ha pogut canviar el correu electrònic', variant: 'destructive' });
    }
  };

  const handleChangePassword = async () => {
    if (!formData.newPassword || formData.newPassword !== formData.confirmPassword) {
      toast({ title: 'Error', description: 'Les contrasenyes no coincideixen', variant: 'destructive' });
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: formData.newPassword });
      if (error) throw error;
      toast({ title: 'Contrasenya actualitzada', description: 'La contrasenya s\'ha canviat correctament' });
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      console.error('Error updating password:', error);
      toast({ title: 'Error', description: 'No s\'ha pogut canviar la contrasenya', variant: 'destructive' });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { error } = await supabase.functions.invoke('delete-user', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });
      if (error) throw error;
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({ title: 'Error', description: 'Error al eliminar el compte', variant: 'destructive' });
    }
  };

  if (!profile) return null;

  return (
    <div className={`space-y-6 ${className} animate-in fade-in duration-500 pt-12`}>
      {/* Premium Hero Header with Mesh Gradient */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-indigo-600/20 opacity-60" />
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse delay-700" />
        
        <div className="relative z-10 p-6 sm:p-8 flex flex-col items-center sm:flex-row gap-6 sm:gap-8 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-primary to-indigo-600 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative group cursor-pointer">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <AvatarImage src={formData.avatar_url} className="object-cover" />
                <AvatarFallback className="text-3xl sm:text-4xl bg-gradient-to-br from-slate-800 to-black text-white font-black">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="avatar-hero" className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-[2px]">
                <Camera className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              </label>
              <input id="avatar-hero" type="file" className="hidden" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => handleInputChange('avatar_url', reader.result as string);
                  reader.readAsDataURL(file);
                  setIsEditing(true);
                }
              }} />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Badge className="bg-primary/20 text-primary border-none text-[9px] sm:text-[10px] font-black tracking-widest px-2 sm:px-3 py-1 uppercase">
                  <Zap className="h-3 w-3 mr-1 fill-current" />
                  {profile.role}
                </Badge>
                <Badge variant="outline" className="text-slate-500 border-white/10 text-[9px] sm:text-[10px] uppercase font-bold px-2 py-1">
                  ID: {profile.user_id.slice(0, 8)}
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
                {profile.name}
              </h2>
              <p className="text-slate-400 font-medium text-sm flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Navigation - FIXED SCROLL ISSUE */}
      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-3xl mb-8 w-full sm:w-auto">
          {[
            { id: 'perfil', label: 'Perfil', icon: User },
            { id: 'seguretat', label: 'Seguretat', icon: Fingerprint },
            { id: 'preferencies', label: 'Ajustis', icon: Settings },
          ].map(tab => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] sm:text-xs uppercase tracking-tighter data-[state=active]:bg-white dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl transition-all"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden xs:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="space-y-10">
          <TabsContent value="perfil" className="m-0 space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-black text-xl tracking-tight dark:text-white uppercase">Informació Bàsica</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nom Complet</Label>
                    <div className="relative group">
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-14 pl-12 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Ex: Àngel Pérez"
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview or Extra Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-500/10 rounded-xl">
                    <Globe className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-black text-xl tracking-tight dark:text-white uppercase">Personalització</h3>
                </div>
                
                <div className="p-6 bg-slate-50 dark:bg-black/30 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-sm dark:text-white uppercase tracking-tighter">Avatar Públic</p>
                      <p className="text-xs text-slate-500">Visible a tot EduCat</p>
                    </div>
                    <Button variant="outline" className="rounded-xl border-slate-200 dark:border-white/10 h-10 font-bold px-4" onClick={() => document.getElementById('avatar-hero')?.click()}>
                      Canviar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-6 border-t border-slate-100 dark:border-white/5">
              <Button 
                onClick={handleSaveProfile} 
                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 transform hover:scale-105 active:scale-95 transition-all"
              >
                <Save className="w-5 h-5 mr-3" />
                Desar Canvis
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="seguretat" className="m-0 space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-10">
              <div className="grid lg:grid-cols-2 gap-10">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl">
                      <Mail className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="font-black text-xl tracking-tight dark:text-white uppercase">Email</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative group">
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-14 pl-12 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-emerald-500/50"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <Button variant="outline" onClick={handleChangeEmail} disabled={formData.email === profile.email} className="h-14 px-8 rounded-2xl border-emerald-500/30 text-emerald-500 font-black uppercase tracking-tighter text-xs hover:bg-emerald-500/5">
                      Actualitzar
                    </Button>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-xl">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="font-black text-xl tracking-tight dark:text-white uppercase">Contrasenya</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contrasenya Actual</Label>
                       <div className="relative group">
                         <Input type={showCurrentPassword ? 'text' : 'password'} value={formData.currentPassword} onChange={(e) => handleInputChange('currentPassword', e.target.value)} className="h-14 pl-12 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-2xl font-bold dark:text-white" />
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                         <Button type="button" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                         </Button>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nova</Label>
                       <Input type="password" value={formData.newPassword} onChange={(e) => handleInputChange('newPassword', e.target.value)} className="h-14 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-2xl font-bold dark:text-white" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirmar</Label>
                       <Input type="password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className="h-14 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-2xl font-bold dark:text-white" />
                    </div>
                  </div>
                  <Button onClick={handleChangePassword} className="w-full h-14 rounded-2xl bg-white text-black font-black uppercase tracking-tight shadow-xl hover:opacity-90">
                    Canviar Senyal
                  </Button>
                </section>
              </div>

              {/* Redesigned Danger Zone - Premium & Minimalist */}
              <div className="pt-10">
                <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-rose-500/5 border border-slate-100 dark:border-rose-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group/danger">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover/danger:scale-150 duration-700" />
                  
                  <div className="flex-1 text-center sm:text-left relative z-10">
                    <h4 className="text-lg font-black text-rose-500 uppercase tracking-tighter mb-1 sm:text-xl">Borrar Compte</h4>
                    <p className="text-xs text-slate-500 font-bold max-w-sm leading-relaxed">Aquesta acció és permanent i esborrarà tot el teu historial, notes i progressos a EduCat.</p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="h-12 px-8 rounded-xl border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white font-black uppercase tracking-tighter text-[10px] z-10 transition-all active:scale-95 shadow-sm">
                        Començar Eliminació
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[2rem] border-none bg-slate-950 text-white p-8 shadow-2xl">
                       <AlertDialogHeader className="space-y-4 text-center">
                          <div className="h-20 w-20 mx-auto bg-rose-500/10 rounded-full flex items-center justify-center ring-4 ring-rose-500/5">
                            <Shield className="w-10 h-10 text-rose-500" />
                          </div>
                          <AlertDialogTitle className="text-2xl font-black tracking-tighter uppercase sm:text-3xl">ESTÀS SEGUR?</AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-400 font-medium text-sm leading-relaxed">
                            No hi ha marxa enrere. Perdràs l'accés a tots els teus cursos i dades personalitzades d'estudiant.
                          </AlertDialogDescription>
                       </AlertDialogHeader>
                       <AlertDialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                          <AlertDialogCancel className="w-full sm:flex-1 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-black uppercase tracking-tighter text-xs hover:bg-white/10 transition-colors">CANCEL·LAR</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="w-full sm:flex-1 h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 font-black uppercase tracking-tighter text-xs transition-colors shadow-lg shadow-rose-600/20">SÍ, ESBORRAR TOT</AlertDialogAction>
                       </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferencies" className="m-0 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center bg-slate-50 dark:bg-black/20 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/5">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Properament</h3>
                  <p className="text-sm text-slate-500 font-medium">Personalització avançada i més ajustos.</p>
                </div>
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
