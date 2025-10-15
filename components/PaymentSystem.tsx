'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bot,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Activity,
  Target,
  BarChart3,
  Zap,
  Wallet,
  Banknote,
  Percent,
  Calculator,
  Calendar,
  Filter,
  Download
} from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  type: 'credit_card' | 'bank_transfer' | 'crypto' | 'mobile_payment' | 'zelle'
  fee: number
  processingTime: string
  status: 'active' | 'inactive' | 'maintenance'
  transactionsToday: number
  volumeToday: number
}

interface CommissionTier {
  id: string
  name: string
  minVolume: number
  maxVolume: number
  commissionRate: number
  color: string
  benefits: string[]
}

interface PaymentTransaction {
  id: string
  orderId: string
  customer: string
  amount: number
  method: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  commission: number
  profit: number
  createdAt: string
  processedAt?: string
  autoProcessed: boolean
}

interface PaymentStats {
  totalVolume: number
  transactionsCount: number
  averageCommission: number
  totalProfit: number
  successRate: number
  autoProcessedRate: number
}

export function PaymentSystem() {
  const [loading, setLoading] = useState(false)
  const [autoProcessing, setAutoProcessing] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([])
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [selectedTier, setSelectedTier] = useState('gold')

  // Mock data
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      name: 'Visa/Mastercard',
      type: 'credit_card',
      fee: 2.9,
      processingTime: '1-2 días',
      status: 'active',
      transactionsToday: 45,
      volumeToday: 12500
    },
    {
      id: '2',
      name: 'Transferencia Bancaria',
      type: 'bank_transfer',
      fee: 0.5,
      processingTime: '1-3 días',
      status: 'active',
      transactionsToday: 23,
      volumeToday: 8900
    },
    {
      id: '3',
      name: 'Bitcoin',
      type: 'crypto',
      fee: 1.0,
      processingTime: '10-30 min',
      status: 'active',
      transactionsToday: 12,
      volumeToday: 3400
    },
    {
      id: '4',
      name: 'Pago Móvil',
      type: 'mobile_payment',
      fee: 1.5,
      processingTime: 'Instantáneo',
      status: 'active',
      transactionsToday: 67,
      volumeToday: 15600
    },
    {
      id: '5',
      name: 'Zelle',
      type: 'zelle',
      fee: 0,
      processingTime: 'Instantáneo',
      status: 'active',
      transactionsToday: 34,
      volumeToday: 7800
    }
  ]

  const mockTransactions: PaymentTransaction[] = [
    {
      id: 'TXN-001',
      orderId: 'ORD-001',
      customer: 'Juan Pérez',
      amount: 899,
      method: 'Visa/Mastercard',
      status: 'completed',
      commission: 26.07,
      profit: 180,
      createdAt: '2024-01-15T10:30:00Z',
      processedAt: '2024-01-15T10:32:00Z',
      autoProcessed: true
    },
    {
      id: 'TXN-002',
      orderId: 'ORD-002',
      customer: 'María González',
      amount: 1899,
      method: 'Pago Móvil',
      status: 'completed',
      commission: 28.49,
      profit: 380,
      createdAt: '2024-01-15T11:45:00Z',
      processedAt: '2024-01-15T11:45:00Z',
      autoProcessed: true
    },
    {
      id: 'TXN-003',
      orderId: 'ORD-003',
      customer: 'Carlos Rodríguez',
      amount: 699,
      method: 'Bitcoin',
      status: 'processing',
      commission: 7.0,
      profit: 140,
      createdAt: '2024-01-15T14:20:00Z',
      autoProcessed: false
    }
  ]

  const mockStats: PaymentStats = {
    totalVolume: 48200,
    transactionsCount: 181,
    averageCommission: 2.1,
    totalProfit: 7240,
    successRate: 98.5,
    autoProcessedRate: 85.2
  }

  const commissionTiers: CommissionTier[] = [
    {
      id: 'bronze',
      name: 'Bronze',
      minVolume: 0,
      maxVolume: 10000,
      commissionRate: 3.5,
      color: 'text-orange-500 bg-orange-500/10',
      benefits: ['Soporte básico', 'Reportes mensuales']
    },
    {
      id: 'silver',
      name: 'Silver',
      minVolume: 10000,
      maxVolume: 50000,
      commissionRate: 2.9,
      color: 'text-gray-500 bg-gray-500/10',
      benefits: ['Soporte prioritario', 'Reportes semanales', 'API access']
    },
    {
      id: 'gold',
      name: 'Gold',
      minVolume: 50000,
      maxVolume: 200000,
      commissionRate: 2.5,
      color: 'text-yellow-500 bg-yellow-500/10',
      benefits: ['Soporte 24/7', 'Reportes diarios', 'API completa', 'Analytics avanzados']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      minVolume: 200000,
      maxVolume: 999999999,
      commissionRate: 2.0,
      color: 'text-purple-500 bg-purple-500/10',
      benefits: ['Soporte dedicado', 'Reportes en tiempo real', 'API premium', 'Consultoría personalizada']
    }
  ]

  useEffect(() => {
    setPaymentMethods(mockPaymentMethods)
    setTransactions(mockTransactions)
    setStats(mockStats)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10'
      case 'processing': return 'text-blue-500 bg-blue-500/10'
      case 'completed': return 'text-green-500 bg-green-500/10'
      case 'failed': return 'text-red-500 bg-red-500/10'
      case 'refunded': return 'text-gray-500 bg-gray-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'processing': return <Activity className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      case 'refunded': return <RefreshCw className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return <CreditCard className="h-4 w-4" />
      case 'bank_transfer': return <Banknote className="h-4 w-4" />
      case 'crypto': return <Wallet className="h-4 w-4" />
      case 'mobile_payment': return <DollarSign className="h-4 w-4" />
      case 'zelle': return <Zap className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const processPayment = (transactionId: string) => {
    setTransactions(prev => prev.map(txn => 
      txn.id === transactionId 
        ? { ...txn, status: 'processing', autoProcessed: true }
        : txn
    ))
  }

  const syncPayments = async () => {
    setLoading(true)
    try {
      // Simulate sync
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Payments synced')
    } catch (error) {
      console.error('Sync failed:', error)
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
              <CreditCard className="h-6 w-6 text-blue-500" />
              Payment System
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
                onClick={syncPayments}
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
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Volume Total</p>
                  <p className="text-xl sm:text-2xl font-bold">${stats.totalVolume.toLocaleString()}</p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Transacciones</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.transactionsCount}</p>
                </div>
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Comisión Promedio</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.averageCommission}%</p>
                </div>
                <Percent className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Profit Total</p>
                  <p className="text-xl sm:text-2xl font-bold">${stats.totalProfit.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Commission Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Niveles de Comisión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {commissionTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedTier === tier.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="text-center mb-4">
                  <Badge className={`${tier.color} mb-2`}>
                    {tier.name}
                  </Badge>
                  <div className="text-2xl font-bold">{tier.commissionRate}%</div>
                  <div className="text-sm text-muted-foreground">
                    ${tier.minVolume.toLocaleString()} - ${tier.maxVolume === 999999999 ? '∞' : tier.maxVolume.toLocaleString()}
                  </div>
                </div>
                <ul className="space-y-1 text-sm">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Métodos de Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getMethodIcon(method.type)}
                    <h4 className="font-semibold">{method.name}</h4>
                  </div>
                  <Badge className={method.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                    {method.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee:</span>
                    <span>{method.fee}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing:</span>
                    <span>{method.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Today:</span>
                    <span>{method.transactionsToday} txn</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume:</span>
                    <span>${method.volumeToday.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Transacciones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">#{transaction.id}</h4>
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1 capitalize">{transaction.status}</span>
                    </Badge>
                    {transaction.autoProcessed && (
                      <Badge className="bg-green-500">
                        <Bot className="h-3 w-3 mr-1" />
                        Auto
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cliente:</span>
                      <p className="font-medium">{transaction.customer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Método:</span>
                      <p className="font-medium">{transaction.method}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Comisión:</span>
                      <p className="font-medium">${transaction.commission.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Profit:</span>
                      <p className="font-medium text-green-500">${transaction.profit}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${transaction.amount}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                  {transaction.status === 'pending' && (
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={() => processPayment(transaction.id)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Calculator className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Calcular Comisiones</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Exportar Reportes</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Filtrar Transacciones</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Programar Pagos</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
