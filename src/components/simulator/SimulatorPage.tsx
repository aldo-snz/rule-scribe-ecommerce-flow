
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
import AttributeSelector from '../ui/AttributeSelector';
import PriorityBadge from '../ui/PriorityBadge';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const SimulatorPage = () => {
  const { toast } = useToast();
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [ruleType, setRuleType] = useState<string>('Blacklist');
  const [action, setAction] = useState<string>('Excluir');
  const [criteria, setCriteria] = useState<string>('SKU');

  // Sample simulation results
  const [results, setResults] = useState({
    totalAffected: 0,
    conflicts: 0,
    exclusivelyAffected: 0,
    products: [
      { 
        id: 'SKU001', 
        name: 'Auricular Bluetooth Sony', 
        sku: 'SON-BTH-001', 
        category: 'Electrónica > Audio > Auriculares',
        conflict: false
      },
      { 
        id: 'SKU002', 
        name: 'Parlante Bluetooth JBL', 
        sku: 'JBL-BTH-001', 
        category: 'Electrónica > Audio > Parlantes', 
        conflict: true,
        conflictMessage: 'Conflicto con regla: Whitelist para categoría "Audio"'
      },
      { 
        id: 'SKU003', 
        name: 'Auricular Bluetooth Bose', 
        sku: 'BOSE-BTH-001', 
        category: 'Electrónica > Audio > Auriculares', 
        conflict: false
      },
      { 
        id: 'SKU004', 
        name: 'Cámara Canon EOS', 
        sku: 'CAN-EOS-001', 
        category: 'Electrónica > Fotografía > Cámaras', 
        conflict: false
      },
      { 
        id: 'SKU005', 
        name: 'Smart TV Samsung', 
        sku: 'SAM-TV-001', 
        category: 'Electrónica > TV & Video > Smart TV', 
        conflict: true,
        conflictMessage: 'Conflicto con regla: URSEC para SKU específico'
      }
    ]
  });

  const runSimulation = () => {
    setSimulationRunning(true);

    // Simulate API call
    setTimeout(() => {
      setSimulationRunning(false);
      setSimulationComplete(true);
      
      // Update results
      setResults({
        ...results,
        totalAffected: results.products.length,
        conflicts: results.products.filter(p => p.conflict).length,
        exclusivelyAffected: results.products.filter(p => !p.conflict).length
      });

      toast({
        title: "Simulación completada",
        description: `Se encontraron ${results.products.length} productos afectados por esta regla`,
      });
    }, 2000);
  };

  const addAsRule = () => {
    toast({
      title: "Regla creada",
      description: "La nueva regla ha sido agregada exitosamente",
    });
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Simulador de Reglas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Parámetros de simulación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Rule Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de regla</label>
                <Select value={ruleType} onValueChange={setRuleType}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium">Acción</label>
                <Select value={action} onValueChange={setAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione acción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Incluir">Incluir</SelectItem>
                    <SelectItem value="Excluir">Excluir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Criteria */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Criterio</label>
                <AttributeSelector />
              </div>

              <Button 
                onClick={runSimulation} 
                className="w-full mt-4 bg-am-status-blue hover:bg-blue-600"
                disabled={simulationRunning}
              >
                {simulationRunning ? "Simulando..." : "Ejecutar simulación"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Simulation Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Resultados de la simulación</CardTitle>
          </CardHeader>
          <CardContent>
            {!simulationComplete ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="text-4xl mb-4">🧪</div>
                <p>Ejecute una simulación para ver resultados</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">{results.totalAffected}</div>
                    <div className="text-sm text-gray-500">Productos afectados</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">{results.conflicts}</div>
                    <div className="text-sm text-gray-500">Conflictos</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{results.exclusivelyAffected}</div>
                    <div className="text-sm text-gray-500">Sin conflictos</div>
                  </div>
                </div>

                {/* Products Table */}
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 font-medium text-gray-500">Producto</th>
                        <th className="px-4 py-3 font-medium text-gray-500">SKU</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Categoría</th>
                        <th className="px-4 py-3 font-medium text-gray-500">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.products.map((product) => (
                        <tr key={product.id} className={`hover:bg-gray-50 ${product.conflict ? 'bg-amber-50' : ''}`}>
                          <td className="px-4 py-3">{product.name}</td>
                          <td className="px-4 py-3">{product.sku}</td>
                          <td className="px-4 py-3">{product.category}</td>
                          <td className="px-4 py-3">
                            {product.conflict ? (
                              <div className="flex items-center">
                                <span className="text-amber-600 mr-2">⚠️</span>
                                <span className="text-amber-600 text-xs">{product.conflictMessage}</span>
                              </div>
                            ) : (
                              <span className="text-green-600 text-xs">Sin conflictos</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSimulationComplete(false)}
                  >
                    Nueva simulación
                  </Button>
                  <Button 
                    className="flex-1 bg-am-purple hover:bg-am-purple-dark"
                    onClick={addAsRule}
                  >
                    Agregar como nueva regla
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mass Simulation Box (Optional Extra) */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Simulación Masiva</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                Importe un archivo CSV con SKUs para simular el impacto de múltiples productos a la vez
              </p>
            </div>
            <Button variant="outline">Importar archivo</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulatorPage;
