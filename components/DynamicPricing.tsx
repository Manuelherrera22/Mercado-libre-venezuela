'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Target,
  Bot,
  Zap,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Settings,
  Brain,
  Activity,
  Eye,
  RefreshCw
} from 'lucide-react'

interface CompetitorPrice {
  competitor: string
  price: number
  url: string
  lastUpdated: string
  availability: boolean
}

interface PriceHistory {
  date: string
  price: number
  reason: string
}

interface PricingStrategy {
  id: string
  name: string
  description: string
  margin: number
  minPrice: number
  maxPrice: number
  active: boolean
}

interface DynamicPricingData {
  currentPrice: number
  suggestedPrice: number
  competitors: CompetitorPrice[]
  priceHistory: PriceHistory[]
  strategies: PricingStrategy[]
  marketPosition: 'lowest' | 'competitive' | 'premium'
  priceChange: number
  confidence: number
}

export function DynamicPricing() {
  const [loading, setLoading] = useState(false)
  const [pricingData, setPricingData] = useState<DynamicPricingData | null>(null)
  const [selectedStrategy, setSelectedStrategy] = useState('competitive')
  const [autoUpdate, setAutoUpdate] = useState(false)

  // Mock pricing data
  const mockPricingData: DynamicPricingData = {
    currentPrice: 89.99,
    suggestedPrice: 94.50,
    competitors: [
      { competitor: 'Amazon', price: 99.99, url: '#', lastUpdated: '2 min ago', availability: true },
      { competitor: 'eBay', price: 85.50, url: '#', lastUpdated: '5 min ago', availability: true },
      { competitor: 'Walmart', price: 92.00, url: '#', lastUpdated: '1 hour ago', availability: true },
      { competitor: 'Target', price: 89.99, url: '#', lastUpdated: '2 hours ago', availability: false }
    ],
    priceHistory: [
      { date: '2024-01-15', price: 89.99, reason: 'Competitor price match' },
      { date: '2024-01-14', price: 92.50, reason: 'Market analysis' },
      { date: '2024-01-13', price: 95.00, reason: 'Initial pricing' }
    ],
    strategies: [
      { id: 'lowest', name: 'Lowest Price', description: 'Always be the cheapest', margin: 15, minPrice: 80, maxPrice: 85, active: false },
      { id: 'competitive', name: 'Competitive', description: 'Match market average', margin: 25, minPrice: 85, maxPrice: 95, active: true },
      { id: 'premium', name: 'Premium', description: 'Higher quality positioning', margin: 35, minPrice: 95, maxPrice: 110, active: false }
    ],
    marketPosition: 'competitive',
    priceChange: 4.51,
    confidence: 87
  }

  const analyzePricing = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setPricingData(mockPricingData)
    } catch (error) {
      console.error('Pricing analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const applySuggestedPrice = () => {
    if (pricingData) {
      setPricingData({
        ...pricingData,
        currentPrice: pricingData.suggestedPrice,
        priceHistory: [
          ...pricingData.priceHistory,
          {
            date: new Date().toISOString().split('T')[0],
            price: pricingData.suggestedPrice,
            reason: 'AI suggested price applied'
          }
        ]
      })
    }
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500'
    if (change < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Activity className="h-4 w-4 text-gray-500" />
  }

  // Auto-update pricing every 30 seconds when enabled
  useEffect(() => {
    if (!autoUpdate) return

    const interval = setInterval(() => {
      analyzePricing()
    }, 30000)

    return () => clearInterval(interval)
  }, [autoUpdate])

  // Initial analysis
  useEffect(() => {
    analyzePricing()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-500" />
              Dynamic Pricing AI
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoUpdate(!autoUpdate)}
                className={autoUpdate ? 'bg-green-500/10 border-green-500' : ''}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${autoUpdate ? 'animate-spin' : ''}`} />
                Auto Update
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={analyzePricing}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Actualizar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {pricingData && (
        <>
          {/* Current Pricing Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Precio Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    ${pricingData.currentPrice}
                  </div>
                  <div className={`flex items-center justify-center gap-1 mb-2 ${getPriceChangeColor(pricingData.priceChange)}`}>
                    {getPriceChangeIcon(pricingData.priceChange)}
                    <span className="text-sm">
                      ${Math.abs(pricingData.priceChange).toFixed(2)}
                    </span>
                  </div>
                  <Badge variant="outline" className="mb-3">
                    {pricingData.marketPosition}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Confianza IA: {pricingData.confidence}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Precio Sugerido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-green-500">
                    ${pricingData.suggestedPrice}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">
                      +${(pricingData.suggestedPrice - pricingData.currentPrice).toFixed(2)}
                    </span>
                  </div>
                  <Button 
                    onClick={applySuggestedPrice}
                    className="w-full"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aplicar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Margen Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-blue-500">
                    {pricingData.strategies.find(s => s.active)?.margin || 25}%
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Estrategia: {pricingData.strategies.find(s => s.active)?.name}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Análisis de Competencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingData.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        competitor.price < pricingData.currentPrice ? 'bg-green-500' :
                        competitor.price > pricingData.currentPrice ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <div className="font-semibold">{competitor.competitor}</div>
                        <div className="text-sm text-muted-foreground">
                          Actualizado {competitor.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${competitor.price}</div>
                      <Badge variant={competitor.availability ? "default" : "secondary"} className="text-xs">
                        {competitor.availability ? 'Disponible' : 'Sin stock'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Estrategias de Precios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {pricingData.strategies.map((strategy) => (
                  <div 
                    key={strategy.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      strategy.active ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedStrategy(strategy.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{strategy.name}</h3>
                      {strategy.active && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {strategy.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Margen:</span>
                        <span className="font-semibold">{strategy.margin}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rango:</span>
                        <span className="font-semibold">
                          ${strategy.minPrice} - ${strategy.maxPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Historial de Precios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pricingData.priceHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-semibold">${entry.price}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.reason}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
