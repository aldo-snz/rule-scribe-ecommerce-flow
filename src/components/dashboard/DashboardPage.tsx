
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from './StatCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const DashboardPage = () => {
  // Sample data for charts
  const productTrendData = [
    { name: '01 May', products: 220 },
    { name: '02 May', products: 240 },
    { name: '03 May', products: 235 },
    { name: '04 May', products: 260 },
    { name: '05 May', products: 290 },
    { name: '06 May', products: 275 },
    { name: '07 May', products: 285 }
  ];
  
  const ruleTypeData = [
    { name: 'URSEC', value: 18 },
    { name: 'Blacklist', value: 24 },
    { name: 'Whitelist', value: 12 }
  ];
  
  const COLORS = ['#9b87f5', '#ea384c', '#1EAEDB'];
  
  // Sample recent activity data
  const recentChanges = [
    { type: 'Edit', rule: 'Blacklist: SKU-001', user: 'Carlos M.', time: '15 minutos' },
    { type: 'Create', rule: 'Whitelist: Electrónica > Audio', user: 'Maria P.', time: '1 hora' },
    { type: 'Conflict', rule: 'URSEC: Regla #15', user: 'Sistema', time: '3 horas' },
    { type: 'Create', rule: 'Blacklist: "audifonos rotos"', user: 'Juan S.', time: '1 día' },
    { type: 'Edit', rule: 'URSEC: Categoría Importados', user: 'Ana L.', time: '2 días' }
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Última actualización: 15 May, 2025 - 10:45 AM
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total de Productos Afectados"
          value="15,245"
          description="32% del catálogo total"
          trend={{ value: 5, isPositive: true }}
          icon={<span className="text-2xl">📦</span>}
        />
        <StatCard
          title="Reglas Activas"
          value="54"
          description="12 creadas este mes"
          trend={{ value: 8, isPositive: true }}
          icon={<span className="text-2xl">📝</span>}
        />
        <StatCard
          title="Conflictos Detectados"
          value="3"
          description="Requieren revisión"
          icon={<span className="text-2xl">⚠️</span>}
        />
        <StatCard
          title="Última Simulación"
          value="2,145"
          description="Productos potencialmente afectados"
          icon={<span className="text-2xl">🧪</span>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Evolución diaria de productos afectados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="products" 
                    stroke="#9b87f5" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reglas por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ruleTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ruleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4">Acción</th>
                  <th className="pb-2 px-4">Regla</th>
                  <th className="pb-2 px-4">Usuario</th>
                  <th className="pb-2 pl-4">Hace</th>
                </tr>
              </thead>
              <tbody>
                {recentChanges.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                        item.type === 'Edit' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'Create' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.rule}</td>
                    <td className="py-3 px-4">{item.user}</td>
                    <td className="py-3 pl-4 text-gray-500">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
