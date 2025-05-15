
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import PriorityBadge from '../ui/PriorityBadge';

// Define a conflict type for our sample data
type Conflict = {
  id: string;
  product: {
    id: string;
    name: string;
    sku: string;
    category: string;
  };
  primaryRule: {
    id: string;
    type: string;
    criteria: 'SKU' | 'Keyword' | 'Categoría' | 'KeyCat';
    action: 'Incluir' | 'Excluir';
  };
  conflictingRules: Array<{
    id: string;
    type: string;
    criteria: 'SKU' | 'Keyword' | 'Categoría' | 'KeyCat';
    action: 'Incluir' | 'Excluir';
  }>;
  systemAction: string;
  severity: 'high' | 'medium' | 'low';
};

const ConflictsPage = () => {
  // Sample conflicts data
  const conflicts: Conflict[] = [
    {
      id: 'conflict-1',
      product: {
        id: 'prod-1',
        name: 'Auricular Bluetooth Sony WH-1000XM4',
        sku: 'SONY-WH1000XM4',
        category: 'Electrónica > Audio > Auriculares'
      },
      primaryRule: {
        id: 'rule-1',
        type: 'URSEC',
        criteria: 'SKU',
        action: 'Excluir'
      },
      conflictingRules: [
        {
          id: 'rule-2',
          type: 'Whitelist',
          criteria: 'Categoría',
          action: 'Incluir'
        }
      ],
      systemAction: 'Excluido (prevalece regla URSEC por SKU)',
      severity: 'high'
    },
    {
      id: 'conflict-2',
      product: {
        id: 'prod-2',
        name: 'Smartphone Samsung Galaxy S21',
        sku: 'SAM-GALAXY-S21',
        category: 'Electrónica > Celulares > Smartphones'
      },
      primaryRule: {
        id: 'rule-3',
        type: 'Blacklist',
        criteria: 'Keyword',
        action: 'Excluir'
      },
      conflictingRules: [
        {
          id: 'rule-4',
          type: 'Whitelist',
          criteria: 'Categoría',
          action: 'Incluir'
        }
      ],
      systemAction: 'Excluido (prevalece regla Blacklist por Keyword)',
      severity: 'medium'
    },
    {
      id: 'conflict-3',
      product: {
        id: 'prod-3',
        name: 'Laptop Apple MacBook Pro',
        sku: 'APPLE-MACBOOK-PRO',
        category: 'Electrónica > Computación > Laptops'
      },
      primaryRule: {
        id: 'rule-5',
        type: 'URSEC',
        criteria: 'Categoría',
        action: 'Incluir'
      },
      conflictingRules: [
        {
          id: 'rule-6',
          type: 'Blacklist',
          criteria: 'KeyCat',
          action: 'Excluir'
        }
      ],
      systemAction: 'Incluido (prevalece regla URSEC)',
      severity: 'low'
    }
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Gestión de Conflictos</h1>
        <Button variant="outline">
          <span className="mr-2">🔄</span>
          Actualizar conflictos
        </Button>
      </div>

      {/* Summary */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">{conflicts.filter(c => c.severity === 'high').length}</div>
                <div className="text-sm text-gray-500">Conflictos críticos</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-amber-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">{conflicts.filter(c => c.severity === 'medium').length}</div>
                <div className="text-sm text-gray-500">Conflictos medios</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">{conflicts.filter(c => c.severity === 'low').length}</div>
                <div className="text-sm text-gray-500">Conflictos menores</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conflicts List */}
      <div className="space-y-6">
        {conflicts.map((conflict) => (
          <Card key={conflict.id} className={`overflow-hidden border-l-4 ${
            conflict.severity === 'high' ? 'border-l-red-500' :
            conflict.severity === 'medium' ? 'border-l-amber-500' :
            'border-l-blue-500'
          }`}>
            <CardHeader className="bg-gray-50 py-4 px-6">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                  <Badge className={`mr-3 ${
                    conflict.severity === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                    conflict.severity === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                    'bg-blue-100 text-blue-800 hover:bg-blue-100'
                  }`}>
                    {conflict.severity === 'high' ? 'Crítico' :
                     conflict.severity === 'medium' ? 'Medio' : 'Menor'}
                  </Badge>
                  <h3 className="font-medium">{conflict.product.name}</h3>
                </div>
                <div className="text-sm text-gray-500">
                  SKU: {conflict.product.sku}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Primary Rule */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Regla de mayor prioridad</h4>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <PriorityBadge
                        criteria={conflict.primaryRule.criteria}
                        priority={
                          conflict.primaryRule.criteria === 'SKU' ? 'high' :
                          conflict.primaryRule.criteria === 'Keyword' ? 'medium' : 'low'
                        }
                      />
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        conflict.primaryRule.type === 'URSEC' ? 'bg-purple-100 text-purple-800' :
                        conflict.primaryRule.type === 'Blacklist' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {conflict.primaryRule.type}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                        conflict.primaryRule.action === 'Incluir' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {conflict.primaryRule.action}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Link to={`/rules/edit/${conflict.primaryRule.id}`} className="text-xs text-am-purple hover:underline">
                        Ver regla
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Conflicting Rules */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Reglas en conflicto</h4>
                  <div className="space-y-2">
                    {conflict.conflictingRules.map(rule => (
                      <div key={rule.id} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <PriorityBadge
                            criteria={rule.criteria}
                            priority={
                              rule.criteria === 'SKU' ? 'high' :
                              rule.criteria === 'Keyword' ? 'medium' : 'low'
                            }
                          />
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            rule.type === 'URSEC' ? 'bg-purple-100 text-purple-800' :
                            rule.type === 'Blacklist' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rule.type}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                            rule.action === 'Incluir' ? 'bg-green-100 text-green-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {rule.action}
                          </span>
                        </div>
                        <div className="mt-2">
                          <Link to={`/rules/edit/${rule.id}`} className="text-xs text-am-purple hover:underline">
                            Ver regla
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Action */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Acción del sistema</h4>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm">{conflict.systemAction}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <Button size="sm" variant="outline">Resolver</Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50">
                        Ignorar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConflictsPage;
