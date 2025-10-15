'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  TrendingUp, 
  Search, 
  Star,
  DollarSign,
  Target,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Brain,
  Sparkles,
  TrendingDown,
  Activity
} from 'lucide-react'

interface TrendingProduct {
  id: string
  name: string
  category: string
  price: number
  trendScore: number
  competition: 'low' | 'medium' | 'high'
  profitPotential: number
  searchVolume: number
  seasonality: string
  supplier: string
  shippingTime: string
  images: string[]
}

interface AIAnalysis {
  productScore: number
  trendAnalysis: {
    direction: 'up' | 'down' | 'stable'
    velocity: number
    seasonality: string
  }
  competitionAnalysis: {
    level: 'low' | 'medium' | 'high'
    competitors: number
    marketShare: number
  }
  profitAnalysis: {
    estimatedMargin: number
    breakEvenPoint: number
    roi: number
  }
  recommendations: string[]
  risks: string[]
}

export function ProductResearchAI() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([])

  // Mock trending products data
  const mockTrendingProducts: TrendingProduct[] = [
    {
      id: '1',
      name: 'Wireless Charging Pad 15W',
      category: 'Electronics',
      price: 29.99,
      trendScore: 94,
      competition: 'low',
      profitPotential: 85,
      searchVolume: 12500,
      seasonality: 'Year-round',
      supplier: 'TechSupplier China',
      shippingTime: '7-15 days',
      images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300']
    },
    {
      id: '2',
      name: 'Bluetooth Noise Canceling Headphones',
      category: 'Audio',
      price: 89.99,
      trendScore: 87,
      competition: 'medium',
      profitPotential: 72,
      searchVolume: 8900,
      seasonality: 'Holiday peak',
      supplier: 'AudioPro China',
      shippingTime: '5-10 days',
      images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300']
    },
    {
      id: '3',
      name: 'Smart Fitness Tracker Watch',
      category: 'Wearables',
      price: 159.99,
      trendScore: 91,
      competition: 'high',
      profitPotential: 65,
      searchVolume: 15600,
      seasonality: 'New Year peak',
      supplier: 'FitnessGear China',
      shippingTime: '10-20 days',
      images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300']
    },
    {
      id: '4',
      name: 'Portable Phone Stand with Wireless Charger',
      category: 'Accessories',
      price: 24.99,
      trendScore: 83,
      competition: 'low',
      profitPotential: 78,
      searchVolume: 6700,
      seasonality: 'Year-round',
      supplier: 'MobileAcc China',
      shippingTime: '7-12 days',
      images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300']
    }
  ]

  const analyzeProduct = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockAnalysis: AIAnalysis = {
        productScore: Math.floor(Math.random() * 30) + 70, // 70-100
        trendAnalysis: {
          direction: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
          velocity: Math.floor(Math.random() * 50) + 20,
          seasonality: 'Peak during holidays'
        },
        competitionAnalysis: {
          level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          competitors: Math.floor(Math.random() * 100) + 20,
          marketShare: Math.floor(Math.random() * 20) + 5
        },
        profitAnalysis: {
          estimatedMargin: Math.floor(Math.random() * 40) + 30,
          breakEvenPoint: Math.floor(Math.random() * 50) + 25,
          roi: Math.floor(Math.random() * 100) + 50
        },
        recommendations: [
          'Consider targeting mobile accessory enthusiasts',
          'Optimize for holiday season sales',
          'Focus on competitive pricing strategy',
          'Leverage social media marketing'
        ],
        risks: [
          'High competition in the market',
          'Seasonal demand fluctuations',
          'Potential supplier reliability issues'
        ]
      }
      
      setAnalysis(mockAnalysis)
      setTrendingProducts(mockTrendingProducts)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500 bg-green-500/10'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10'
      case 'high': return 'text-red-500 bg-red-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-500" />
            IA Product Research
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Buscar productos trending (ej: wireless charger, smart watch...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeProduct()}
            />
            <Button onClick={analyzeProduct} disabled={loading}>
              {loading ? (
                <>
                  <Bot className="h-4 w-4 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analizar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              Productos en Tendencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {trendingProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Score</span>
                          <Badge className="bg-green-500">
                            {product.trendScore}/100
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Competencia</span>
                          <Badge className={getCompetitionColor(product.competition)}>
                            {product.competition}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Precio</span>
                          <span className="text-sm font-semibold">${product.price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Potencial</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">{product.profitPotential}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Analysis Results */}
      {analysis && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Analysis Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Análisis de IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {analysis.productScore}/100
                </div>
                <p className="text-sm text-muted-foreground">Score General</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {getTrendIcon(analysis.trendAnalysis.direction)}
                    <span className="text-sm font-semibold">
                      {analysis.trendAnalysis.velocity}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Velocidad</p>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold">
                      {analysis.profitAnalysis.estimatedMargin}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Margen</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Competencia</span>
                    <Badge className={getCompetitionColor(analysis.competitionAnalysis.level)}>
                      {analysis.competitionAnalysis.level}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {analysis.competitionAnalysis.competitors} competidores
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">ROI Estimado</span>
                    <span className="text-sm font-semibold text-green-500">
                      {analysis.profitAnalysis.roi}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations & Risks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Oportunidades
                </h4>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Riesgos
                </h4>
                <ul className="space-y-1">
                  {analysis.risks.map((risk, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Tendencias
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Nichos Calientes
            </Button>
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Precios Óptimos
            </Button>
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              IA Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
