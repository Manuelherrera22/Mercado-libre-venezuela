'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Gavel, 
  Clock, 
  Users, 
  TrendingUp, 
  DollarSign,
  Zap,
  Timer,
  Eye,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Flame
} from 'lucide-react'

interface Auction {
  id: string
  title: string
  description: string
  image: string
  currentBid: number
  startingBid: number
  buyNowPrice: number
  bids: number
  watchers: number
  timeLeft: string
  status: 'active' | 'ending' | 'ended'
  category: string
  seller: {
    name: string
    rating: number
    verified: boolean
  }
  featured: boolean
}

export default function AuctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('ending')
  const [bidAmount, setBidAmount] = useState('')

  const categories = [
    { id: 'all', name: 'Todas', icon: '🔥' },
    { id: 'electronics', name: 'Electrónica', icon: '📱' },
    { id: 'fashion', name: 'Moda', icon: '👕' },
    { id: 'collectibles', name: 'Coleccionables', icon: '🎨' },
    { id: 'vehicles', name: 'Vehículos', icon: '🚗' },
    { id: 'real-estate', name: 'Inmuebles', icon: '🏠' }
  ]

  const auctions: Auction[] = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max 256GB - Nuevo Sellado',
      description: 'iPhone 15 Pro Max completamente nuevo, sellado de fábrica. Color Natural Titanium.',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      currentBid: 850,
      startingBid: 600,
      buyNowPrice: 1200,
      bids: 23,
      watchers: 156,
      timeLeft: '2h 15m',
      status: 'ending',
      category: 'electronics',
      seller: {
        name: 'TechStore Venezuela',
        rating: 4.9,
        verified: true
      },
      featured: true
    },
    {
      id: '2',
      title: 'Rolex Submariner Date 2023',
      description: 'Reloj Rolex Submariner Date, caja de acero, bisel negro cerámico.',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
      currentBid: 8500,
      startingBid: 7000,
      buyNowPrice: 12000,
      bids: 45,
      watchers: 289,
      timeLeft: '5h 30m',
      status: 'active',
      category: 'collectibles',
      seller: {
        name: 'Luxury Timepieces',
        rating: 5.0,
        verified: true
      },
      featured: true
    },
    {
      id: '3',
      title: 'Tesla Model 3 2023 - 5,000 km',
      description: 'Tesla Model 3 en excelente estado, solo 5,000 km recorridos.',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
      currentBid: 35000,
      startingBid: 30000,
      buyNowPrice: 45000,
      bids: 12,
      watchers: 78,
      timeLeft: '1d 8h',
      status: 'active',
      category: 'vehicles',
      seller: {
        name: 'Auto Premium',
        rating: 4.8,
        verified: true
      },
      featured: false
    },
    {
      id: '4',
      title: 'Apartamento 2 Habitaciones - Caracas',
      description: 'Hermoso apartamento en zona exclusiva de Caracas, completamente amueblado.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      currentBid: 85000,
      startingBid: 80000,
      buyNowPrice: 120000,
      bids: 8,
      watchers: 234,
      timeLeft: '3d 12h',
      status: 'active',
      category: 'real-estate',
      seller: {
        name: 'Inmobiliaria Premium',
        rating: 4.9,
        verified: true
      },
      featured: true
    }
  ]

  const handleBid = (auctionId: string) => {
    // Handle bid logic
    console.log(`Bidding ${bidAmount} on auction ${auctionId}`)
  }

  const handleBuyNow = (auctionId: string, price: number) => {
    // Handle buy now logic
    console.log(`Buying now for $${price}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Gavel className="h-8 w-8 text-primary" />
              Subastas en Vivo
            </h1>
            <p className="text-muted-foreground">
              Puja por productos exclusivos y obtén las mejores ofertas
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subastas Activas</p>
                    <p className="text-2xl font-bold">124</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pujas Hoy</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pujadores</p>
                    <p className="text-2xl font-bold">3,421</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <DollarSign className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <p className="text-2xl font-bold">$245K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {auctions.length} subastas
            </p>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border bg-background"
              >
                <option value="ending">Finalizando Pronto</option>
                <option value="newest">Más Nuevas</option>
                <option value="highest">Mayor Puja</option>
                <option value="lowest">Menor Puja</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <Card key={auction.id} className={`group hover:border-primary/50 transition-all ${auction.featured ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={auction.image}
                      alt={auction.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {auction.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-orange-500">
                          <Flame className="h-3 w-3 mr-1" />
                          Destacada
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-background/80">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-background/80">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center justify-between bg-background/90 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center gap-1 text-xs">
                          <Eye className="h-3 w-3" />
                          <span>{auction.watchers}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{auction.bids} pujas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <div>
                      <h3 className="font-semibold line-clamp-2 mb-1">{auction.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{auction.seller.name}</span>
                        {auction.seller.verified && (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        )}
                        <span className="text-yellow-500">★ {auction.seller.rating}</span>
                      </div>
                    </div>

                    {/* Time Left */}
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${
                      auction.status === 'ending' 
                        ? 'bg-red-500/10 text-red-500' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      <Timer className="h-4 w-4" />
                      <span className="text-sm font-semibold">{auction.timeLeft}</span>
                      {auction.status === 'ending' && (
                        <Badge variant="destructive" className="ml-auto">Finalizando</Badge>
                      )}
                    </div>

                    {/* Bids */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Puja Actual</span>
                        <span className="text-lg font-bold text-primary">
                          ${auction.currentBid.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Puja Inicial</span>
                        <span>${auction.startingBid.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Bid Input */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Tu puja"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          min={auction.currentBid + 1}
                        />
                        <Button
                          onClick={() => handleBid(auction.id)}
                          className="flex-1"
                          size="sm"
                        >
                          <Gavel className="h-4 w-4 mr-1" />
                          Pujar
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        size="sm"
                        onClick={() => handleBuyNow(auction.id, auction.buyNowPrice)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Comprar Ahora ${auction.buyNowPrice.toLocaleString()}
                      </Button>
                    </div>

                    {/* Alert */}
                    {auction.status === 'ending' && (
                      <div className="flex items-start gap-2 p-2 bg-yellow-500/10 rounded-lg text-xs text-yellow-600">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>¡Esta subasta está por finalizar! Puja ahora para no perderla.</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                ¿Cómo Funcionan las Subastas?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Regístrate</h3>
                  <p className="text-sm text-muted-foreground">
                    Crea tu cuenta y verifica tu identidad
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Explora</h3>
                  <p className="text-sm text-muted-foreground">
                    Busca productos que te interesen
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Puja</h3>
                  <p className="text-sm text-muted-foreground">
                    Haz tu puja o compra inmediatamente
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Gana</h3>
                  <p className="text-sm text-muted-foreground">
                    Si tu puja es la más alta, ¡el producto es tuyo!
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

