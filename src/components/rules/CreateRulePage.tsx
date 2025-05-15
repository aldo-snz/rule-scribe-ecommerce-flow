
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AttributeSelector from '../ui/AttributeSelector';
import { useToast } from "@/hooks/use-toast";

const CreateRulePage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [ruleType, setRuleType] = useState<string>('Blacklist');
  const [action, setAction] = useState<string>('Excluir');
  const [message, setMessage] = useState<string>('');
  
  // Sample products that would be affected
  const affectedProducts = [
    { 
      id: 'SKU001', 
      name: 'Auricular Bluetooth Sony', 
      sku: 'SON-BTH-001', 
      category: 'Electrónica > Audio > Auriculares', 
      keywords: ['bluetooth', 'auricular', 'sony']
    },
    { 
      id: 'SKU002', 
      name: 'Parlante Bluetooth JBL', 
      sku: 'JBL-BTH-001', 
      category: 'Electrónica > Audio > Parlantes', 
      keywords: ['bluetooth', 'parlante', 'jbl'] 
    },
    { 
      id: 'SKU003', 
      name: 'Auricular Bluetooth Bose', 
      sku: 'BOSE-BTH-001', 
      category: 'Electrónica > Audio > Auriculares', 
      keywords: ['bluetooth', 'auricular', 'bose']
    }
  ];

  const [conflicts, setConflicts] = useState([
    {
      productId: 'SKU001',
      conflictType: 'override',
      message: 'Este producto ya está incluido por una regla de categoría "Audio"'
    }
  ]);

  const handleSimulation = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSimulationDone(true);
      
      toast({
        title: "Simulación completada",
        description: "Se encontraron 3 productos afectados por esta regla",
      });
    }, 1500);
  };

  const handleSave = () => {
    toast({
      title: "Regla guardada con éxito",
      description: "La regla ha sido creada y activada",
    });
    // Navigate back would happen here in a real implementation
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Crear nueva regla</h1>
        <Button onClick={handleSave} className="bg-am-purple hover:bg-am-purple-dark">
          Guardar y activar
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="xl:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Rule Type */}
                <div className="space-y-2">
                  <Label htmlFor="rule-type">Tipo de regla</Label>
                  <Select value={ruleType} onValueChange={setRuleType}>
                    <SelectTrigger id="rule-type">
                      <SelectValue placeholder="Seleccione tipo de regla" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="URSEC">URSEC</SelectItem>
                      <SelectItem value="Blacklist">Blacklist</SelectItem>
                      <SelectItem value="Whitelist">Whitelist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action */}
                <div className="space-y-2">
                  <Label htmlFor="action">Acción</Label>
                  <Select value={action} onValueChange={setAction}>
                    <SelectTrigger id="action">
                      <SelectValue placeholder="Seleccione acción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Incluir">Incluir</SelectItem>
                      <SelectItem value="Excluir">Excluir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Criteria Selector */}
                <div className="space-y-2">
                  <Label>Criterio</Label>
                  <AttributeSelector />
                </div>

                {/* Custom Message (for Blacklist) */}
                {ruleType === 'Blacklist' && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-message">Mensaje personalizado (opcional)</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Este producto no está disponible debido a..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                )}

                {/* Simulation Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleSimulation} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="inline-flex items-center">
                        Simulando... <span className="ml-2">⏳</span>
                      </span>
                    ) : "Simular impacto"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="xl:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Vista previa</h2>
              
              {simulationDone ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Productos afectados</div>
                    <div className="text-lg font-semibold">{affectedProducts.length}</div>
                  </div>
                  
                  {conflicts.length > 0 && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          ⚠️
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-amber-700">
                            Se detectaron {conflicts.length} conflictos con reglas existentes
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {affectedProducts.map(product => (
                      <div 
                        key={product.id} 
                        className={`p-3 border rounded-md ${
                          conflicts.some(c => c.productId === product.id) 
                          ? 'border-amber-300 bg-amber-50'
                          : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between">
                          <div className="font-medium">{product.name}</div>
                          {conflicts.some(c => c.productId === product.id) && (
                            <div className="ml-2 text-amber-600">⚠️</div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {product.keywords.map(keyword => (
                            <span 
                              key={keyword} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                        {conflicts.some(c => c.productId === product.id) && (
                          <div className="mt-2 text-xs text-amber-600">
                            {conflicts.find(c => c.productId === product.id)?.message}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Presione "Simular impacto" para ver productos afectados</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-3">
            <Link to="/rules" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
            <Button 
              className="flex-1 bg-am-purple hover:bg-am-purple-dark" 
              onClick={handleSave}
              disabled={!simulationDone}
            >
              Guardar y activar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRulePage;
