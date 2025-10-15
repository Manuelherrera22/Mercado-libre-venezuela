'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter
} from 'lucide-react'
import { formatPrice, formatNumber } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Verificar si es admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">
            No tienes permisos para acceder a esta página
          </p>
          <Button onClick={() => router.push('/')}>
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  // Datos de ejemplo
  const stats = [
    {
      title: 'Ventas Totales',
      value: '$45,890',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Productos',
      value: '1,234',
      change: '+8.2%',
      icon: Package,
      color: 'text-blue-500'
    },
    {
      title: 'Usuarios',
      value: '5,678',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      title: 'Pedidos',
      value: '892',
      change: '+23.1%',
      icon: ShoppingBag,
      color: 'text-orange-500'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      product: 'iPhone 15 Pro',
      amount: 899,
      status: 'delivered',
      date: '2024-01-25'
    },
    {
      id: 'ORD-002',
      customer: 'María González',
      product: 'MacBook Pro',
      amount: 1899,
      status: 'shipped',
      date: '2024-01-24'
    },
    {
      id: 'ORD-003',
      customer: 'Carlos Rodríguez',
      product: 'Samsung Galaxy',
      amount: 1099,
      status: 'processing',
      date: '2024-01-23'
    }
  ]

  const recentProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 899,
      stock: 15,
      sales: 234,
      status: 'active'
    },
    {
      id: '2',
      name: 'MacBook Pro M3',
      price: 1899,
      stock: 8,
      sales: 156,
      status: 'active'
    },
    {
      id: '3',
      name: 'Samsung Galaxy S24',
      price: 1099,
      stock: 0,
      sales: 189,
      status: 'out_of_stock'
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      processing: { label: 'Procesando', variant: 'secondary' },
      shipped: { label: 'En Camino', variant: 'default' },
      delivered: { label: 'Entregado', variant: 'outline' },
      active: { label: 'Activo', variant: 'default' },
      out_of_stock: { label: 'Sin Stock', variant: 'destructive' }
    }
    const statusInfo = statusMap[status]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">
              Gestiona tu plataforma de compra y venta
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pedidos
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Usuarios
              </button>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-secondary`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <Badge variant="secondary" className="text-green-500">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ventas del Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <BarChart3 className="h-12 w-12" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Productos Más Vendidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <Package className="h-12 w-12" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Cliente</th>
                          <th className="text-left py-3 px-4 font-medium">Producto</th>
                          <th className="text-left py-3 px-4 font-medium">Monto</th>
                          <th className="text-left py-3 px-4 font-medium">Estado</th>
                          <th className="text-left py-3 px-4 font-medium">Fecha</th>
                          <th className="text-left py-3 px-4 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-secondary/50">
                            <td className="py-3 px-4">{order.id}</td>
                            <td className="py-3 px-4">{order.customer}</td>
                            <td className="py-3 px-4">{order.product}</td>
                            <td className="py-3 px-4 font-semibold">{formatPrice(order.amount)}</td>
                            <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('es-VE')}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Producto
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Productos</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtrar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Producto</th>
                          <th className="text-left py-3 px-4 font-medium">Precio</th>
                          <th className="text-left py-3 px-4 font-medium">Stock</th>
                          <th className="text-left py-3 px-4 font-medium">Ventas</th>
                          <th className="text-left py-3 px-4 font-medium">Estado</th>
                          <th className="text-left py-3 px-4 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProducts.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-secondary/50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-secondary" />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-semibold">{formatPrice(product.price)}</td>
                            <td className="py-3 px-4">{product.stock}</td>
                            <td className="py-3 px-4">{formatNumber(product.sales)}</td>
                            <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Contenido de gestión de pedidos...</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Contenido de gestión de usuarios...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

