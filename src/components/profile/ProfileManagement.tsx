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
  UserX,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfileManagementProps {
  className?: string;
  variant?: 'default' | 'modal';
}

export const ProfileManagement = ({ className = '', variant = 'default' }: ProfileManagementProps) => {
  const { profile, user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    avatar_url: profile?.avatar_url || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Ensure local state updates when profile changes (sync fix)
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
    // ... same logic
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    return role === 'professor' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  const handleInputChange = (field: string, value: string) => {
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

      await refreshProfile(); // Refresh global state

      toast({
        title: 'Perfil actualitzat',
        description: 'Els canvis s\'han desat correctament'
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut actualitzar el perfil',
        variant: 'destructive'
      });
    }
  };

  const handleChangeEmail = async () => {
    if (!user || formData.email === profile?.email) return;

    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email
      });

      if (error) throw error;

      toast({
        title: 'Correu electrònic actualitzat',
        description: 'Revisa el teu correu per confirmar el canvi'
      });
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut canviar el correu electrònic',
        variant: 'destructive'
      });
    }
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const handleChangePassword = async () => {
    if (!formData.newPassword || formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Les contrasenyes no coincideixen',
        variant: 'destructive'
      });
      return;
    }

    const validation = validatePassword(formData.newPassword);
    if (!validation.isValid) {
      toast({
        title: 'Contrasenya no vàlida',
        description: 'La contrasenya ha de tenir almenys 8 caràcters, majúscules, minúscules, números i símbols',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;

      toast({
        title: 'Contrasenya actualitzada',
        description: 'La contrasenya s\'ha canviat correctament'
      });

      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut canviar la contrasenya',
        variant: 'destructive'
      });
    }
  };

  const handleDisableAccount = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          // We can't actually disable the account in auth, 
          // but we could add a status field to profiles
          name: `[DESACTIVAT] ${profile?.name}`
        })
        .eq('user_id', profile?.user_id);

      if (error) throw error;

      toast({
        title: 'Compte desactivat',
        description: 'El teu compte ha estat marcat com a desactivat'
      });
    } catch (error) {
      console.error('Error disabling account:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut desactivar el compte',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: 'Error',
          description: 'No hi ha una sessió activa',
          variant: 'destructive'
        });
        return;
      }

      // Call edge function to delete user
      const { error } = await supabase.functions.invoke('delete-user', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: 'Compte eliminat',
        description: 'El teu compte ha estat eliminat permanentment'
      });

      // Sign out and redirect
      await supabase.auth.signOut();
      window.location.href = '/';

    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut eliminar el compte. Contacta amb el suport.',
        variant: 'destructive'
      });
    }
  };

  if (!profile) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-slate-600 dark:text-slate-200">Carregant perfil...</p>
        </CardContent>
      </Card>
    );
  }

  const content = (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="security">Seguretat</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value.slice(0, 50))}
              disabled={!isEditing}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">{formData.name.length}/50 caràcters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_file">Pujar avatar</Label>
            <Input
              id="avatar_file"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/x-icon"
              disabled={!isEditing}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/x-icon'];
                  if (!allowedTypes.includes(file.type)) {
                    toast({
                      title: 'Format no vàlid',
                      description: 'Si us plau, puja una imatge PNG, JPG o ICO',
                      variant: 'destructive'
                    });
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    toast({
                      title: 'Fitxer massa gran',
                      description: 'La mida màxima és 5MB',
                      variant: 'destructive'
                    });
                    return;
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleInputChange('avatar_url', reader.result as string);
                    toast({
                      title: 'Imatge carregada',
                      description: 'Recorda desar els canvis'
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <p className="text-xs text-muted-foreground">Formats: PNG, JPG, ICO (màx. 5MB)</p>
          </div>

          <div className="flex space-x-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                Editar perfil
              </Button>
            ) : (
              <>
                <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Desar canvis</span>
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel·lar
                </Button>
              </>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        {/* Change Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Canviar correu electrònic</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Nou correu electrònic</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value.slice(0, 100))}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">{formData.email.length}/100 caràcters</p>
            </div>
            <Button onClick={handleChangeEmail} disabled={formData.email === profile.email}>
              Actualitzar correu
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Canviar contrasenya</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contrasenya actual</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova contrasenya</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value.slice(0, 128))}
                  maxLength={128}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {formData.newPassword && (
                <div className="text-xs space-y-1">
                  <div className={`${validatePassword(formData.newPassword).minLength ? 'text-green-600' : 'text-red-600'}`}>
                    ✓ Almenys 8 caràcters
                  </div>
                  <div className={`${validatePassword(formData.newPassword).hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
                    ✓ Majúscules (A-Z)
                  </div>
                  <div className={`${validatePassword(formData.newPassword).hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
                    ✓ Minúscules (a-z)
                  </div>
                  <div className={`${validatePassword(formData.newPassword).hasNumbers ? 'text-green-600' : 'text-red-600'}`}>
                    ✓ Números (0-9)
                  </div>
                  <div className={`${validatePassword(formData.newPassword).hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                    ✓ Símbols (!@#$%...)
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova contrasenya</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Button onClick={handleChangePassword}>
                Canviar contrasenya
              </Button>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div>
                    <h4 className="font-medium text-destructive">Eliminar compte</h4>
                    <p className="text-sm text-muted-foreground">
                      Elimina permanentment el teu compte i totes les dades associades.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex items-center space-x-2">
                        <Trash2 className="h-4 w-4" />
                        <span>Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar compte</AlertDialogTitle>
                        <AlertDialogDescription>
                          Aquesta acció eliminarà permanentment el teu compte i totes les dades associades.
                          No podràs recuperar les teves classes, exercicis o progrés. Estàs absolutament segur?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground">
                          Sí, eliminar permanentment
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );

  /* Redesigned Aesthetics */
  if (variant === 'modal') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* New Hero Header */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 border border-indigo-100 dark:border-slate-600 p-6">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Shield className="w-32 h-32 text-indigo-500 dark:text-indigo-400 transform rotate-12 translate-x-8 -translate-y-8" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <div className="relative group cursor-pointer">
              <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-slate-600 shadow-xl transition-transform group-hover:scale-105">
                <AvatarImage src={formData.avatar_url} className="object-cover" />
                <AvatarFallback className="text-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-bold">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>

              {/* Hidden File Input Trigger Overlay */}
              <label htmlFor="avatar-upload-hero" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white w-8 h-8" />
              </label>
              <input
                id="avatar-upload-hero"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => handleInputChange('avatar_url', reader.result as string);
                    reader.readAsDataURL(file);
                    setIsEditing(true); // Auto-enable editing mode visually
                  }
                }}
              />
            </div>

            <div className="text-center sm:text-left space-y-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{profile.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{profile.email}</p>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Badge className={`${getRoleColor(profile.role)} px-3 py-1 text-xs uppercase tracking-wider shadow-sm`}>
                  {profile.role === 'professor' ? 'Professor' : 'Estudiant'}
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600">
                  User ID: {profile.user_id.slice(0, 8)}...
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100/80 dark:bg-slate-700/80 rounded-xl mb-6">
            <TabsTrigger
              value="profile"
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm transition-all"
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-rose-600 dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-sm transition-all"
            >
              <Shield className="w-4 h-4 mr-2" />
              Seguretat
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-300 font-semibold">Nom Complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 dark:text-white focus:bg-white dark:focus:bg-slate-600 transition-colors h-10"
                    placeholder="El teu nom"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveProfile} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Desar Canvis
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* Email Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">Correu Electrònic</h4>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 dark:text-white"
                  />
                </div>
                <Button variant="outline" onClick={handleChangeEmail} disabled={formData.email === profile.email}>
                  Actualitzar
                </Button>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">Contrasenya</h4>

              <div className="grid gap-4 bg-slate-50 dark:bg-slate-700 p-6 rounded-xl border border-slate-100 dark:border-slate-600">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase">Contrasenya Actual</Label>
                  <Input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className="bg-white dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase">Nova Contrasenya</Label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className="bg-white dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase">Confirmar</Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-white dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleChangePassword} className="w-full mt-2 bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-900 dark:hover:bg-slate-500">
                  Canviar Contrasenya
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-6">
              <div className="rounded-xl border border-rose-100 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Zona de Perill
                    </h4>
                    <p className="text-sm text-rose-600/80 dark:text-rose-400/80 max-w-sm">
                      Eliminar el teu compte és irreversible. Es perdran totes les dades.
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="bg-rose-600 hover:bg-rose-700 text-white shadow-none">
                        Eliminar Compte
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Estàs segur?</AlertDialogTitle>
                        <AlertDialogDescription>Aquesta acció no es pot desfer.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-rose-600">Sí, eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>

          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Gestió del perfil</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};
