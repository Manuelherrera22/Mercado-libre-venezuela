'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  Star, 
  Minus, 
  Plus,
  CheckCircle,
  Package,
  Award,
  MessageCircle
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  // Datos de ejemplo (en producción vendrían de la API)
  const product = {
    id: params.id,
    name: 'iPhone 15 Pro Max 256GB',
    price: 899,
    originalPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1616348436168-b43add1922ee?w=800'
    ],
    rating: 4.8,
    reviews: 234,
    stock: 15,
    freeShipping: true,
    badge: 'Nuevo',
    seller: {
      name: 'TechStore VE',
      rating: 4.9,
      sales: 1234,
      verified: true
    },
    description: `El iPhone 15 Pro Max es el smartphone más avanzado de Apple. Cuenta con el chip A17 Pro, una pantalla Super Retina XDR de 6.7 pulgadas, y un sistema de cámaras profesional de 48MP.

Características principales:
• Chip A17 Pro con GPU de 6 núcleos
• Pantalla Super Retina XDR de 6.7"
• Sistema de cámaras Pro de 48MP
• Batería de larga duración
• Resistente al agua (IP68)
• 256GB de almacenamiento
• Conexión 5G
• Face ID avanzado`,
    specifications: {
      'Pantalla': '6.7" Super Retina XDR',
      'Procesador': 'A17 Pro',
      'Cámara': '48MP + 12MP + 12MP',
      'Batería': 'Hasta 29 horas de video',
      'Almacenamiento': '256GB',
      'Resistencia': 'IP68'
    }
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar al carrito')
      return
    }
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      })
    }
    toast.success(`¡${quantity} producto(s) agregado(s) al carrito!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Redirigir al checkout
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-primary">Productos</Link>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    {product.badge}
                  </Badge>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold ml-1">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({product.reviews} reseñas)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFavorite}
                    className={isFavorite ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                {product.freeShipping && (
                  <div className="flex items-center text-green-500 text-sm">
                    <Truck className="h-4 w-4 mr-1" />
                    Envío gratis
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">En stock ({product.stock} disponibles)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Sin stock</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Cantidad</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 mb-8">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Agregar al Carrito
                </Button>
              </div>

              {/* Seller Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vendedor</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.seller.name}</span>
                        {product.seller.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.seller.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{product.seller.sales} ventas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Compra protegida</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Envío rápido</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Devolución gratis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Producto original</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="flex gap-8 mb-6">
              <button className="py-4 border-b-2 border-primary font-medium">
                Descripción
              </button>
              <button className="py-4 text-muted-foreground hover:text-foreground">
                Especificaciones
              </button>
              <button className="py-4 text-muted-foreground hover:text-foreground">
                Reseñas ({product.reviews})
              </button>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Descripción del Producto</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Especificaciones Técnicas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-xl font-bold mb-4">Reseñas de Clientes</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <Card key={review}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {review === 1 ? 'J' : review === 2 ? 'M' : 'C'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">Cliente {review === 1 ? 'Juan' : review === 2 ? 'María' : 'Carlos'}</p>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">Hace 2 días</span>
                          </div>
                          <p className="text-muted-foreground">
                            Excelente producto, llegó en perfectas condiciones y muy rápido. 
                            Totalmente recomendado.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

