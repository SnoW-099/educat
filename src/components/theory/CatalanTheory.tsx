import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Check, X, GraduationCap, Library, Sparkles, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const CatalanTheory = () => {
  return (
    <div className="space-y-6 stagger-build">
      {/* Minimalist Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-xl isolate mb-8">
        {/* Glow Effects - More Blue, Less Purple */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none"></div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            <BookOpen className="h-7 w-7 text-blue-400" />
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              Teoria de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Català</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              Descobreix, repassa i domina les regles fonamentals de la llengua catalana de manera clara i visual.
            </p>
          </div>
        </div>
      </div>

      <div className="px-1 sm:px-4">
        <Accordion type="single" collapsible className="w-full space-y-4 stagger-build">
            {/* Regles d'accentuació */}
            <AccordionItem value="accentuacio">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Regles d'Accentuació
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <div className="flex items-start gap-3 mb-3">
                      <div className="rounded-full bg-blue-500/10 p-2 shrink-0">
                        <Check className="h-4 w-4 text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-foreground text-lg">I. Mots aguts</h4>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      S'accentuen els mots aguts que acaben en alguna de les dotze terminacions:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-6">
                      <li><strong>a, as</strong></li>
                      <li><strong>e, es, en</strong></li>
                      <li><strong>i, is, in</strong> (posat que la i NO sigui la segona vocal d'un diftong decreixent)</li>
                      <li><strong>o, os</strong></li>
                      <li><strong>u, us</strong> (posat que la u NO sigui la segona vocal d'un diftong decreixent)</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-500/30">
                      <p className="text-sm italic text-foreground">
                        Exemples: demà, matalàs; mercè, francès, comprèn; camí, vernís, esplín; carbó, saborós; oportú, abús.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <div className="flex items-start gap-3 mb-3">
                      <div className="rounded-full bg-blue-500/10 p-2 shrink-0">
                        <Check className="h-4 w-4 text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-foreground text-lg">II. Mots plans</h4>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      S'accentuen els mots plans que no acaben en cap de les dites terminacions.
                    </p>
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-500/30">
                      <p className="text-sm italic text-foreground">
                        Exemples: àrab, rònec, àcid, pròleg, dèbil, àtom, cànem, diàfan, príncep, herbívor, inèdit, antídot, apèndix, anàveu, diguéssiu, tròlei.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <div className="flex items-start gap-3 mb-3">
                      <div className="rounded-full bg-blue-500/10 p-2 shrink-0">
                        <Check className="h-4 w-4 text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-foreground text-lg">III. Mots esdrúixols</h4>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      S'accentuen tots els mots esdrúixols.
                    </p>
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-500/30">
                      <p className="text-sm italic text-foreground">
                        Exemples: ànima, època, mètode, física, màxima, brúixola, àrea; història, dèria, sèrie, ciència, gràcia, pèrdua, àrdua, perpètua, conspícua.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Accentuació de la E i la O</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Per saber com hem d'accentuar una e o una o hem de tindre en compte la pronunciació.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                      <div className="pb-3 border-b border-slate-200 dark:border-slate-700/50 mb-3">
                        <h5 className="font-semibold text-foreground text-base">Accentuació de la E</h5>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm mb-1 text-slate-800 dark:text-slate-200">Accent obert (è)</p>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4 list-disc">
                            <li><strong>Aguts:</strong> cafè, ofès, aprèn, sorprèn</li>
                            <li><strong>Plans:</strong> cèntim, dèbil, cèrcol, pèsol</li>
                            <li><strong>Esdrúixols:</strong> comèdia, ètica, matèria</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1 text-slate-800 dark:text-slate-200">Accent tancat (é)</p>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4 list-disc">
                            <li><strong>Aguts:</strong> entén, pretén, tindré, accés, només</li>
                            <li><strong>Plans:</strong> néixer, témer, créixer, érem</li>
                            <li><strong>Esdrúixols:</strong> cérvola, església, feréstega</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                      <div className="pb-3 border-b border-slate-200 dark:border-slate-700/50 mb-3">
                        <h5 className="font-semibold text-foreground text-base">Accentuació de la O</h5>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm mb-1 text-slate-800 dark:text-slate-200">Accent obert (ò)</p>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4 list-disc">
                            <li><strong>Aguts:</strong> això, allò, arròs, però, repòs</li>
                            <li><strong>Plans:</strong> sòcol, lògic, mòbil, pròxim</li>
                            <li><strong>Esdrúixols:</strong> còlera, còpia, crònica, òpera</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1 text-slate-800 dark:text-slate-200">Accent tancat (ó)</p>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4 list-disc">
                            <li><strong>Aguts:</strong> cançó, botó, atenció, educació</li>
                            <li><strong>Plans:</strong> córrer, fórem, estómac</li>
                            <li><strong>Esdrúixols:</strong> fórmula, pólvora, tómbola</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Accent diacrític */}
            <AccordionItem value="accent-diacritic">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                L'Accent en els Mots Monosil·làbics (Accent Diacrític)
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <p className="text-muted-foreground">
                  En català, la majoria dels mots monosil·làbics no s'accentuen. Però hi ha alguns mots d'una síl·laba 
                  que porten accent gràfic per distingir-los d'altres que s'escriuen igual, tot i que tenen una 
                  pronúncia i un significat diferents. Aquest accent s'anomena <strong>diacrític</strong>.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold bg-muted/50">Amb accent</th>
                        <th className="text-left p-2 font-semibold bg-muted/50">Sense accent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2"><strong>bé, béns</strong> (adverbi: riquesa)</td>
                        <td className="p-2"><strong>be, bens</strong> (xai, la lletra b)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>déu, déus</strong> (divinitat)</td>
                        <td className="p-2"><strong>deu, deus</strong> (numeral: 10; font; verb deure)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>dóna</strong> (verb donar)</td>
                        <td className="p-2"><strong>dona</strong> (persona del sexe femení)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>és</strong> (verb ser o ésser)</td>
                        <td className="p-2"><strong>es</strong> (pronom)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>mà</strong> (part del cos)</td>
                        <td className="p-2"><strong>ma</strong> (possessiu: ma mare)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>més</strong> (quantitatiu)</td>
                        <td className="p-2"><strong>mes</strong> (mes de l'any; conjunció)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>món</strong> (univers)</td>
                        <td className="p-2"><strong>mon</strong> (possessiu: mon pare)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>nét, néta</strong> (parentiu)</td>
                        <td className="p-2"><strong>net, neta</strong> (adjectiu)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>ós, óssa</strong> (animal)</td>
                        <td className="p-2"><strong>os, ossa</strong> (de l'esquelet)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>què</strong> (interrogatiu)</td>
                        <td className="p-2"><strong>que</strong> (relatiu; conjunció)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>sé</strong> (verb saber)</td>
                        <td className="p-2"><strong>se</strong> (pronom)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>sí</strong> (afirmació)</td>
                        <td className="p-2"><strong>si</strong> (conjunció; nota musical)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong className="line-through">sóc</strong> <span className="text-destructive">→ soc</span> (verb ésser)</td>
                        <td className="p-2"><strong>soc</strong> (soca; esclop)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>són</strong> (verb ésser)</td>
                        <td className="p-2"><strong>son</strong> (ganes de dormir; possessiu)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>té</strong> (verb tenir)</td>
                        <td className="p-2"><strong>te</strong> (infusió; pronom)</td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>véns</strong> (verb venir)</td>
                        <td className="p-2"><strong>vens</strong> (verb vendre)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Canvi recent: "soc" (verb ésser) ara s'escriu SENSE accent
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* La dièresi */}
            <AccordionItem value="dieresi">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                La Dièresi
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">A. Quan utilitzem la dièresi:</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium mb-2">1. Per indicar que cal pronunciar la u dels grups: qüe, qüi, güe, güi</p>
                        <div className="grid grid-cols-2 gap-2 text-sm ml-4">
                          <div>
                            <p className="font-medium">Amb dièresi (gü, qü):</p>
                            <p className="text-muted-foreground">llengües, aigües, ambigüitat, pasqües, obliqüitat</p>
                          </div>
                          <div>
                            <p className="font-medium">Sense dièresi (gu, qu):</p>
                            <p className="text-muted-foreground">figues, antiguitat, guitarra, tasques, maqueta</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-2">2. Per senyalar que les vocals no formen diftong</p>
                        <div className="grid grid-cols-2 gap-2 text-sm ml-4">
                          <div>
                            <p className="font-medium">Formen diftong:</p>
                            <p className="text-muted-foreground">esglai, daina, beina, feina, cuina, buit, peu, noies</p>
                          </div>
                          <div>
                            <p className="font-medium">NO formen diftong:</p>
                            <p className="text-muted-foreground">ra-ïm, ve-ï-na, con-du-ï-a, ru-ï-nós, pe-üc, co-ï-es</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">B. Estalvi de la dièresi:</h4>
                    <p className="text-sm text-muted-foreground mb-2">No posem dièresi en els casos següents:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Quan la i o la u duen accent gràfic: <span className="italic">veí, suís, país, Lluís</span></li>
                      <li>Terminacions llatines -us, -um: <span className="italic">Màrius, harmònium, pòdium, aquàrium</span></li>
                      <li>Prefixos anti-, auto-, co-, contra-, re-, semi-: <span className="italic">antiinflamatori, coincidència, reincidir</span></li>
                      <li>Sufixos -isme, -ista: <span className="italic">egoisme, egoista, altruista</span></li>
                      <li>Infinitius, gerundis, futurs i condicionals: <span className="italic">agrair, traïnt, succeiré, traduiria</span></li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Gènere dels noms */}
            <AccordionItem value="genere">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Gènere dels Noms
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Substantius variables</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tenen una forma per al masculí i una per al femení.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Regla general:</strong> El femení es forma afegint -a: <span className="italic">nen → nena</span></p>
                      <p><strong>Canvis consonàntics:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>p → ba: <span className="italic">llop → lloba</span></li>
                        <li>t → da: <span className="italic">nebot → neboda</span></li>
                        <li>c → ga: <span className="italic">amic → amiga</span></li>
                        <li>f → va: <span className="italic">serf → serva</span></li>
                        <li>s → ssa: <span className="italic">gos → gossa, ós → óssa</span></li>
                      </ul>
                      <p><strong>Vocals tòniques:</strong> afegeixen -n: <span className="italic">lleó → lleona</span></p>
                      <p><strong>Sufixos especials:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>-òloga: <span className="italic">geòleg → geòloga</span></li>
                        <li>-essa: <span className="italic">abat → abadessa</span></li>
                        <li>-ina: <span className="italic">gall → gallina</span></li>
                        <li>-iu: <span className="italic">actor → actriu</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Substantius invariables</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Mantenen la mateixa forma per als dos gèneres.
                    </p>
                    <p className="text-sm">
                      <strong>Exemples:</strong> <span className="italic">drapaire, monarca, violinista, patriota, belga, noble, rossinyol, màrtir</span>
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                      <div className="pb-3 border-b border-slate-200 dark:border-slate-700/50 mb-3">
                        <h5 className="font-semibold text-foreground text-base">Noms sempre masculins</h5>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          els afores, un anell, un avantatge, el compte, el deute, el dot, el dubte, 
                          els espinacs, el front, un full, un interrogant, el llegum, el marge, 
                          els narius, un ordre, un orgue, el pebre, el pendent, el senyal, els tèrmits, el titella
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                      <div className="pb-3 border-b border-slate-200 dark:border-slate-700/50 mb-3">
                        <h5 className="font-semibold text-foreground text-base">Noms sempre femenins</h5>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          les alicates, una allau, una amargor, una anàlisi, una àncora, una aroma, 
                          una au, la calor, la claror, la dent, la destrossa, la frescor, la gla, 
                          la grip, la icona, la marató, la nespra, una olor, les postres, 
                          la remor, la resplendor, la resta, la sidra, la síncope, la síndrome, la suor
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Nombre dels noms */}
            <AccordionItem value="nombre">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Flexió de Nombre
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Substantius variables</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Regla general:</strong> El plural es forma afegint -s: <span className="italic">arbre → arbres</span></p>
                      <p><strong>Acabats en -a, -e àtones:</strong> plural amb -es: <span className="italic">dia → dies</span></p>
                      <p><strong>Vocals tòniques:</strong> afegeixen -ns: <span className="italic">pi → pins</span></p>
                      <p><strong>Masculins aguts en -s, -ç, -x, -ix, -tx:</strong> plural en -os: <span className="italic">pis → pisos</span></p>
                      <p><strong>Acabats en -sc, -st, -xt, -ig:</strong> doble forma: <span className="italic">bosc → boscs/boscos</span></p>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Substantius invariables</h4>
                    <p className="text-sm">
                      Hi ha mots que s'escriuen igual en singular que en plural: <span className="italic">llapis → llapis</span>
                    </p>
                    <p className="text-sm mt-2">
                      Noms que s'usen en plural per referir-se a una unitat: <span className="italic">els afores, les calces</span>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Adjectius */}
            <AccordionItem value="adjectius">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Adjectius
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Adjectius de dues terminacions</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tenen una forma per a cada gènere, és a dir quatre formes segons si són singular i plural.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Regla general:</strong> El femení es forma afegint -a al masculí: <span className="italic">content → contenta</span></p>
                      <p><strong>Modificacions de l'arrel:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>s → ss: <span className="italic">gras → grassa</span></li>
                        <li>c → g: <span className="italic">amic → amiga</span></li>
                        <li>c → qu: <span className="italic">oblic → obliqua</span></li>
                        <li>l → l·l: <span className="italic">nul → nul·la</span></li>
                        <li>t → d: <span className="italic">mut → muda</span></li>
                        <li>u → v: <span className="italic">jueu → jueva</span></li>
                      </ul>
                      <p><strong>Vocals tòniques:</strong> afegeixen -n: <span className="italic">ple → plena</span> (però <span className="italic">cru → crua</span>)</p>
                      <p><strong>Altres sufixos:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>-e/-a: <span className="italic">ample → ampla</span></li>
                        <li>-o/-a: <span className="italic">flonjo → flonja</span></li>
                        <li>-u/-a: <span className="italic">ateu → atea</span></li>
                        <li>-òleg/-òloga: <span className="italic">homòleg → homòloga</span></li>
                        <li>-ig especials: <span className="italic">boig → boja, lleig → lletja</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Adjectius d'una sola terminació</h4>
                    <p className="text-sm text-muted-foreground mb-2">Mateixa forma per a masculí i femení:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Acabats en -e: <span className="italic">alegre, solemne</span></li>
                      <li>Acabats en -a: <span className="italic">belga, celta</span></li>
                      <li>Acabats en -cida, -ista: <span className="italic">homicida, altruista</span></li>
                      <li>Acabats en -aç, -iç, -oç: <span className="italic">audaç, feliç, veloç</span></li>
                      <li>Acabats en -al, -el, -il: <span className="italic">actual, cruel, fàcil</span></li>
                      <li>Acabats en -ble: <span className="italic">amable</span></li>
                      <li>Acabats en -ar, -or: <span className="italic">angular, inferior</span> (però <span className="italic">avar → avara</span>)</li>
                      <li>Acabats en -ant, -ent: <span className="italic">abundant, adherent</span></li>
                      <li>Altres: <span className="italic">àrab, breu</span></li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* L'article definit */}
            <AccordionItem value="article">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                L'Article Definit
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    L'article definit és una categoria gramatical que exerceix principalment la funció de determinar un nom ja conegut.
                  </p>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-3">Morfologia</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2"></th>
                          <th className="text-left p-2 font-semibold">Masculí</th>
                          <th className="text-left p-2 font-semibold">Femení</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2 font-medium">Singular (consonant)</td>
                          <td className="p-2">el</td>
                          <td className="p-2">la</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Singular (vocal/h)</td>
                          <td className="p-2">l'</td>
                          <td className="p-2">l'</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Plural</td>
                          <td className="p-2">els</td>
                          <td className="p-2">les</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Apostrofació</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Com a regla general, quan la paraula següent comença per vocal o h: <strong>el → l'</strong>, <strong>la → l'</strong>
                    </p>
                    <p className="text-sm italic">Ex.: l'avi, l'egua, l'invent, l'orgue, l'ull, l'hivern</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      També amb paraules d'origen estranger, xifres i sigles que es pronuncien amb so vocàlic inicial:
                    </p>
                    <p className="text-sm italic">l'stop, l'1, l'11, l'FMI, l'IVA, l'ESO, l'ONCE, l'ONU...</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">NO s'apostrofen</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Mots amb h aspirada: <span className="italic">el hall, el hòlding</span></li>
                      <li>Davant de mot femení amb i/u àtones: <span className="italic">la idea, la il·lusió, la unitat, la humitat</span></li>
                      <li>Davant de i/u consonàntica: <span className="italic">el iaio, el ioga, la iarda, la hiena</span></li>
                      <li>Per evitar confusions: <span className="italic">la una, la ira, la host</span></li>
                      <li>Nom de lletres: <span className="italic">la a, la ena, la hac</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-3">Contracció</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Preposició</th>
                          <th className="text-left p-2">+ el (consonant)</th>
                          <th className="text-left p-2">+ el (vocal)</th>
                          <th className="text-left p-2">+ els</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2 font-medium">a</td>
                          <td className="p-2">al</td>
                          <td className="p-2">a l'</td>
                          <td className="p-2">als</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">de</td>
                          <td className="p-2">del</td>
                          <td className="p-2">de l'</td>
                          <td className="p-2">dels</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">per</td>
                          <td className="p-2">pel</td>
                          <td className="p-2">-</td>
                          <td className="p-2">pels</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">per a</td>
                          <td className="p-2">per al</td>
                          <td className="p-2">per a l'</td>
                          <td className="p-2">per als</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Estalvi de l'article</h4>
                    <p className="text-sm text-muted-foreground mb-2">Se suprimeix l'article en els casos següents:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Amb adjectiu demostratiu: <span className="italic">aquella dona</span></li>
                      <li>Dies de la setmana usats com a adverbis: <span className="italic">Diumenge anàrem al camp</span></li>
                      <li>Infinitius amb valor verbal: <span className="italic">Beure alcohol no és bo</span></li>
                      <li>Davant de la conjunció "que": <span className="italic">Que anem a sopar no vol dir res</span></li>
                      <li>Amb possessius mon, ton, son, llur</li>
                      <li>Davant el nom Déu, en títols de llibres, indicacions, enumeracions</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Pronoms febles */}
            <AccordionItem value="pronoms">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Els Pronoms Febles i les seves Combinacions
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <p className="text-muted-foreground">
                  Els complements del verb poden ésser representats per pronoms inaccentuats que es col·loquen 
                  immediatament al davant o al darrera del verb.
                </p>

                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                  <h4 className="font-semibold text-foreground mb-3">Formes dels pronoms febles</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2"></th>
                          <th className="text-left p-2">Davant del verb</th>
                          <th className="text-left p-2">Darrere del verb</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2 font-medium">1a sg.</td>
                          <td className="p-2">em, m'</td>
                          <td className="p-2">-me, 'm</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">2a sg.</td>
                          <td className="p-2">et, t'</td>
                          <td className="p-2">-te, 't</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">3a sg. m.</td>
                          <td className="p-2">el, l'</td>
                          <td className="p-2">-lo, 'l</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">3a sg. f.</td>
                          <td className="p-2">la, l'</td>
                          <td className="p-2">-la</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">1a pl.</td>
                          <td className="p-2">ens</td>
                          <td className="p-2">-nos, 'ns</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">2a pl.</td>
                          <td className="p-2">us</td>
                          <td className="p-2">-vos, 'us</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">3a pl. m.</td>
                          <td className="p-2">els</td>
                          <td className="p-2">-los, 'ls</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">3a pl. f.</td>
                          <td className="p-2">les</td>
                          <td className="p-2">-les</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Reflexiu</td>
                          <td className="p-2">es, s'</td>
                          <td className="p-2">-se, 's</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">CI</td>
                          <td className="p-2">li, els</td>
                          <td className="p-2">-li</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Indeterminat</td>
                          <td className="p-2">en, n'</td>
                          <td className="p-2">-ne, 'n</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Neutre</td>
                          <td className="p-2">ho</td>
                          <td className="p-2">-ho</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Locatiu</td>
                          <td className="p-2">hi</td>
                          <td className="p-2">-hi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-foreground mb-2">Combinacions de pronoms</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Exemples de combinacions CI + CD:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li><strong>me la</strong> dónes? (em + la → me la)</li>
                    <li><strong>me'l</strong> dones? (em + el → me'l)</li>
                    <li><strong>te les</strong> dones? (et + les → te les)</li>
                    <li><strong>ens ho</strong> dones? (ens + ho → ens ho)</li>
                    <li><strong>la hi</strong> dónes? / <strong>l'hi</strong> dónes? (li + la → la hi, forma oral: l'hi)</li>
                    <li><strong>li'n</strong> dones / <strong>n'hi</strong> dónes? (li + en, forma oral: n'hi)</li>
                    <li><strong>els la</strong> dónes? / <strong>els hi</strong> dónes? (forma oral)</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Preposicions */}
            <AccordionItem value="preposicions">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Les Preposicions
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Preposicions febles (o àtones)</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>a</strong> (a + el/els → al/als): <span className="italic">Vindré a casa teva</span></li>
                      <li><strong>amb</strong>: <span className="italic">Menjarem vedella amb bolets</span></li>
                      <li><strong>de</strong> (de + el/els → del/dels): <span className="italic">Vinc de Figueres</span></li>
                      <li><strong>en</strong>: <span className="italic">Van construir la casa en un any</span></li>
                      <li><strong>per</strong> (per + el/els → pel/pels): <span className="italic">Farem un volt per Sant Martí</span></li>
                      <li><strong>per a</strong>: <span className="italic">Fundació per a la Fibromiàlgia</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Preposicions fortes (o tòniques)</h4>
                    <p className="text-sm font-medium mb-2">Simples:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>contra</strong>: <span className="italic">El cotxe ha xocat contra la paret</span></li>
                      <li><strong>entre</strong>: <span className="italic">Collserola queda entre Cerdanyola i Sant Cugat</span></li>
                      <li><strong>envers/devers/vers</strong>: <span className="italic">Violència envers les dones</span></li>
                      <li><strong>fins</strong>: <span className="italic">No tornaran fins a la nit</span></li>
                      <li><strong>malgrat</strong>: <span className="italic">Malgrat el fred, vam fer una sortida</span></li>
                      <li><strong>segons</strong>: <span className="italic">Segons les entitats</span></li>
                      <li><strong>sense</strong>: <span className="italic">Sense la nova biblioteca</span></li>
                    </ul>

                    <p className="text-sm font-medium mb-2 mt-3">Compostes:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>cap a</strong>: <span className="italic">El camí cap a la Independència</span></li>
                      <li><strong>des de</strong>: <span className="italic">Des d'ara</span></li>
                      <li><strong>fins a</strong> (fins a + el/els → fins al/als): <span className="italic">Fins a la tarda</span></li>
                    </ul>

                    <p className="text-sm font-medium mb-2 mt-3">Altres preposicions:</p>
                    <p className="text-sm text-muted-foreground ml-4">
                      Procedents d'adverbis de lloc: <span className="italic">dalt, damunt, darrere...</span><br />
                      Procedents de gerundis i participis: <span className="italic">durant, mitjançant, excepte...</span>
                    </p>

                    <p className="text-sm font-medium mb-2 mt-3">Locucions prepositives:</p>
                    <p className="text-sm text-muted-foreground ml-4 italic">
                      a causa de, a excepció de, a força de, al costat de...
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Adverbis */}
            <AccordionItem value="adverbis">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                L'Adverbi i les Locucions Adverbials
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Categoria gramatical invariable que serveix per a modificar el significat d'un adjectiu, 
                    d'un verb, d'un altre adverbi, d'un predicat o d'una oració.
                  </p>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Adverbis de manera</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Els adverbis acabats en <strong>-ment</strong> són derivats dels adjectius: 
                      <span className="italic"> adjectiu femení + ment = adverbi</span>
                    </p>
                    <p className="text-sm italic">Ex.: mal → mala → malament</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Altres: <span className="italic">així, com, bé, millor, pitjor, ensems, corrents...</span>
                    </p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Adverbis de quantitat</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Principals: <span className="italic">quant, molt, poc, tant, tan, prou, massa, gaire...</span>
                    </p>
                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded text-sm mt-2">
                      <p className="font-medium">Compte!</p>
                      <p>L'adverbi <strong>tant</strong> pren la forma <strong>tan</strong> quan modifica un adjectiu, adverbi o locució adverbial.</p>
                      <p className="italic">Ex.: No mengis tan de pressa!</p>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Adverbis de lloc</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="italic">aquí, ací, allà, allí, a dalt, a baix, a dins, a fora, a prop, lluny, on...</span>
                    </p>
                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded text-sm mt-2">
                      <p>Molts admeten l'anteposició de la preposició <strong>a</strong>: a dalt, a baix, a dins, a fora...</p>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Adverbis de temps</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="italic">quan, ara, abans, després, encara, aviat, tard, sempre, mai, ja, demà, ahir, avui...</span>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Derivació */}
            <AccordionItem value="derivacio">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Derivació i Pseudoderivats
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Les paraules d'una mateixa família tenen un element en comú, anomenat <strong>arrel o lexema</strong>.
                  </p>
                  <p className="text-sm italic">Exemple: fort, fortor, enfortir, fortificar, fortalesa</p>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Afixos</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Partícules que s'annexen a l'arrel d'un mot per compondre'n un altre de significació diferent:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Prefix</strong>: afix afegit al principi d'un mot</li>
                      <li><strong>Sufix</strong>: afix afegit al darrere d'un mot</li>
                      <li><strong>Infix</strong>: afix introduït a l'interior d'un mot</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Canvis ortogràfics en la derivació</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>c → qu: <span className="italic">sec → sequedat</span></div>
                      <div>c → g: <span className="italic">foc → foguera</span></div>
                      <div>ç → c: <span className="italic">caça → cacera</span></div>
                      <div>ig → g: <span className="italic">assaig → assagista</span></div>
                      <div>s → ss: <span className="italic">espès → espesseir</span></div>
                      <div>ig → tg: <span className="italic">lleig → lletgesa</span></div>
                      <div>gu → gü: <span className="italic">aigua → aigüeta</span></div>
                      <div>u → v: <span className="italic">neu → nevada</span></div>
                      <div>j → g: <span className="italic">granja → granger</span></div>
                      <div>t → ç: <span className="italic">curt → escurçar</span></div>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Pseudoderivats</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Paraules cultes que provenen directament del llatí i no s'escriuen com la resta de paraules de la mateixa família.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Primitiu</th>
                          <th className="text-left p-2">Derivats</th>
                          <th className="text-left p-2">Pseudoderivat</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2">boca</td>
                          <td className="p-2 italic">boqueta, bocassa</td>
                          <td className="p-2 italic">bucal</td>
                        </tr>
                        <tr>
                          <td className="p-2">jove</td>
                          <td className="p-2 italic">jovent, joventut</td>
                          <td className="p-2 italic">juvenil</td>
                        </tr>
                        <tr>
                          <td className="p-2">corb</td>
                          <td className="p-2 italic">corbador, encorbar</td>
                          <td className="p-2 italic">curvatura</td>
                        </tr>
                        <tr>
                          <td className="p-2">llac</td>
                          <td className="p-2 italic">llacuna, llacs</td>
                          <td className="p-2 italic">lacustre</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Frases fetes */}
            <AccordionItem value="frases">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Frases Fetes
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <p className="text-muted-foreground mb-4">
                  Selecció de les frases fetes més comunes del català:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Agafar el rave per les fulles</p>
                    <p className="text-sm text-muted-foreground">Agafar o entendre una cosa pel cantó més maliciós.</p>
                  </div>
                  
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Anar-se'n en orris</p>
                    <p className="text-sm text-muted-foreground">Referir-se a alguna cosa que s'ha espatllat, s'ha perdut o ha fracassat.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Bufar i fer ampolles</p>
                    <p className="text-sm text-muted-foreground">Indica que una cosa és molt fàcil de fer.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Caure de quatre potes, com els gats</p>
                    <p className="text-sm text-muted-foreground">Sortir-se bé, amb sort, de situacions difícils o de malifetes.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Costar un ull de la cara</p>
                    <p className="text-sm text-muted-foreground">Ésser molt cara una cosa.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">De gom a gom</p>
                    <p className="text-sm text-muted-foreground">Completament ple; atapeït.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Donar gat per llebre</p>
                    <p className="text-sm text-muted-foreground">Enganyar donant una cosa per una altra o fent veure allò que no és.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Ésser la mare dels ous</p>
                    <p className="text-sm text-muted-foreground">Ésser la causa, la raó d'una cosa.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Fer el salt</p>
                    <p className="text-sm text-muted-foreground">Mancar a una cita o a un compromís; cometre una infidelitat conjugal.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Fer mans i mànigues</p>
                    <p className="text-sm text-muted-foreground">Esforçar-se molt per aconseguir alguna cosa, fer tots els possibles d'aconseguir-la.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Haver-hi gat amagat</p>
                    <p className="text-sm text-muted-foreground">Haver-hi intenció oculta.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Llançar la tovallola</p>
                    <p className="text-sm text-muted-foreground">Renunciar, donar-se per vençut.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">No tenir ni cap ni peus</p>
                    <p className="text-sm text-muted-foreground">Estar una cosa mal feta.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Perdre bous i esquelles</p>
                    <p className="text-sm text-muted-foreground">Quedar-se sense res.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Posar tota la carn a la graella</p>
                    <p className="text-sm text-muted-foreground">Jugar tots els recursos en una empresa o en un intent.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Tallar el bacallà</p>
                    <p className="text-sm text-muted-foreground">Manar, dirigir.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Tindre la paella pel mànec</p>
                    <p className="text-sm text-muted-foreground">Dominar la situació, controlar una qüestió, tindre poder.</p>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <p className="font-semibold text-sm">Venir com l'anell al dit</p>
                    <p className="text-sm text-muted-foreground">Ser oportú.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Confusions comunes */}
            <AccordionItem value="confusions">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50">
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Evitem Confusions
              </span>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-sm text-base">
                <p className="text-muted-foreground mb-4">
                  En català hi ha alguns parells de paraules que posen certes dificultats a l'hora d'escriure'ls:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Sinó / Si no</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Sinó</strong> (conjunció adversativa): <span className="italic">No vull vi sinó aigua</span></li>
                      <li><strong>Si no</strong> (condicional + negació): <span className="italic">Si no véns, aniré sol</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Perquè / Per què</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Perquè</strong> (conjunció causal): <span className="italic">Ho faig perquè vull</span></li>
                      <li><strong>Per què</strong> (interrogatiu): <span className="italic">Per què ho fas?</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Perquè / Doncs</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Perquè</strong> (conjunció): <span className="italic">Ho faig perquè vull</span></li>
                      <li><strong>Doncs</strong> (conjunció il·lativa): <span className="italic">Vull anar-hi, doncs hi aniré</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Què / Que</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Què</strong> (interrogatiu o exclamatiu): <span className="italic">Què vols? Què bonic!</span></li>
                      <li><strong>Que</strong> (relatiu o conjunció): <span className="italic">El llibre que llegeixes. Vull que vinguis</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Tant / Tan</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Tant</strong> (modifica verb o nom): <span className="italic">Menjo tant. Tant de temps</span></li>
                      <li><strong>Tan</strong> (modifica adjectiu o adverbi): <span className="italic">Tan bonic. Tan aviat</span></li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden group/card hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80 rounded-l-2xl transform origin-left scale-y-50 opacity-0 group-hover/card:scale-y-100 group-hover/card:opacity-100 transition-all duration-300" />
                    <h4 className="font-semibold text-foreground mb-2">Quant / Quan</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Quant</strong> (quantitatiu): <span className="italic">Quanta gent! Quant val?</span></li>
                      <li><strong>Quan</strong> (temporal): <span className="italic">Quan véns? Quan sigui gran</span></li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      </div>
    </div>
  );
};
