'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye,
  Users,
  Target,
  Brain,
  Zap,
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Star,
  Award,
  Clock,
  Globe
} from 'lucide-react'

interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: React.ElementType
  color: string
}

interface SalesPrediction {
  date: string
  predicted: number
  actual?: number
  confidence: number
}

interface ProductPerformance {
  id: string
  name: string
  sales: number
  revenue: number
  views: number
  conversion: number
  trend: 'up' | 'down' | 'stable'
  roi: number
}

interface MarketOpportunity {
  category: string
  demand: number
  competition: number
  profit: number
  trend: 'rising' | 'falling' | 'stable'
  recommendation: string
}

interface AIInsight {
  type: 'opportunity' | 'warning' | 'success' | 'tip'
  title: string
  description: string
  action?: string
  priority: 'high' | 'medium' | 'low'
}

export function AdvancedAnalytics() {
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [predictions, setPredictions] = useState<SalesPrediction[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])

  // Mock data
  const metrics: MetricCard[] = [
    {
      title: 'Revenue Total',
      value: '$24,567',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Productos Vendidos',
      value: 1247,
      change: -3.2,
      trend: 'down',
      icon: ShoppingCart,
      color: 'text-blue-500'
    },
    {
      title: 'Vistas de Productos',
      value: 45892,
      change: 8.7,
      trend: 'up',
      icon: Eye,
      color: 'text-purple-500'
    },
    {
      title: 'Tasa de Conversión',
      value: '2.7%',
      change: 0.8,
      trend: 'up',
      icon: Target,
      color: 'text-orange-500'
    },
    {
      title: 'Clientes Únicos',
      value: 3456,
      change: 15.3,
      trend: 'up',
      icon: Users,
      color: 'text-pink-500'
    },
    {
      title: 'ROI Promedio',
      value: '187%',
      change: 22.1,
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-500'
    }
  ]

  const topProducts: ProductPerformance[] = [
    {
      id: '1',
      name: 'Wireless Charging Pad',
      sales: 156,
      revenue: 4680,
      views: 2340,
      conversion: 6.7,
      trend: 'up',
      roi: 245
    },
    {
      id: '2',
      name: 'Bluetooth Headphones',
      sales: 89,
      revenue: 8900,
      views: 1200,
      conversion: 7.4,
      trend: 'up',
      roi: 198
    },
    {
      id: '3',
      name: 'Smart Watch',
      sales: 67,
      revenue: 10720,
      views: 890,
      conversion: 7.5,
      trend: 'stable',
      roi: 156
    }
  ]

  const opportunities: MarketOpportunity[] = [
    {
      category: 'Smart Home',
      demand: 85,
      competition: 45,
      profit: 78,
      trend: 'rising',
      recommendation: 'Aumentar inventario en 40%'
    },
    {
      category: 'Fitness Wearables',
      demand: 72,
      competition: 65,
      profit: 82,
      trend: 'rising',
      recommendation: 'Optimizar precios para competir'
    },
    {
      category: 'Phone Accessories',
      demand: 90,
      competition: 80,
      profit: 65,
      trend: 'stable',
      recommendation: 'Enfocar en productos premium'
    }
  ]

  const aiInsights: AIInsight[] = [
    {
      type: 'opportunity',
      title: 'Oportunidad de Mercado Detectada',
      description: 'Los smartwatches fitness tienen una demanda creciente del 35% con baja competencia.',
      action: 'Agregar 5 productos nuevos',
      priority: 'high'
    },
    {
      type: 'warning',
      title: 'Producto en Declive',
      description: 'Las fundas de teléfono básicas muestran una tendencia descendente del 12%.',
      action: 'Reducir inventario',
      priority: 'medium'
    },
    {
      type: 'success',
      title: 'Optimización Exitosa',
      description: 'Los precios dinámicos aumentaron las ventas un 18% en la última semana.',
      priority: 'low'
    },
    {
      type: 'tip',
      title: 'Mejora de Conversión',
      description: 'Agregar videos de producto podría aumentar las conversiones un 15%.',
      action: 'Implementar videos',
      priority: 'medium'
    }
  ]

  // Mock sales predictions
  const salesPredictions: SalesPrediction[] = [
    { date: '2024-01-16', predicted: 850, confidence: 87 },
    { date: '2024-01-17', predicted: 920, confidence: 89 },
    { date: '2024-01-18', predicted: 1100, confidence: 91 },
    { date: '2024-01-19', predicted: 1050, confidence: 85 },
    { date: '2024-01-20', predicted: 1200, confidence: 88 }
  ]

  useEffect(() => {
    setPredictions(salesPredictions)
    setInsights(aiInsights)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-green-500" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'success': return <CheckCircle className="h-5 w-5 text-blue-500" />
      case 'tip': return <Star className="h-5 w-5 text-purple-500" />
      default: return <Brain className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-500" />
              Analytics Predictivos IA
            </CardTitle>
            <div className="flex items-center gap-2">
              <select 
                className="px-3 py-1 border rounded-md bg-background text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <metric.icon className={`h-8 w-8 ${metric.color} mb-2`} />
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-500' : 
                    metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {getTrendIcon(metric.trend)}
                    <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Insights de IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg ${getPriorityColor(insight.priority)}`}
              >
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{insight.description}</p>
                    {insight.action && (
                      <Button size="sm" variant="outline" className="text-xs">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Predictions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Predicción de Ventas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-semibold">{prediction.date}</div>
                    <div className="text-sm text-muted-foreground">
                      Predicción de ventas
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      {prediction.predicted}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-muted-foreground">
                        {prediction.confidence}% confianza
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Oportunidades de Mercado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{opportunity.category}</h4>
                    <Badge variant="outline" className={
                      opportunity.trend === 'rising' ? 'text-green-500' : 'text-gray-500'
                    }>
                      {opportunity.trend === 'rising' ? 'En Crecimiento' : 'Estable'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-500">
                        {opportunity.demand}%
                      </div>
                      <div className="text-xs text-muted-foreground">Demanda</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-500">
                        {opportunity.competition}%
                      </div>
                      <div className="text-xs text-muted-foreground">Competencia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-500">
                        {opportunity.profit}%
                      </div>
                      <div className="text-xs text-muted-foreground">Rentabilidad</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {opportunity.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Productos Top
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{product.sales} ventas</span>
                      <span>{product.views} vistas</span>
                      <span>{product.conversion}% conversión</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">${product.revenue.toLocaleString()}</div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(product.trend)}
                    <span className="text-sm text-green-500">
                      {product.roi}% ROI
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Datos
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Programar Reporte
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Comparar Mercados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
