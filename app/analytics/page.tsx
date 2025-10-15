'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye,
  Package,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [analyticsData, setAnalyticsData] = useState({
    revenue: { current: 45280, previous: 38950, change: 16.2 },
    orders: { current: 1247, previous: 1089, change: 14.5 },
    customers: { current: 3421, previous: 2987, change: 14.5 },
    conversion: { current: 3.24, previous: 2.89, change: 12.1 },
    avgOrder: { current: 36.28, previous: 35.76, change: 1.5 },
    visitors: { current: 38492, previous: 37667, change: 2.2 }
  })

  const topProducts = [
    { id: 1, name: 'Smartphone 5G 128GB', sales: 234, revenue: 35100, growth: 23 },
    { id: 2, name: 'Laptop Gaming 16GB', sales: 156, revenue: 124800, growth: 18 },
    { id: 3, name: 'Wireless Headphones', sales: 342, revenue: 15390, growth: 31 },
    { id: 4, name: 'Smart Watch', sales: 189, revenue: 14175, growth: 15 },
    { id: 5, name: 'Tablet 10" 64GB', sales: 98, revenue: 19600, growth: 8 }
  ]

  const topCategories = [
    { name: 'Electronics', sales: 1247, revenue: 124700, percentage: 35 },
    { name: 'Computers', sales: 856, revenue: 256800, percentage: 24 },
    { name: 'Audio', sales: 678, revenue: 30510, percentage: 19 },
    { name: 'Wearables', sales: 543, revenue: 40725, percentage: 15 },
    { name: 'Accessories', sales: 432, revenue: 17280, percentage: 12 }
  ]

  const salesData = [
    { day: 'Mon', sales: 5200 },
    { day: 'Tue', sales: 6800 },
    { day: 'Wed', sales: 5400 },
    { day: 'Thu', sales: 7200 },
    { day: 'Fri', sales: 8900 },
    { day: 'Sat', sales: 10200 },
    { day: 'Sun', sales: 9600 }
  ]

  const trafficSources = [
    { source: 'Direct', visitors: 15234, percentage: 39.6, trend: 'up' },
    { source: 'Organic Search', visitors: 11543, percentage: 30.0, trend: 'up' },
    { source: 'Social Media', visitors: 7689, percentage: 20.0, trend: 'down' },
    { source: 'Email', visitors: 2845, percentage: 7.4, trend: 'up' },
    { source: 'Referral', visitors: 1181, percentage: 3.0, trend: 'stable' }
  ]

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-1">
            {change >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Monitorea el rendimiento de tu negocio en tiempo real
                </p>
              </div>
              <div className="flex gap-2">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Revenue Total"
              value={`$${analyticsData.revenue.current.toLocaleString()}`}
              change={analyticsData.revenue.change}
              icon={DollarSign}
              trend="up"
            />
            <StatCard
              title="Órdenes"
              value={analyticsData.orders.current}
              change={analyticsData.orders.change}
              icon={ShoppingCart}
              trend="up"
            />
            <StatCard
              title="Clientes"
              value={analyticsData.customers.current}
              change={analyticsData.customers.change}
              icon={Users}
              trend="up"
            />
            <StatCard
              title="Tasa de Conversión"
              value={`${analyticsData.conversion.current}%`}
              change={analyticsData.conversion.change}
              icon={Target}
              trend="up"
            />
            <StatCard
              title="Orden Promedio"
              value={`$${analyticsData.avgOrder.current}`}
              change={analyticsData.avgOrder.change}
              icon={Package}
              trend="up"
            />
            <StatCard
              title="Visitantes"
              value={analyticsData.visitors.current}
              change={analyticsData.visitors.change}
              icon={Eye}
              trend="up"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Ventas Diarias
                </CardTitle>
                <CardDescription>Últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {salesData.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(day.sales / 12000) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                      <span className="text-xs font-semibold">${day.sales}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Ventas por Categoría
                </CardTitle>
                <CardDescription>Distribución de ingresos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm font-semibold">${category.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{category.sales} ventas</span>
                        <span className="text-xs text-muted-foreground">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Productos Top
              </CardTitle>
              <CardDescription>Los productos más vendidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Producto</th>
                      <th className="text-right py-3 px-4 font-semibold">Ventas</th>
                      <th className="text-right py-3 px-4 font-semibold">Revenue</th>
                      <th className="text-right py-3 px-4 font-semibold">Crecimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="text-right py-3 px-4">{product.sales}</td>
                        <td className="text-right py-3 px-4 font-semibold">${product.revenue.toLocaleString()}</td>
                        <td className="text-right py-3 px-4">
                          <Badge variant="secondary" className="text-green-500">
                            +{product.growth}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Fuentes de Tráfico
              </CardTitle>
              <CardDescription>Origen de tus visitantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{source.source}</span>
                        {source.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {source.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitantes</span>
                        <span className="text-sm font-semibold">{source.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

