'use client'

import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Star, 
  Truck, 
  Shield, 
  CreditCard, 
  ArrowRight,
  Smartphone,
  Laptop,
  Home as HomeIcon,
  Shirt,
  Gamepad2,
  Watch,
  Headphones,
  Sparkles
} from 'lucide-react'

// Datos de ejemplo (en producción vendrían de la API)
const categories = [
  { id: 1, name: 'Celulares', icon: Smartphone, color: 'text-blue-500', bgColor: 'bg-blue-500/10', products: 1247 },
  { id: 2, name: 'Computadoras', icon: Laptop, color: 'text-purple-500', bgColor: 'bg-purple-500/10', products: 856 },
  { id: 3, name: 'Hogar', icon: HomeIcon, color: 'text-green-500', bgColor: 'bg-green-500/10', products: 2341 },
  { id: 4, name: 'Ropa', icon: Shirt, color: 'text-pink-500', bgColor: 'bg-pink-500/10', products: 3421 },
  { id: 5, name: 'Gaming', icon: Gamepad2, color: 'text-red-500', bgColor: 'bg-red-500/10', products: 678 },
  { id: 6, name: 'Relojes', icon: Watch, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', products: 432 },
  { id: 7, name: 'Audio', icon: Headphones, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10', products: 987 },
]

const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 899,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    rating: 4.8,
    reviews: 234,
    freeShipping: true,
    badge: 'Nuevo'
  },
  {
    id: '2',
    name: 'MacBook Pro M3 14"',
    price: 1899,
    originalPrice: 2099,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    rating: 4.9,
    reviews: 156,
    freeShipping: true,
    badge: 'Oferta'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1099,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    rating: 4.7,
    reviews: 189,
    freeShipping: true,
    badge: 'Destacado'
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
    badge: 'Popular'
  },
  {
    id: '5',
    name: 'PlayStation 5',
    price: 499,
    originalPrice: 549,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
    rating: 4.9,
    reviews: 567,
    freeShipping: true,
    badge: 'Oferta'
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
    badge: 'Nuevo'
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-fadeIn">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  #1 en Venezuela
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  La plataforma de{' '}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    compra y venta
                  </span>{' '}
                  más grande
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Encuentra los mejores productos al mejor precio. Compra y vende de forma segura en toda Venezuela.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/products">
                    <Button size="lg" className="group">
                      Explorar Productos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/sell">
                    <Button size="lg" variant="outline">
                      Vender Ahora
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="relative h-[500px] rounded-2xl overflow-hidden border border-primary/20">
                  <img
                    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800"
                    alt="Marketplace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Envío Gratis</h3>
                <p className="text-sm text-muted-foreground">En compras +$50</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Compra Protegida</h3>
                <p className="text-sm text-muted-foreground">100% Seguro</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Pago Flexible</h3>
                <p className="text-sm text-muted-foreground">Múltiples métodos</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Calidad Garantizada</h3>
                <p className="text-sm text-muted-foreground">Productos verificados</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="py-12 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                Nuevo con IA
              </Badge>
              <h2 className="text-3xl font-bold mb-2">Potenciado por Inteligencia Artificial</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubre productos personalizados con nuestra tecnología de IA avanzada. ¡Chat disponible en la burbuja flotante!
              </p>
            </div>
            <div className="flex justify-center max-w-2xl mx-auto">
              <Link href="/ai-recommendations">
                <Card className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-pink-500/50 w-full">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center gap-6">
                      <div className="p-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 text-center">
                        <h3 className="text-2xl font-bold mb-3">Recomendaciones IA</h3>
                        <p className="text-muted-foreground mb-6 text-lg">
                          Productos personalizados basados en tus gustos y comportamiento de compra. ¡Encuentra lo que buscas!
                        </p>
                        <div className="flex items-center justify-center gap-2 text-pink-500 font-semibold group-hover:gap-4 transition-all text-lg">
                          Ver recomendaciones
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Categorías Populares</h2>
              <Link href="/categories">
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group"
                >
                  <Card className="hover:border-primary/50 transition-all cursor-pointer h-full hover:shadow-lg">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className={`mb-3 p-4 rounded-full ${category.bgColor} group-hover:scale-110 transition-transform`}>
                        <category.icon className={`h-8 w-8 ${category.color}`} />
                      </div>
                      <p className="font-medium text-sm mb-1">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.products.toLocaleString()} productos</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Productos Destacados</h2>
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  ¿Tienes algo para vender?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Únete a miles de vendedores en nuestra plataforma. Es fácil, rápido y seguro.
                </p>
                <Link href="/sell">
                  <Button size="lg" className="group">
                    Comenzar a Vender
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

