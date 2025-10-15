'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/ProductCard'
import { 
  Smartphone,
  Laptop,
  Home as HomeIcon,
  Shirt,
  Gamepad2,
  Watch,
  Headphones,
  Search,
  Filter,
  SlidersHorizontal,
  Grid3x3,
  List,
  ArrowLeft,
  Star,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const categoriesData: Record<string, any> = {
  '1': {
    name: 'Celulares',
    icon: Smartphone,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Smartphones, tablets y accesorios para móviles',
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
        badge: 'Nuevo'
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
        badge: 'Destacado'
      },
      {
        id: '3',
        name: 'Xiaomi 14 Pro',
        price: 699,
        originalPrice: 799,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        rating: 4.6,
        reviews: 312,
        freeShipping: true,
        badge: 'Oferta'
      },
      {
        id: '4',
        name: 'Google Pixel 8 Pro',
        price: 799,
        originalPrice: 899,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
        rating: 4.9,
        reviews: 156,
        freeShipping: true,
        badge: 'Popular'
      },
      {
        id: '5',
        name: 'OnePlus 12',
        price: 749,
        originalPrice: 849,
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
        rating: 4.7,
        reviews: 278,
        freeShipping: true,
        badge: 'Nuevo'
      },
      {
        id: '6',
        name: 'Huawei P60 Pro',
        price: 649,
        originalPrice: 749,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        rating: 4.5,
        reviews: 145,
        freeShipping: true,
        badge: 'Oferta'
      }
    ],
    subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'Huawei', 'Motorola', 'Google', 'OnePlus'],
    filters: {
      brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Motorola', 'Google', 'OnePlus'],
      priceRanges: [
        { label: 'Menos de $500', min: 0, max: 500 },
        { label: '$500 - $800', min: 500, max: 800 },
        { label: '$800 - $1000', min: 800, max: 1000 },
        { label: 'Más de $1000', min: 1000, max: Infinity }
      ],
      storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
      colors: ['Negro', 'Blanco', 'Azul', 'Rojo', 'Dorado', 'Plata']
    }
  },
  '2': {
    name: 'Computadoras',
    icon: Laptop,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Laptops, desktops y componentes de PC',
    products: [
      {
        id: '7',
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
        id: '8',
        name: 'Dell XPS 15',
        price: 1499,
        originalPrice: 1699,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        rating: 4.7,
        reviews: 234,
        freeShipping: true,
        badge: 'Destacado'
      },
      {
        id: '9',
        name: 'ASUS ROG Strix G15',
        price: 1299,
        originalPrice: 1499,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        rating: 4.8,
        reviews: 189,
        freeShipping: true,
        badge: 'Gaming'
      }
    ],
    subcategories: ['Laptops', 'Desktop', 'Monitores', 'Teclados', 'Mouse'],
    filters: {
      brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'MSI', 'Acer'],
      priceRanges: [
        { label: 'Menos de $1000', min: 0, max: 1000 },
        { label: '$1000 - $1500', min: 1000, max: 1500 },
        { label: '$1500 - $2000', min: 1500, max: 2000 },
        { label: 'Más de $2000', min: 2000, max: Infinity }
      ],
      ram: ['8GB', '16GB', '32GB', '64GB'],
      storage: ['256GB', '512GB', '1TB', '2TB']
    }
  }
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string
  const category = categoriesData[categoryId]

  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
            <Link href="/categories">
              <Button>Volver a Categorías</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const IconComponent = category.icon

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Inicio</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-foreground">Categorías</Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>

          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-lg ${category.bgColor}`}>
                  <IconComponent className={`h-12 w-12 ${category.color}`} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <Link href="/categories">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Grid3x3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Productos</p>
                      <p className="text-xl font-bold">{category.products.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Star className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating Promedio</p>
                      <p className="text-xl font-bold">4.7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">En Tendencia</p>
                      <p className="text-xl font-bold">+23%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Subcategories */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {category.subcategories.map((subcategory: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {subcategory}
                </Button>
              ))}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar en esta categoría..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border bg-background"
              >
                <option value="popular">Más Popular</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
                <option value="newest">Más Recientes</option>
              </select>
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Marca</h4>
                    <div className="space-y-2">
                      {category.filters.brands.map((brand: string) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Rango de Precio</h4>
                    <div className="space-y-2">
                      {category.filters.priceRanges.map((range: any, idx: number) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Almacenamiento</h4>
                    <div className="space-y-2">
                      {category.filters.storage?.map((storage: string) => (
                        <label key={storage} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{storage}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">RAM</h4>
                    <div className="space-y-2">
                      {category.filters.ram?.map((ram: string) => (
                        <label key={ram} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{ram}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Cargar Más Productos
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

