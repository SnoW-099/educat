import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";

interface TheoryModalProps {
  topic: string;
  onClose: () => void;
}

export const TheoryModal = ({ topic, onClose }: TheoryModalProps) => {
  const getTheoryContent = (topic: string) => {
    switch (topic) {
      case 'dieresi':
        return {
          title: 'La Dièresi',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  A. Utilitzarem la dièresi en els casos següents:
                </h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">1. Per indicar que cal pronunciar la u dels grups: qüe, qüi, güe, güi</h4>
                      
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">gü</h5>
                          <ul className="text-sm space-y-1">
                            <li>llengües</li>
                            <li>aigües</li>
                            <li>ambigüitat</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">gu</h5>
                          <ul className="text-sm space-y-1">
                            <li>figues</li>
                            <li>antiguitat</li>
                            <li>guitarra</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">qü</h5>
                          <ul className="text-sm space-y-1">
                            <li>pasqües</li>
                            <li>obliqüitat</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">qu</h5>
                          <ul className="text-sm space-y-1">
                            <li>tasques</li>
                            <li>maqueta</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">2. Diftongs i hiats</h4>
                      <p className="text-sm mb-3">
                        La i i la u seguides de una vocal formen generalment un diftong creixent.
                        La i i la u finals o seguides d'una consonant formen generalment amb la vocal precedent un diftong decreixent.
                      </p>
                      <p className="text-sm mb-3 font-medium">
                        Utilitzarem la dièresis per senyalar gràficament que aquestes vocals no formen diftong.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-green-700">Formen diftong</h5>
                          <ul className="text-sm space-y-1">
                            <li>es-glai, dai-na</li>
                            <li>bei-na, fei-na</li>
                            <li>cui-na, buit</li>
                            <li>peu</li>
                            <li>no-ies</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-red-700">NO formen diftong</h5>
                          <ul className="text-sm space-y-1">
                            <li>ra-ïm</li>
                            <li>ve-ï-na, con-du-ï-a</li>
                            <li>ru-ï-nós</li>
                            <li>pe-üc</li>
                            <li>co-ï-es</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="text-lg font-semibold mb-3">B. Estalvi de la dièresi:</h3>
                
                <div className="space-y-3">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Quan la i o la u duen accent gràfic</h5>
                          <p className="text-sm">
                            <span className="font-medium">Escrivim:</span> veïna, suïssa, països, Lluïsa...<br/>
                            <span className="font-medium">Però:</span> veí, suís, país, Lluís...
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Terminacions llatines -us, -um</h5>
                          <p className="text-sm">
                            Màrius, Pius, harmònium, linòleum, pòdium, aquàrium...
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Mots amb prefixos</h5>
                          <p className="text-sm">
                            <span className="font-medium">anti-, auto-, co-, contra-, re-, semi-...</span><br/>
                            antiinflamatori, autoinjectable, coincidència, contraindicació, reincidir, semiindiferència...
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Mots amb sufixos -isme, -ista...</h5>
                          <p className="text-sm">egoisme, egoista, altruista...</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Formes verbals</h5>
                          <p className="text-sm">
                            <span className="font-medium">Infinitiu:</span> agrair, trair, succeir, traduir...<br/>
                            <span className="font-medium">Gerundi:</span> agraint, traint, succeint, traduint...<br/>
                            <span className="font-medium">Futur:</span> agrairé, trairé, succeiré, traduiré...<br/>
                            <span className="font-medium">Condicional:</span> agrairia, trairia, succeiria, traduiria...
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          )
        };
      case 'vocal-neutra':
        return {
          title: 'La Vocal Neutra',
          content: (
            <div className="space-y-6">
              <section>
                <div className="mb-4">
                  <p className="text-sm mb-3">
                    La vocal neutra és un so (fonema) que es representa [ə] en l'AFI ('alfabet fonètic internacional).
                    En català aquest so s'ha de escriure a o e, i això origina dubtes ortogràfics: en quin cas s'ha de escriure a i en quin s'ha de escriure e?
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">1. A l'interior de la paraula</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">
                        La lletra que cal escriure ve indicada per la pronunciació d'un altre mot de la mateixa família (raons etimològiques).
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">S'escriu A</h5>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">blancor</span> → blanc</div>
                            <div><span className="font-medium">fageda</span> → faig</div>
                            <div><span className="font-medium">francès</span> → França</div>
                            <div><span className="font-medium">Pauet</span> → Pau</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">S'escriu E</h5>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">fredor</span> → fred</div>
                            <div><span className="font-medium">rentar</span> → renta</div>
                            <div><span className="font-medium">sentir</span> → sent</div>
                            <div><span className="font-medium">peuet</span> → peu</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">2. A l'última síl·laba de la paraula</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">S'escriu E</h5>
                          <ul className="text-sm space-y-1">
                            <li><span className="font-medium">Noms i adjectius masculins:</span> moble, negre...</li>
                            <li><span className="font-medium">Verbs (terminacions seguides d'altre so):</span> cantes, canten...</li>
                            <li><span className="font-medium">Formes verbals:</span> corre, vine, obre, omple</li>
                            <li><span className="font-medium">Infinitius en -re:</span> perdre, seure, treure...</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">S'escriu A</h5>
                          <ul className="text-sm space-y-1">
                            <li><span className="font-medium">Noms i adjectius femenins:</span> faldilla, ampla...</li>
                            <li><span className="font-medium">Verbs (terminacions acabades en [ə]):</span> canta, cantava...</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">3. Verbs especials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Els verbs <span className="font-medium">jeure o jaure</span>, <span className="font-medium">treure o traure</span>, <span className="font-medium">néixer o nàixer</span>:
                      </p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Les formes tòniques són correctes tant amb a com amb e</li>
                        <li>• Les formes àtones s'escriuen amb a</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">4. Referència de mots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Català amb A</h5>
                          <div className="text-xs space-y-1">
                            <div>afaitar, ambaixada, arravatar-se, assassí, avaluar, avantatge, avaria</div>
                            <div>banús, davant, latrina, maragda, ramat, rancor, sanefa, sargantana, Sardenya</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Català amb E</h5>
                          <div className="text-xs space-y-1">
                            <div>albercoc, almogàver, ametista, assemblea, eben, efeminat, emparar, Empordà, Empúries</div>
                            <div>enyorar, espàrec, estella, estendard, gelea, javelina, meravella, monestir, punxegut, ràfega, resplendir, sergent, setí, temptejar, treball, vernís</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          )
        };
      case 'vocals-o-u':
        return {
          title: 'Les vocals o/u àtones',
          content: (
            <div className="space-y-6">
              <section>
                <p className="text-sm mb-4">
                  La coincidència de so de la o i de la u àtones també origina dubtes que es poden resoldre si se segueixen les regles següents:
                </p>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">1. A l'última síl·laba de la paraula</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Substantius masculins que acabin en [u] → normalment -o</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-sm">Exemples:</span>
                              <p className="text-sm">gerro, toro, suro, carro</p>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Excepcions:</span>
                              <p className="text-sm">museu, correu, tribu</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Noms i adjectius que fan el plural en [us] → normalment -os</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-sm">Exemples:</span>
                              <div className="text-sm space-y-1">
                                <div>abús → abusos</div>
                                <div>gras → grassos</div>
                                <div>bosc → boscos</div>
                                <div>feliç → feliços</div>
                                <div>anís → anissos</div>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Excepcions:</span>
                              <div className="text-sm space-y-1">
                                <div>museu → museus</div>
                                <div>actiu → actius</div>
                                <div>motiu → motius</div>
                                <div>europeu → europeus</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">2. A l'interior de la paraula</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">
                        La lletra que cal escriure ve indicada per la pronunciació d'un altre mot de la mateixa família (raons etimològiques).
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">S'escriu O</h5>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">foscor</span> → fosc</div>
                            <div><span className="font-medium">novè</span> → nou</div>
                            <div><span className="font-medium">pomera</span> → poma</div>
                            <div><span className="font-medium">boirós</span> → boira</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">S'escriu U</h5>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">duresa</span> → dur</div>
                            <div><span className="font-medium">llunyà</span> → lluny</div>
                            <div><span className="font-medium">gruixut</span> → gruix</div>
                            <div><span className="font-medium">fuster</span> → fusta</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <h5 className="font-medium text-sm mb-2">EXCEPCIONS:</h5>
                        <p className="text-sm">
                          <span className="font-medium">S'escriu O malgrat:</span><br/>
                          collir, sortir, volgués, pogués... (malgrat: cull, surt, vulgui, pugui...)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          )
        };
      case 'substantius':
        return {
          title: 'Els substantius: gènere i nombre',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Flexió de gènere
                </h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">1. Substantius variables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">
                        Els substantius variables són aquells que tenen una forma per al masculí i una per al femení.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Regla general: El femení es forma afegint una -a al masculí</h5>
                          <p className="text-sm mb-3">nen → nena</p>
                          
                          <h5 className="font-medium text-sm mb-2">L'arrel sofreix modificacions:</h5>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div><span className="font-medium">p → ba:</span> llop → lloba</div>
                              <div><span className="font-medium">t → da:</span> nebot → neboda</div>
                              <div><span className="font-medium">c → ga:</span> amic → amiga</div>
                            </div>
                            <div>
                              <div><span className="font-medium">f → va:</span> serf → serva</div>
                              <div><span className="font-medium">s → ssa:</span> gos → gossa</div>
                              <div><span className="font-medium">u → va:</span> jueu → jueva</div>
                            </div>
                            <div>
                              <div><span className="font-medium">l → l·l:</span> Marcel → Marcel·la</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Altres formacions:</h5>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div><span className="font-medium">-e, -o, -u àtones → -a:</span></div>
                              <div>alumne - alumna, monjo - monja</div>
                              <div><span className="font-medium">Vocal tònica + -n + -a:</span></div>
                              <div>lleó → lleona</div>
                              <div><span className="font-medium">-òleg → -òloga:</span></div>
                              <div>geòleg - geòloga</div>
                            </div>
                            <div>
                              <div><span className="font-medium">-a → -ot:</span> abella → abellot</div>
                              <div><span className="font-medium">-essa:</span> abat → abadessa</div>
                              <div><span className="font-medium">-ina:</span> gall - gallina</div>
                              <div><span className="font-medium">-iu:</span> actor - actriu</div>
                              <div><span className="font-medium">Arrel diferent:</span> home - dona</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">2. Substantius invariables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">
                        Mantenen la mateixa forma per als dos gèneres: el masculí i el femení.
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Mots acabats en:</h5>
                          <p className="text-sm">-aire, -arca, -cida, -ista, -ta: drapaire, monarca, parricida, violinista, patriota...</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Noms que provenen d'adjectius:</h5>
                          <p className="text-sm">belga, noble...</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Altres noms invariables:</h5>
                          <p className="text-sm">rossinyol, màrtir...</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Canvien de significat segons el gènere:</h5>
                          <p className="text-sm">el canal (la via d'aigua) / la canal (canonada, conducte)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">3. Cal tenir en compte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-blue-700">Masculins:</h5>
                          <div className="text-xs space-y-1">
                            <div>els afores, un anell, un avantatge, els bacteris, el compte, el deute, el dot, el dubte, un escafandre, els espinacs, un estratagema, el front, un full, un interrogant, un interviu, el ioga, el llegum, el lleixiu, el marge, els narius, un ordre, un orgue, el pebre, el pendent, el senyal, els tèrmits, el titella</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-pink-700">Femenins:</h5>
                          <div className="text-xs space-y-1">
                            <div>les alicates, una allau, una amargor, una anàlisi, una àncora, una aroma, una au, la calor, la claror, la cercavila, la dent, la destrossa, una esplendor, la frescor, la gla, la grip, la icona, la marató, la nespra, una olor, les postres, la remor, la resplendor, la resta, la sidra, la síncope, la síndrome, la suor</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="font-medium text-sm mb-2">Topònims femenins (rius):</h5>
                        <p className="text-sm">la Garona, la Gavarresa, la Muga, la Noguera, la Sénia, la Tet, la Tordera, la Valira...</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">4. Noms que admeten masculí i femení</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        el/la èmfasi, el/la art, el/la crin, el/la crisma, el/la fantasma, el/la mar, el/la sarment, el/la serpent, el/la vessant, el/la vodka...
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="text-lg font-semibold mb-3">Flexió de nombre</h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">1. Substantius variables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Regla general: El plural es forma afegint una -s al singular</h5>
                          <p className="text-sm">arbre → arbres</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div>• <span className="font-medium">Acabats en -a, -e àtones:</span> dia → dies</div>
                          <div>• <span className="font-medium">Vocal tònica + -n:</span> pi → pins</div>
                          <div>• <span className="font-medium">Masculins aguts en -s, -ç, -x, -ix, -tx:</span> pis → pisos</div>
                          <div>• <span className="font-medium">Acabats en -sc, -st, -xt, -ig (doble forma):</span> bosc → boscs/boscos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">2. Substantius invariables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div>• <span className="font-medium">S'escriuen igual en singular i plural:</span> llapis - llapis</div>
                        <div>• <span className="font-medium">S'usen en plural per referir-se a una unitat:</span> els afores, les calces...</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          )
        };
      default:
        return {
          title: 'Teoria no disponible',
          content: <p>Aquest tema no té contingut teòric disponible.</p>
        };
    }
  };

  const theoryData = getTheoryContent(topic);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {theoryData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {theoryData.content}
          
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              Tancar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};