
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [evaluationFrequency, setEvaluationFrequency] = useState('realtime');
  const [enabledRuleTypes, setEnabledRuleTypes] = useState({
    ursec: true,
    blacklist: true,
    whitelist: true
  });
  const [blockedProductMessage, setBlockedProductMessage] = useState(
    'Este producto no está disponible en este momento. Para más información, contacte con servicio al cliente.'
  );
  
  const saveSettings = () => {
    // In a real app, this would save to an API
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados correctamente"
    });
  };
  
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Configuración</h1>
        <Button 
          className="bg-am-purple hover:bg-am-purple-dark"
          onClick={saveSettings}
        >
          Guardar cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rules">Reglas</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuración general</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Evaluation frequency */}
              <div>
                <h3 className="text-sm font-medium mb-3">Frecuencia de evaluación de reglas</h3>
                <Select 
                  value={evaluationFrequency} 
                  onValueChange={setEvaluationFrequency}
                >
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Tiempo real</SelectItem>
                    <SelectItem value="hourly">Cada hora</SelectItem>
                    <SelectItem value="daily">Diario (medianoche)</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                  </SelectContent>
                </Select>
                {evaluationFrequency !== 'realtime' && (
                  <p className="text-sm text-amber-600 mt-2">
                    ⚠️ Las evaluaciones que no son en tiempo real pueden generar inconsistencias temporales en el catálogo.
                  </p>
                )}
              </div>

              {/* API Connection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Conexión API</h3>
                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" value="••••••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">Endpoint</Label>
                    <Input id="api-endpoint" value="https://api.ecommerce.com/v1/products" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Verificar conexión</Button>
                  </div>
                </div>
              </div>

              {/* Data Export */}
              <div>
                <h3 className="text-sm font-medium mb-3">Exportar datos</h3>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="mr-2">Exportar reglas (CSV)</Button>
                  <Button variant="outline" size="sm">Exportar conflictos (CSV)</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuración de reglas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rule Types */}
              <div>
                <h3 className="text-sm font-medium mb-3">Tipos de reglas habilitadas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ursec" className="font-medium">URSEC</Label>
                      <p className="text-sm text-gray-500">Controla productos restringidos por regulaciones</p>
                    </div>
                    <Switch 
                      id="ursec" 
                      checked={enabledRuleTypes.ursec}
                      onCheckedChange={(checked) => setEnabledRuleTypes({...enabledRuleTypes, ursec: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="blacklist" className="font-medium">Blacklist</Label>
                      <p className="text-sm text-gray-500">Excluye productos específicos del catálogo</p>
                    </div>
                    <Switch 
                      id="blacklist" 
                      checked={enabledRuleTypes.blacklist}
                      onCheckedChange={(checked) => setEnabledRuleTypes({...enabledRuleTypes, blacklist: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="whitelist" className="font-medium">Whitelist</Label>
                      <p className="text-sm text-gray-500">Incluye productos específicos en el catálogo</p>
                    </div>
                    <Switch 
                      id="whitelist" 
                      checked={enabledRuleTypes.whitelist}
                      onCheckedChange={(checked) => setEnabledRuleTypes({...enabledRuleTypes, whitelist: checked})}
                    />
                  </div>
                </div>
              </div>

              {/* Rule Hierarchy */}
              <div>
                <h3 className="text-sm font-medium mb-3">Jerarquía de reglas</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Orden de prioridad (de mayor a menor):
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    <span className="font-medium">SKU</span>
                    <span className="text-gray-500"> - Nivel más específico, prevalece sobre todo lo demás</span>
                  </li>
                  <li>
                    <span className="font-medium">Keyword</span>
                    <span className="text-gray-500"> - Prioridad media</span>
                  </li>
                  <li>
                    <span className="font-medium">Categoría</span>
                    <span className="text-gray-500"> - Nivel menos específico</span>
                  </li>
                </ol>
                <p className="text-sm text-gray-500 mt-2">
                  * KeyCat se evalúa al mismo nivel que Keyword
                </p>

                <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="text-sm text-amber-800">
                    Atención: Cambiar la jerarquía de reglas puede generar cambios masivos en el catálogo visible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mensajes personalizados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Default messages */}
              <div>
                <h3 className="text-sm font-medium mb-3">Mensaje para productos bloqueados</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Este mensaje se mostrará en el PDP para productos que estén excluidos por alguna regla.
                </p>
                <Textarea 
                  value={blockedProductMessage}
                  onChange={(e) => setBlockedProductMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Message preview */}
              <div className="border p-4 rounded-md bg-gray-50">
                <h3 className="text-sm font-medium mb-1">Vista previa:</h3>
                <div className="p-4 bg-white border rounded">
                  <div className="text-center py-6">
                    <div className="text-xl text-gray-400 mb-2">⚠️</div>
                    <p>{blockedProductMessage}</p>
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Idioma para mensajes</h3>
                <Select defaultValue="es">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                    <SelectItem value="pt">Portugués</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Permisos de usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role permissions */}
              <div>
                <h3 className="text-sm font-medium mb-3">Permisos por rol</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ver reglas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crear reglas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar reglas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eliminar reglas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Configuración</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">Administrador</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">Supervisor</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">Operador</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">Visualizador</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">✅</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">❌</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Audit trail */}
              <div>
                <h3 className="text-sm font-medium mb-3">Auditoría de cambios</h3>
                <div className="flex items-center mb-2">
                  <Switch id="audit-trail" defaultChecked />
                  <Label htmlFor="audit-trail" className="ml-2">
                    Registrar historial de cambios
                  </Label>
                </div>
                <p className="text-sm text-gray-500">
                  Mantiene un registro detallado de todos los cambios realizados en las reglas, incluyendo quién lo hizo y cuándo.
                </p>
              </div>

              {/* Retention Policy */}
              <div>
                <h3 className="text-sm font-medium mb-3">Política de retención de datos</h3>
                <div className="max-w-xs">
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="180">6 meses</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                      <SelectItem value="forever">Indefinidamente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button 
          className="bg-am-purple hover:bg-am-purple-dark"
          onClick={saveSettings}
        >
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
