'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Datos de ejemplo
  const products = [
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
    {
      id: '7',
      name: 'AirPods Pro 2',
      price: 249,
      originalPrice: 279,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
      rating: 4.7,
      reviews: 445,
      freeShipping: true,
      badge: 'Popular'
    },
    {
      id: '8',
      name: 'iPad Pro 12.9"',
      price: 1099,
      originalPrice: 1199,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      rating: 4.8,
      reviews: 198,
      freeShipping: true,
      badge: 'Oferta'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary">Inicio</a>
              <span className="mx-2">/</span>
              <span>Productos</span>
            </nav>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>

            {/* Filters */}
            {(showFilters || typeof window !== 'undefined' && window.innerWidth >= 768) && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Precio</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Todos</option>
                        <option>Menos de $100</option>
                        <option>$100 - $500</option>
                        <option>$500 - $1000</option>
                        <option>Más de $1000</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Categoría</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Todas</option>
                        <option>Celulares</option>
                        <option>Computadoras</option>
                        <option>Audio</option>
                        <option>Gaming</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ordenar</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Relevancia</option>
                        <option>Menor precio</option>
                        <option>Mayor precio</option>
                        <option>Más vendidos</option>
                        <option>Mejor calificados</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Estado</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          Nuevo
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          Usado
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          Envío gratis
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {products.length} productos
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline" disabled>
              Anterior
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
            <Button variant="outline">5</Button>
            <Button variant="outline">
              Siguiente
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

