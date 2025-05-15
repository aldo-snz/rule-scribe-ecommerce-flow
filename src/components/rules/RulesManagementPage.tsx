
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PriorityBadge from '../ui/PriorityBadge';

type Rule = {
  id: string;
  type: 'URSEC' | 'Blacklist' | 'Whitelist';
  criteria: 'SKU' | 'Keyword' | 'Categoría' | 'KeyCat';
  action: 'Incluir' | 'Excluir';
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  description: string;
};

const RulesManagementPage = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    criteria: 'all',
    search: ''
  });

  // Sample data for rules
  const rules: Rule[] = [
    {
      id: '1',
      type: 'URSEC',
      criteria: 'SKU',
      action: 'Excluir',
      priority: 'high',
      status: 'active',
      createdAt: '2025-05-10',
      updatedAt: '2025-05-10',
      description: '15 SKUs de equipos importados sin certificación'
    },
    {
      id: '2',
      type: 'Blacklist',
      criteria: 'Keyword',
      action: 'Excluir',
      priority: 'medium',
      status: 'active',
      createdAt: '2025-05-09',
      updatedAt: '2025-05-12',
      description: 'Productos con keyword "defectuoso"'
    },
    {
      id: '3',
      type: 'Whitelist',
      criteria: 'Categoría',
      action: 'Incluir',
      priority: 'low',
      status: 'active',
      createdAt: '2025-05-08',
      updatedAt: '2025-05-08',
      description: 'Inclusión de productos de Electrónica > Audio'
    },
    {
      id: '4',
      type: 'Blacklist',
      criteria: 'KeyCat',
      action: 'Excluir',
      priority: 'medium',
      status: 'inactive',
      createdAt: '2025-05-07',
      updatedAt: '2025-05-11',
      description: 'Categoría Electrónica con keyword "refurbished"'
    },
    {
      id: '5',
      type: 'URSEC',
      criteria: 'Categoría',
      action: 'Incluir',
      priority: 'low',
      status: 'active',
      createdAt: '2025-05-06',
      updatedAt: '2025-05-06',
      description: 'Electrónica > Telecomunicaciones'
    }
  ];

  // Filter the rules based on the selected filters
  const filteredRules = rules.filter(rule => {
    return (
      (filters.type === 'all' || rule.type === filters.type) &&
      (filters.status === 'all' || 
        (filters.status === 'active' && rule.status === 'active') ||
        (filters.status === 'inactive' && rule.status === 'inactive')) &&
      (filters.criteria === 'all' || rule.criteria === filters.criteria) &&
      (filters.search === '' || 
        rule.description.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Gestión de Reglas</h1>
        <Link to="/rules/create">
          <Button className="bg-am-purple hover:bg-am-purple-dark">
            <span className="mr-2">➕</span>
            Crear nueva regla
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-medium mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Tipo de regla</label>
            <Select 
              value={filters.type} 
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="URSEC">URSEC</SelectItem>
                <SelectItem value="Blacklist">Blacklist</SelectItem>
                <SelectItem value="Whitelist">Whitelist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Estado</label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Criterio</label>
            <Select 
              value={filters.criteria} 
              onValueChange={(value) => handleFilterChange('criteria', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los criterios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los criterios</SelectItem>
                <SelectItem value="SKU">SKU</SelectItem>
                <SelectItem value="Keyword">Keyword</SelectItem>
                <SelectItem value="Categoría">Categoría</SelectItem>
                <SelectItem value="KeyCat">KeyCat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Buscar</label>
            <Input
              type="text"
              placeholder="Buscar por descripción..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Criterio</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actualizado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRules.length > 0 ? (
                filteredRules.map((rule) => (
                  <tr 
                    key={rule.id} 
                    className={`hover:bg-gray-50 ${
                      rule.criteria === 'SKU' ? 'rule-priority-sku' :
                      rule.criteria === 'Keyword' ? 'rule-priority-keyword' :
                      'rule-priority-category'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        rule.type === 'URSEC' ? 'bg-purple-100 text-purple-800' :
                        rule.type === 'Blacklist' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rule.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PriorityBadge 
                        criteria={rule.criteria} 
                        priority={rule.priority} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        rule.action === 'Incluir' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {rule.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{rule.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-${rule.status} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`}>
                        {rule.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/rules/edit/${rule.id}`} 
                          className="text-am-purple hover:text-am-purple-dark"
                        >
                          Editar
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron reglas con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RulesManagementPage;
