'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Eye,
  ShoppingCart,
  Star,
  Users,
  ArrowUp,
  ArrowDown,
  Plus
} from 'lucide-react'
import { formatPrice, formatNumber } from '@/lib/utils'
import Link from 'next/link'

export default function SellerDashboard() {
  // Datos de ejemplo
  const stats = [
    {
      title: 'Ventas Totales',
      value: '$12,450',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Productos',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'text-blue-500'
    },
    {
      title: 'Vistas',
      value: '1,234',
      change: '+28.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-purple-500'
    },
    {
      title: 'Conversión',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-orange-500'
    }
  ]

  const recentProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      views: 234,
      sales: 12,
      revenue: 10788,
      status: 'active'
    },
    {
      id: '2',
      name: 'MacBook Pro M3',
      views: 189,
      sales: 8,
      revenue: 15192,
      status: 'active'
    },
    {
      id: '3',
      name: 'Samsung Galaxy S24',
      views: 156,
      sales: 5,
      revenue: 5495,
      status: 'active'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      product: 'iPhone 15 Pro',
      amount: 899,
      status: 'processing',
      date: '2024-01-25'
    },
    {
      id: 'ORD-002',
      customer: 'María González',
      product: 'MacBook Pro',
      amount: 1899,
      status: 'shipped',
      date: '2024-01-24'
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      processing: { label: 'Procesando', variant: 'secondary' },
      shipped: { label: 'Enviado', variant: 'default' },
      delivered: { label: 'Entregado', variant: 'outline' },
      active: { label: 'Activo', variant: 'default' }
    }
    const statusInfo = statusMap[status]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard de Vendedor</h1>
                <p className="text-muted-foreground">
                  Gestiona tus productos y ventas
                </p>
              </div>
              <Link href="/sell">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Producto
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-secondary`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Productos */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Productos Recientes</CardTitle>
                    <Link href="/products">
                      <Button variant="ghost" size="sm">
                        Ver todos
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{product.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {product.views} vistas
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingCart className="h-4 w-4" />
                              {product.sales} ventas
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary mb-1">
                            {formatPrice(product.revenue)}
                          </p>
                          {getStatusBadge(product.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pedidos Recientes */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm">#{order.id}</p>
                            <p className="text-xs text-muted-foreground">{order.customer}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm mb-2">{order.product}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('es-VE')}
                          </span>
                          <span className="font-semibold text-primary">
                            {formatPrice(order.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Tasa de conversión</span>
                      <span className="text-sm font-semibold text-green-500">+2.3%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Productos activos</span>
                      <span className="text-sm font-semibold">24/30</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/sell">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Producto
                  </Button>
                </Link>
                <Link href="/seller/products">
                  <Button variant="outline" className="w-full">
                    <Package className="mr-2 h-4 w-4" />
                    Mis Productos
                  </Button>
                </Link>
                <Link href="/seller/orders">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </Button>
                </Link>
                <Link href="/seller/analytics">
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

