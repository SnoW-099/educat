import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Users, BookOpen, MessageCircle, Plus, Copy, Settings, Trash2, Eye, FileText } from "lucide-react";
import { StudentStatsCard } from "./StudentStatsCard";
import { useToast } from "@/hooks/use-toast";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { EnhancedChatInterface } from "@/components/chat/EnhancedChatInterface";
import { ProfileManagement } from "@/components/profile/ProfileManagement";
import { EssayReviewManager } from "@/components/dashboard/EssayReviewManager";
import { useProfessorData } from "@/hooks/useProfessorData";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProfessorDashboardProps {
  user: any;
}

export const ProfessorDashboard = ({ user }: ProfessorDashboardProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [newClassData, setNewClassData] = useState({
    name: '',
    description: '',
    level: 'A1',
    chat_permissions: 'all' as 'all' | 'professor_only',
    max_students: 50,
    allow_late_enrollment: true,
    allow_answer_checking: false
  });
  const { toast } = useToast();

  // Use custom hooks for data management
  const {
    classes,
    selectedClass,
    students,
    loading: dataLoading,
    error: dataError,
    selectClass,
    createClass: createNewClass,
    updateClass: updateClassSettings,
    deleteClass: deleteClassPermanently,
    removeStudent: removeStudentFromClass
  } = useProfessorData(user?.user_id);

  const { stats: platformStats, loading: statsLoading } = usePlatformStats();

  const handleCreateClass = async () => {
    if (classes.length >= 10) {
      toast({
        title: 'Límit assolit',
        description: 'Els professors només poden tenir un màxim de 10 classes actives',
        variant: 'destructive'
      });
      return;
    }

    if (!newClassData.name.trim()) {
      toast({
        title: 'Error',
        description: 'El nom de la classe és obligatori',
        variant: 'destructive'
      });
      return;
    }

    if (newClassData.name.trim().length < 2) {
      toast({
        title: 'Error',
        description: 'El nom de la classe ha de tenir mínim 2 caràcters',
        variant: 'destructive'
      });
      return;
    }

    try {
      const newClass = await createNewClass({
        ...newClassData,
        allow_all_levels: false // Default value
      });
      setIsCreateDialogOpen(false);
      setNewClassData({
        name: '',
        description: '',
        level: 'A1',
        chat_permissions: 'all',
        max_students: 50,
        allow_late_enrollment: true,
        allow_answer_checking: false
      });
      
      toast({
        title: 'Classe creada!',
        description: `S'ha creat la classe "${newClass.name}" amb codi ${newClass.code}`,
      });
    } catch (error: any) {
      if (error.message?.includes('màxim de 10 classes')) {
        toast({
          title: 'Límit assolit',
          description: 'Els professors només poden tenir un màxim de 10 classes actives',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: 'No s\'ha pogut crear la classe',
          variant: 'destructive'
        });
      }
    }
  };

  const handleUpdateClassSettings = async () => {
    if (!selectedClass) return;

    try {
      await updateClassSettings(selectedClass.id, {
        ...newClassData,
        allow_all_levels: false // Default value
      });
      setIsSettingsDialogOpen(false);
      
      toast({
        title: 'Configuració actualitzada',
        description: 'Els canvis s\'han desat correctament'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No s\'ha pogut actualitzar la configuració',
        variant: 'destructive'
      });
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!selectedClass) return;

    try {
      await removeStudentFromClass(studentId);
      toast({
        title: 'Alumne eliminat',
        description: 'L\'alumne ha estat eliminat permanentment de la classe'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No s\'ha pogut eliminar l\'alumne',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteClass = async () => {
    if (!selectedClass) return;

    try {
      await deleteClassPermanently(selectedClass.id);
      toast({
        title: 'Classe eliminada',
        description: 'La classe ha estat eliminada correctament'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No s\'ha pogut eliminar la classe',
        variant: 'destructive'
      });
    }
  };

  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Codi copiat!",
      description: `El codi ${code} s'ha copiat al portapapers`,
    });
  };

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Carregant dashboard del professor...</p>
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-destructive mb-4">{dataError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Tornar a carregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Benvingut, {user.name}!</h1>
        <p className="text-lg text-muted-foreground">
          Gestiona les teves classes i alumnes des del teu panell de professor
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Classes Actives</CardTitle>
            <BookOpen className="h-5 w-5 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Màxim: 10 classes</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Alumnes</CardTitle>
            <Users className="h-5 w-5 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {classes.reduce((sum, cls) => sum + cls.student_count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Estudiants inscrits</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Classe Seleccionada</CardTitle>
            <MessageCircle className="h-5 w-5 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">
              {selectedClass?.name || 'Cap classe seleccionada'}
            </div>
            {selectedClass && (
              <p className="text-xs text-muted-foreground">
                {selectedClass.student_count} estudiants • {selectedClass.level}
              </p>
            )}
          </CardContent>
        </Card>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Card className="glass-card cursor-pointer hover-lift transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Nova Classe</CardTitle>
                <Plus className="h-5 w-5 text-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-foreground">Crear nova classe</div>
                <p className="text-xs text-muted-foreground">Configura una nova classe</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nova classe</DialogTitle>
              <DialogDescription>
                Emplena els camps per crear una nova classe per als teus estudiants.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom de la classe</Label>
                  <Input
                    id="name"
                    value={newClassData.name}
                    onChange={(e) => setNewClassData(prev => ({...prev, name: e.target.value.slice(0, 100)}))}
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground">{newClassData.name.length}/100 caràcters</p>
                </div>
                <div>
                  <Label htmlFor="description">Descripció</Label>
                  <Input
                    id="description"
                    value={newClassData.description}
                    onChange={(e) => setNewClassData(prev => ({...prev, description: e.target.value.slice(0, 200)}))}
                    placeholder="Descripció opcional..."
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground">{newClassData.description.length}/200 caràcters</p>
                </div>
              <div>
                <Label htmlFor="level">Nivell</Label>
                <Select
                  value={newClassData.level}
                  onValueChange={(value) => setNewClassData(prev => ({...prev, level: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A1">A1</SelectItem>
                    <SelectItem value="A2">A2</SelectItem>
                    <SelectItem value="B1">B1</SelectItem>
                    <SelectItem value="B2">B2</SelectItem>
                    <SelectItem value="C1">C1</SelectItem>
                    <SelectItem value="C2">C2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="max_students">Màxim d'estudiants</Label>
                <Input
                  name="max_students"
                  type="number"
                  min="1"
                  max="50"
                  value={newClassData.max_students}
                  onChange={(e) => setNewClassData(prev => ({...prev, max_students: parseInt(e.target.value) || 50}))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow_late_enrollment"
                  checked={newClassData.allow_late_enrollment}
                  onCheckedChange={(checked) => setNewClassData(prev => ({...prev, allow_late_enrollment: checked}))}
                />
                <Label htmlFor="allow_late_enrollment">Permetre inscripcions tardanes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow_answer_checking"
                  checked={newClassData.allow_answer_checking}
                  onCheckedChange={(checked) => setNewClassData(prev => ({...prev, allow_answer_checking: checked}))}
                />
                <Label htmlFor="allow_answer_checking">Permetre veure respostes durant exercicis</Label>
              </div>
              <div>
                <Label htmlFor="chat_permissions">Permisos de xat</Label>
                <Select
                  value={newClassData.chat_permissions}
                  onValueChange={(value: 'all' | 'professor_only') => setNewClassData(prev => ({...prev, chat_permissions: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tots poden escriure</SelectItem>
                    <SelectItem value="professor_only">Només professor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleCreateClass}
                className="flex-1 bg-gradient-primary text-primary-foreground"
              >
                Crear Classe
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel·lar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="classes" className="space-y-6">
        <TabsList className="bg-gradient-surface border shadow-card">
          <TabsTrigger value="classes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Classes</TabsTrigger>
          <TabsTrigger value="students" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Alumnes</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Xat</TabsTrigger>
          <TabsTrigger value="essays" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Redaccions</TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          {classes.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Encara no tens cap classe</h3>
                <p className="text-muted-foreground text-center">
                  Crea la teva primera classe per començar a gestionar els teus estudiants
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem) => (
                <Card 
                  key={classItem.id} 
                  className={`glass-card cursor-pointer transition-all hover-lift ${
                    selectedClass?.id === classItem.id 
                      ? 'ring-2 ring-primary bg-gradient-surface' 
                      : 'hover:shadow-elevation'
                  }`}
                  onClick={() => selectClass(classItem)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <Badge variant="secondary">{classItem.level}</Badge>
                    </div>
                    <CardDescription>{classItem.description || 'Sense descripció'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Estudiants:</span>
                        <span className="font-medium">{classItem.student_count}/{classItem.max_students}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Codi:</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{classItem.code}</Badge>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              copyClassCode(classItem.code);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Dialog
                          open={isSettingsDialogOpen && selectedClass?.id === classItem.id}
                          onOpenChange={(open) => {
                            setIsSettingsDialogOpen(open);
                            if (open) {
                              selectClass(classItem);
                               setNewClassData({
                                 name: classItem.name,
                                 description: classItem.description,
                                 level: classItem.level,
                                  chat_permissions: classItem.chat_permissions,
                                  max_students: classItem.max_students,
                                  allow_late_enrollment: classItem.allow_late_enrollment,
                                  allow_answer_checking: classItem.allow_answer_checking
                               });
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()} className="w-full flex items-center justify-center">
                              <Settings className="h-4 w-4 mr-2" />
                              Configuració
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Configuració de la classe</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit_name">Nom de la classe</Label>
                                <Input
                                  id="edit_name"
                                  value={newClassData.name}
                                  onChange={(e) => setNewClassData(prev => ({...prev, name: e.target.value}))}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit_description">Descripció</Label>
                                <Input
                                  id="edit_description"
                                  value={newClassData.description}
                                  onChange={(e) => setNewClassData(prev => ({...prev, description: e.target.value}))}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit_level">Nivell</Label>
                                <Select
                                  value={newClassData.level}
                                  onValueChange={(value) => setNewClassData(prev => ({...prev, level: value}))}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="A1">A1</SelectItem>
                                    <SelectItem value="A2">A2</SelectItem>
                                    <SelectItem value="B1">B1</SelectItem>
                                    <SelectItem value="B2">B2</SelectItem>
                                    <SelectItem value="C1">C1</SelectItem>
                                    <SelectItem value="C2">C2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="edit_max_students">Màxim d'estudiants</Label>
                                <Input
                                  id="edit_max_students"
                                  type="number"
                                  min="1"
                                  max="50"
                                  value={newClassData.max_students}
                                  onChange={(e) => setNewClassData(prev => ({...prev, max_students: parseInt(e.target.value) || 50}))}
                                />
                              </div>
                               <div className="flex items-center space-x-2">
                                 <Switch
                                   id="edit_allow_late_enrollment"
                                   checked={newClassData.allow_late_enrollment}
                                   onCheckedChange={(checked) => setNewClassData(prev => ({...prev, allow_late_enrollment: checked}))}
                                 />
                                 <Label htmlFor="edit_allow_late_enrollment">Permetre inscripcions tardanes</Label>
                               </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="edit_allow_answer_checking"
                                    checked={newClassData.allow_answer_checking}
                                    onCheckedChange={(checked) => setNewClassData(prev => ({...prev, allow_answer_checking: checked}))}
                                  />
                                  <Label htmlFor="edit_allow_answer_checking">Permetre veure respostes durant exercicis</Label>
                                </div>
                              <div>
                                <Label htmlFor="edit_chat_permissions">Permisos de xat</Label>
                                <Select
                                  value={newClassData.chat_permissions}
                                  onValueChange={(value: 'all' | 'professor_only') => setNewClassData(prev => ({...prev, chat_permissions: value}))}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">Tots poden escriure</SelectItem>
                                    <SelectItem value="professor_only">Només professor</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-6">
                              <Button
                                onClick={handleUpdateClassSettings}
                                className="flex-1"
                              >
                                Desar Canvis
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Eliminar classe</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Estàs segur que vols eliminar aquesta classe? Aquesta acció no es pot desfer.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteClass}>
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          {selectedClass ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Alumnes de {selectedClass.name}</h3>
                <Badge variant="outline">
                  Codi: {selectedClass.code}
                </Badge>
              </div>
              
              {students.length === 0 ? (
                <Card className="shadow-card">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Users className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Encara no hi ha alumnes</h3>
                    <p className="text-muted-foreground text-center">
                      Comparteix el codi de classe <strong>{selectedClass.code}</strong> perquè els alumnes s'hi puguin inscriure
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {students.map((student) => (
                    <StudentStatsCard 
                      key={student.id}
                      student={student}
                      classId={selectedClass.id}
                      onRemove={handleRemoveStudent}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Selecciona una classe</h3>
                <p className="text-muted-foreground text-center">
                  Tria una classe per veure els seus alumnes
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="chat">
          <Card className="shadow-card">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Xat temporalment inactiu</h3>
              <p className="text-muted-foreground text-center">
                Estem treballant per millorar aquesta funcionalitat
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="essays" className="space-y-4">
          {selectedClass ? (
            <EssayReviewManager 
              classId={selectedClass.id}
              userRole="professor"
              userId={user.user_id}
            />
          ) : (
            <Card className="shadow-card">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                 <h3 className="text-xl font-semibold mb-2">Selecciona una classe</h3>
                 <p className="text-muted-foreground text-center">
                   Tria una classe per veure les tasques del professorat
                 </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="profile">
          <ProfileManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};