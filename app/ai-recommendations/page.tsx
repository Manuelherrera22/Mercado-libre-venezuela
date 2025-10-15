'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/ProductCard'
import { 
  Sparkles, 
  TrendingUp, 
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Zap,
  Target,
  Brain,
  BarChart3,
  TrendingDown,
  RefreshCw
} from 'lucide-react'

interface Recommendation {
  id: string
  type: 'trending' | 'personalized' | 'similar' | 'frequently_bought'
  title: string
  description: string
  products: any[]
  confidence: number
}

export default function AIRecommendationsPage() {
  const [activeTab, setActiveTab] = useState('trending')
  const [loading, setLoading] = useState(false)

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'trending',
      title: '🔥 En Tendencia Ahora',
      description: 'Productos que están siendo más buscados en este momento',
      confidence: 95,
      products: [
        {
          id: '1',
          name: 'iPhone 15 Pro Max 256GB',
          price: 899,
          originalPrice: 999,
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
          rating: 4.8,
          reviews: 234,
          freeShipping: true,
          badge: 'Trending'
        },
        {
          id: '2',
          name: 'Samsung Galaxy S24 Ultra',
          price: 1099,
          originalPrice: 1199,
          image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
          rating: 4.7,
          reviews: 189,
          freeShipping: true,
          badge: 'Popular'
        }
      ]
    },
    {
      id: '2',
      type: 'personalized',
      title: '✨ Personalizado para Ti',
      description: 'Basado en tu historial de búsquedas y compras',
      confidence: 87,
      products: [
        {
          id: '3',
          name: 'MacBook Pro M3 14"',
          price: 1899,
          originalPrice: 2099,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
          rating: 4.9,
          reviews: 156,
          freeShipping: true,
          badge: 'Recommended'
        },
        {
          id: '4',
          name: 'Sony WH-1000XM5',
          price: 399,
          originalPrice: 449,
          image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
          rating: 4.6,
          reviews: 312,
          freeShipping: true,
          badge: 'For You'
        }
      ]
    },
    {
      id: '3',
      type: 'similar',
      title: '🔗 Productos Similares',
      description: 'Otros productos que podrían interesarte',
      confidence: 82,
      products: [
        {
          id: '5',
          name: 'PlayStation 5',
          price: 499,
          originalPrice: 549,
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
          rating: 4.9,
          reviews: 567,
          freeShipping: true,
          badge: 'Similar'
        },
        {
          id: '6',
          name: 'Apple Watch Series 9',
          price: 429,
          originalPrice: 479,
          image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
          rating: 4.8,
          reviews: 278,
          freeShipping: true,
          badge: 'Related'
        }
      ]
    },
    {
      id: '4',
      type: 'frequently_bought',
      title: '🛒 Comprados Juntos',
      description: 'Productos que otros compradores compraron junto con este',
      confidence: 78,
      products: [
        {
          id: '7',
          name: 'Cargador Inalámbrico MagSafe',
          price: 49,
          originalPrice: 69,
          image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
          rating: 4.5,
          reviews: 234,
          freeShipping: true,
          badge: 'Bundle'
        },
        {
          id: '8',
          name: 'Funda Protectora iPhone',
          price: 29,
          originalPrice: 39,
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
          rating: 4.4,
          reviews: 189,
          freeShipping: true,
          badge: 'Bundle'
        }
      ]
    }
  ]

  const aiInsights = [
    {
      title: 'Tendencias del Día',
      value: '+23%',
      description: 'Aumento en búsquedas de smartphones',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Productos Populares',
      value: '1,247',
      description: 'Productos con mayor interés esta semana',
      trend: 'up',
      icon: Star
    },
    {
      title: 'Precisión IA',
      value: '94%',
      description: 'Tasa de acierto en recomendaciones',
      trend: 'up',
      icon: Brain
    },
    {
      title: 'Conversiones',
      value: '+18%',
      description: 'Mejora con recomendaciones personalizadas',
      trend: 'up',
      icon: Target
    }
  ]

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-500" />
              Recomendaciones con IA
            </h1>
            <p className="text-muted-foreground">
              Descubre productos personalizados usando inteligencia artificial
            </p>
          </div>

          {/* AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {aiInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <insight.icon className="h-6 w-6 text-purple-500" />
                    </div>
                    <Badge variant="secondary" className="text-green-500">
                      {insight.trend === 'up' ? '↑' : '↓'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{insight.title}</p>
                  <p className="text-2xl font-bold">{insight.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'trending', label: '🔥 En Tendencia', icon: TrendingUp },
                { id: 'personalized', label: '✨ Para Ti', icon: Sparkles },
                { id: 'similar', label: '🔗 Similares', icon: Target },
                { id: 'bundle', label: '🛒 Combos', icon: ShoppingBag }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-8">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {rec.title}
                        <Badge variant="outline" className="text-purple-500">
                          {rec.confidence}% precisión
                        </Badge>
                      </CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Actualizar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rec.products.map((product) => (
                      <div key={product.id} className="group">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                ¿Cómo Funciona la IA?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-500">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Análisis</h3>
                  <p className="text-sm text-muted-foreground">
                    Analizamos tu historial de búsquedas y compras
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-500">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Aprendizaje</h3>
                  <p className="text-sm text-muted-foreground">
                    La IA aprende tus preferencias y patrones
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-500">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Predicción</h3>
                  <p className="text-sm text-muted-foreground">
                    Predice productos que te gustarán
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-500">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Recomendación</h3>
                  <p className="text-sm text-muted-foreground">
                    Te muestra productos personalizados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

