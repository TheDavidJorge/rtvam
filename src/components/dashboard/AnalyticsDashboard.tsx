import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Globe,
  Calendar,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock data for analytics
  const statsData = {
    totalViews: 125430,
    uniqueVisitors: 85620,
    avgSessionTime: '3:45',
    bounceRate: '32%',
    topPages: [
      { page: 'Homepage', views: 45230, percentage: 36 },
      { page: 'Notícias', views: 32140, percentage: 26 },
      { page: 'Programação', views: 18560, percentage: 15 },
      { page: 'Radio', views: 15890, percentage: 13 },
      { page: 'TV Direto', views: 13610, percentage: 10 }
    ],
    devices: [
      { name: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
      { name: 'Mobile', value: 35, color: 'hsl(var(--secondary))' },
      { name: 'Tablet', value: 20, color: 'hsl(var(--accent))' }
    ],
    weeklyData: [
      { day: 'Seg', views: 4200, visitors: 3100 },
      { day: 'Ter', views: 5100, visitors: 3800 },
      { day: 'Qua', views: 4800, visitors: 3600 },
      { day: 'Qui', views: 6200, visitors: 4500 },
      { day: 'Sex', views: 7800, visitors: 5200 },
      { day: 'Sáb', views: 6500, visitors: 4800 },
      { day: 'Dom', views: 5400, visitors: 4100 }
    ],
    hourlyData: [
      { hour: '00:00', views: 120 },
      { hour: '02:00', views: 80 },
      { hour: '04:00', views: 60 },
      { hour: '06:00', views: 180 },
      { hour: '08:00', views: 350 },
      { hour: '10:00', views: 480 },
      { hour: '12:00', views: 620 },
      { hour: '14:00', views: 580 },
      { hour: '16:00', views: 450 },
      { hour: '18:00', views: 680 },
      { hour: '20:00', views: 720 },
      { hour: '22:00', views: 420 }
    ]
  };

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting analytics data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Estatísticas detalhadas do site</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Último dia</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData} className="btn-ghost">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{statsData.totalViews.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+12.5% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{statsData.uniqueVisitors.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+8.2% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Sessão</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{statsData.avgSessionTime}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+5.1% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{statsData.bounceRate}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-red-600 mr-1 rotate-180" />
              <span className="text-xs text-green-600">-2.3% vs período anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Tráfego Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statsData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Visualizações"
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Visitantes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Distribuição por Dispositivo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statsData.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statsData.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statsData.devices.map((device, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: device.color }}
                  />
                  <span className="text-sm">{device.name}: {device.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Traffic */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle>Tráfego por Hora do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Bar 
                dataKey="views" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Visualizações"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle>Páginas Mais Visitadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statsData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border/30 rounded-[var(--radius)]">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    #{index + 1}
                  </Badge>
                  <div>
                    <div className="font-medium">{page.page}</div>
                    <div className="text-sm text-muted-foreground">
                      {page.views.toLocaleString()} visualizações
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {page.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;