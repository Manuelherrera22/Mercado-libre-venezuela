'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Ticket, 
  Percent, 
  DollarSign,
  Copy,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Gift,
  Tag,
  Star,
  Zap,
  Calendar
} from 'lucide-react'

export default function CouponsPage() {
  const [copied, setCopied] = useState('')
  const [searchCoupon, setSearchCoupon] = useState('')

  const availableCoupons = [
    {
      id: '1',
      code: 'WELCOME20',
      title: 'Bienvenida',
      description: '20% de descuento en tu primera compra',
      discount: 20,
      type: 'percentage',
      minPurchase: 50,
      maxDiscount: 100,
      expiresAt: '2024-04-15',
      usage: 1247,
      totalUses: 5000,
      category: 'all',
      featured: true,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      id: '2',
      code: 'SAVE50',
      title: 'Gran Ahorro',
      description: 'Ahorra $50 en compras mayores a $200',
      discount: 50,
      type: 'fixed',
      minPurchase: 200,
      maxDiscount: 50,
      expiresAt: '2024-03-31',
      usage: 856,
      totalUses: 1000,
      category: 'all',
      featured: true,
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
    {
      id: '3',
      code: 'TECH30',
      title: 'Tecnología',
      description: '30% OFF en productos de tecnología',
      discount: 30,
      type: 'percentage',
      minPurchase: 100,
      maxDiscount: 150,
      expiresAt: '2024-04-20',
      usage: 234,
      totalUses: 1000,
      category: 'electronics',
      featured: false,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      id: '4',
      code: 'FASHION25',
      title: 'Moda',
      description: '25% de descuento en ropa y accesorios',
      discount: 25,
      type: 'percentage',
      minPurchase: 75,
      maxDiscount: 75,
      expiresAt: '2024-04-10',
      usage: 567,
      totalUses: 2000,
      category: 'fashion',
      featured: false,
      color: 'bg-gradient-to-br from-pink-500 to-rose-500'
    },
    {
      id: '5',
      code: 'FREESHIP',
      title: 'Envío Gratis',
      description: 'Envío gratis en compras mayores a $100',
      discount: 0,
      type: 'shipping',
      minPurchase: 100,
      maxDiscount: 0,
      expiresAt: '2024-05-01',
      usage: 3421,
      totalUses: 10000,
      category: 'all',
      featured: true,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      id: '6',
      code: 'VIP50',
      title: 'VIP Exclusive',
      description: '50% de descuento para miembros VIP',
      discount: 50,
      type: 'percentage',
      minPurchase: 150,
      maxDiscount: 200,
      expiresAt: '2024-04-30',
      usage: 89,
      totalUses: 500,
      category: 'all',
      featured: false,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
    }
  ]

  const myCoupons = [
    {
      id: '1',
      code: 'WELCOME20',
      title: 'Bienvenida',
      discount: 20,
      type: 'percentage',
      expiresAt: '2024-04-15',
      used: false
    },
    {
      id: '2',
      code: 'SAVE50',
      title: 'Gran Ahorro',
      discount: 50,
      type: 'fixed',
      expiresAt: '2024-03-31',
      used: false
    },
    {
      id: '3',
      code: 'TECH30',
      title: 'Tecnología',
      discount: 30,
      type: 'percentage',
      expiresAt: '2024-04-20',
      used: true
    }
  ]

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(''), 2000)
  }

  const getDaysUntilExpiry = (date: string) => {
    const expiry = new Date(date)
    const now = new Date()
    const diff = expiry.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Ticket className="h-8 w-8 text-primary" />
              Cupones y Descuentos
            </h1>
            <p className="text-muted-foreground">
              Ahorra en tus compras con nuestros cupones exclusivos
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Ticket className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cupones Activos</p>
                    <p className="text-2xl font-bold">{availableCoupons.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usuarios Ahorrando</p>
                    <p className="text-2xl font-bold">12,456</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <DollarSign className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Ahorrado</p>
                    <p className="text-2xl font-bold">$45,230</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tasa de Uso</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar cupón por código..."
                  value={searchCoupon}
                  onChange={(e) => setSearchCoupon(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Tag className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* My Coupons */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Mis Cupones
              </CardTitle>
              <CardDescription>Cupones que has guardado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {myCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{coupon.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `$${coupon.discount} OFF`}
                        </p>
                      </div>
                      {coupon.used ? (
                        <Badge variant="secondary">Usado</Badge>
                      ) : (
                        <Badge className="bg-green-500">Disponible</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Input
                        value={coupon.code}
                        readOnly
                        className="flex-1 font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(coupon.code)}
                      >
                        {copied === coupon.code ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Expira en {getDaysUntilExpiry(coupon.expiresAt)} días</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Coupons */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Cupones Disponibles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCoupons.map((coupon) => (
                <Card key={coupon.id} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    {/* Coupon Header */}
                    <div className={`${coupon.color} p-6 text-white relative overflow-hidden`}>
                      {coupon.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Star className="h-3 w-3 mr-1" />
                            Destacado
                          </Badge>
                        </div>
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Ticket className="h-6 w-6" />
                          </div>
                          <div className="text-right">
                            {coupon.type === 'percentage' ? (
                              <p className="text-3xl font-bold">{coupon.discount}%</p>
                            ) : coupon.type === 'shipping' ? (
                              <p className="text-lg font-bold">GRATIS</p>
                            ) : (
                              <p className="text-3xl font-bold">${coupon.discount}</p>
                            )}
                            <p className="text-sm opacity-90">OFF</p>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{coupon.title}</h3>
                        <p className="text-sm opacity-90">{coupon.description}</p>
                      </div>
                    </div>

                    {/* Coupon Details */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Input
                          value={coupon.code}
                          readOnly
                          className="flex-1 font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(coupon.code)}
                        >
                          {copied === coupon.code ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Compra mínima:</span>
                          <span className="font-semibold">${coupon.minPurchase}</span>
                        </div>
                        {coupon.type === 'percentage' && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Descuento máximo:</span>
                            <span className="font-semibold">${coupon.maxDiscount}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Válido hasta:</span>
                          <span className="font-semibold">{coupon.expiresAt}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Usos disponibles</span>
                          <span>{coupon.usage} / {coupon.totalUses}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(coupon.usage / coupon.totalUses) * 100}%` }}
                          />
                        </div>
                      </div>

                      <Button className="w-full" variant={coupon.featured ? 'default' : 'outline'}>
                        <Zap className="h-4 w-4 mr-2" />
                        Usar Cupón
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                ¿Cómo Usar los Cupones?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Explora</h3>
                  <p className="text-sm text-muted-foreground">
                    Busca cupones disponibles
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Guarda</h3>
                  <p className="text-sm text-muted-foreground">
                    Guarda los cupones que te interesen
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Compra</h3>
                  <p className="text-sm text-muted-foreground">
                    Agrega productos al carrito
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Aplica</h3>
                  <p className="text-sm text-muted-foreground">
                    Ingresa el código y ahorra
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

