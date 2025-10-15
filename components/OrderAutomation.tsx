'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import { 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Package,
  Truck,
  CreditCard,
  Bot,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Activity,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Calendar,
  Filter,
  Download
} from 'lucide-react'

interface AutomatedOrder {
  id: string
  customer: string
  product: string
  supplier: string
  status: 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'failed'
  amount: number
  profit: number
  createdAt: string
  estimatedDelivery: string
  trackingNumber?: string
  autoProcessed: boolean
}

interface AutomationRule {
  id: string
  name: string
  condition: string
  action: string
  active: boolean
  ordersProcessed: number
  successRate: number
}

interface SupplierStatus {
  id: string
  name: string
  status: 'online' | 'offline' | 'maintenance'
  responseTime: number
  lastSync: string
  ordersToday: number
}

export function OrderAutomation() {
  const [loading, setLoading] = useState(false)
  const [autoProcessing, setAutoProcessing] = useState(true)
  const [orders, setOrders] = useState<AutomatedOrder[]>([])
  const [rules, setRules] = useState<AutomationRule[]>([])
  const [suppliers, setSuppliers] = useState<SupplierStatus[]>([])

  // Mock data
  const mockOrders: AutomatedOrder[] = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      product: 'iPhone 15 Pro Max',
      supplier: 'TechSupplier China',
      status: 'processing',
      amount: 899,
      profit: 180,
      createdAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-25',
      trackingNumber: 'TRK123456789',
      autoProcessed: true
    },
    {
      id: 'ORD-002',
      customer: 'María González',
      product: 'MacBook Pro M3',
      supplier: 'Apple Direct',
      status: 'confirmed',
      amount: 1899,
      profit: 380,
      createdAt: '2024-01-15T11:45:00Z',
      estimatedDelivery: '2024-01-28',
      autoProcessed: true
    },
    {
      id: 'ORD-003',
      customer: 'Carlos Rodríguez',
      product: 'Samsung Galaxy S24',
      supplier: 'MobileWorld China',
      status: 'pending',
      amount: 699,
      profit: 140,
      createdAt: '2024-01-15T14:20:00Z',
      estimatedDelivery: '2024-01-30',
      autoProcessed: false
    }
  ]

  const mockRules: AutomationRule[] = [
    {
      id: '1',
      name: 'Auto-confirmar órdenes < $100',
      condition: 'order_amount < 100 AND payment_status = "paid"',
      action: 'auto_confirm_order',
      active: true,
      ordersProcessed: 45,
      successRate: 98.5
    },
    {
      id: '2',
      name: 'Notificar vendedor órdenes > $500',
      condition: 'order_amount > 500',
      action: 'notify_seller',
      active: true,
      ordersProcessed: 12,
      successRate: 100
    },
    {
      id: '3',
      name: 'Auto-rechazar órdenes sin stock',
      condition: 'product_stock = 0',
      action: 'auto_reject_order',
      active: true,
      ordersProcessed: 8,
      successRate: 100
    }
  ]

  const mockSuppliers: SupplierStatus[] = [
    {
      id: '1',
      name: 'TechSupplier China',
      status: 'online',
      responseTime: 2.3,
      lastSync: '2 minutes ago',
      ordersToday: 23
    },
    {
      id: '2',
      name: 'Apple Direct',
      status: 'online',
      responseTime: 1.1,
      lastSync: '1 minute ago',
      ordersToday: 8
    },
    {
      id: '3',
      name: 'MobileWorld China',
      status: 'maintenance',
      responseTime: 15.2,
      lastSync: '2 hours ago',
      ordersToday: 5
    }
  ]

  useEffect(() => {
    setOrders(mockOrders)
    setRules(mockRules)
    setSuppliers(mockSuppliers)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10'
      case 'processing': return 'text-blue-500 bg-blue-500/10'
      case 'confirmed': return 'text-green-500 bg-green-500/10'
      case 'shipped': return 'text-purple-500 bg-purple-500/10'
      case 'delivered': return 'text-emerald-500 bg-emerald-500/10'
      case 'failed': return 'text-red-500 bg-red-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'processing': return <Package className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'shipped': return <Truck className="h-4 w-4" />
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getSupplierStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500 bg-green-500/10'
      case 'offline': return 'text-red-500 bg-red-500/10'
      case 'maintenance': return 'text-yellow-500 bg-yellow-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const processOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'processing', autoProcessed: true }
        : order
    ))
  }

  const syncAllSuppliers = async () => {
    setLoading(true)
    try {
      // Simulate sync
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Sincronización completada')
    } catch (error) {
      toast.error('Error en sincronización')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              Order Automation
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoProcessing(!autoProcessing)}
                className={autoProcessing ? 'bg-green-500/10 border-green-500' : ''}
              >
                {autoProcessing ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar Auto
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activar Auto
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={syncAllSuppliers}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Órdenes Hoy</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Processadas</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.autoProcessed).length}
                </p>
              </div>
              <Bot className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + order.amount, 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit</p>
                <p className="text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + order.profit, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Estado de Proveedores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{supplier.name}</h4>
                  <Badge className={getSupplierStatusColor(supplier.status)}>
                    {supplier.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span>{supplier.responseTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync:</span>
                    <span>{supplier.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Orders Today:</span>
                    <span>{supplier.ordersToday}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Reglas de Automatización
            </CardTitle>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{rule.name}</h4>
                    {rule.active && (
                      <Badge className="bg-green-500">Activa</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {rule.condition} → {rule.action}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{rule.ordersProcessed} órdenes procesadas</span>
                    <span>{rule.successRate}% éxito</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Órdenes Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">#{order.id}</h4>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                    {order.autoProcessed && (
                      <Badge className="bg-green-500">
                        <Bot className="h-3 w-3 mr-1" />
                        Auto
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cliente:</span>
                      <p className="font-medium">{order.customer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Producto:</span>
                      <p className="font-medium">{order.product}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Proveedor:</span>
                      <p className="font-medium">{order.supplier}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Entrega:</span>
                      <p className="font-medium">{order.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${order.amount}</p>
                  <p className="text-sm text-green-500">+${order.profit} profit</p>
                  {order.status === 'pending' && (
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={() => processOrder(order.id)}
                    >
                      Procesar
                    </Button>
                  )}
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
              <Package className="h-4 w-4 mr-2" />
              Procesar Todas
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Órdenes
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Programar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
