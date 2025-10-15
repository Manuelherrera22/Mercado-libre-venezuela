'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  Grid3x3,
  List
} from 'lucide-react'
import Link from 'next/link'

const allCategories = [
  { 
    id: 1, 
    name: 'Celulares', 
    icon: Smartphone, 
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Smartphones, tablets y accesorios',
    products: 1247,
    subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'Huawei', 'Motorola']
  },
  { 
    id: 2, 
    name: 'Computadoras', 
    icon: Laptop, 
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Laptops, desktops y componentes',
    products: 856,
    subcategories: ['Laptops', 'Desktop', 'Monitores', 'Teclados', 'Mouse']
  },
  { 
    id: 3, 
    name: 'Hogar', 
    icon: HomeIcon, 
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Muebles, decoración y electrodomésticos',
    products: 2341,
    subcategories: ['Muebles', 'Decoración', 'Cocina', 'Baño', 'Jardín']
  },
  { 
    id: 4, 
    name: 'Ropa', 
    icon: Shirt, 
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    description: 'Ropa, calzado y accesorios de moda',
    products: 3421,
    subcategories: ['Mujer', 'Hombre', 'Niños', 'Calzado', 'Accesorios']
  },
  { 
    id: 5, 
    name: 'Gaming', 
    icon: Gamepad2, 
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    description: 'Consolas, juegos y accesorios gaming',
    products: 678,
    subcategories: ['Consolas', 'Juegos', 'Accesorios', 'PC Gaming', 'Merchandise']
  },
  { 
    id: 6, 
    name: 'Relojes', 
    icon: Watch, 
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Relojes inteligentes y tradicionales',
    products: 432,
    subcategories: ['Smartwatch', 'Deportivos', 'Lujo', 'Clásicos', 'Accesorios']
  },
  { 
    id: 7, 
    name: 'Audio', 
    icon: Headphones, 
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    description: 'Audífonos, parlantes y equipos de audio',
    products: 987,
    subcategories: ['Audífonos', 'Parlantes', 'Micrófonos', 'Amplificadores', 'Accesorios']
  },
  { 
    id: 8, 
    name: 'Deportes', 
    icon: '🏃', 
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Equipamiento deportivo y fitness',
    products: 1543,
    subcategories: ['Fitness', 'Running', 'Fútbol', 'Basketball', 'Natación']
  },
  { 
    id: 9, 
    name: 'Belleza', 
    icon: '💄', 
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    description: 'Cosméticos, skincare y cuidado personal',
    products: 2134,
    subcategories: ['Maquillaje', 'Skincare', 'Cabello', 'Perfumes', 'Accesorios']
  },
  { 
    id: 10, 
    name: 'Libros', 
    icon: '📚', 
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    description: 'Libros físicos y digitales',
    products: 876,
    subcategories: ['Ficción', 'No Ficción', 'Técnicos', 'Infantiles', 'Digitales']
  },
  { 
    id: 11, 
    name: 'Mascotas', 
    icon: '🐕', 
    color: 'text-lime-500',
    bgColor: 'bg-lime-500/10',
    description: 'Alimentos, juguetes y accesorios para mascotas',
    products: 765,
    subcategories: ['Perros', 'Gatos', 'Aves', 'Peces', 'Accesorios']
  },
  { 
    id: 12, 
    name: 'Juguetes', 
    icon: '🧸', 
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    description: 'Juguetes para niños y bebés',
    products: 1123,
    subcategories: ['Bebés', 'Niños', 'Educativos', 'Electrónicos', 'Exteriores']
  }
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Todas las Categorías</h1>
            <p className="text-muted-foreground">
              Explora nuestra amplia selección de productos
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Grid3x3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Categorías</p>
                    <p className="text-2xl font-bold">{allCategories.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <List className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Productos</p>
                    <p className="text-2xl font-bold">
                      {allCategories.reduce((sum, cat) => sum + cat.products, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Filter className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subcategorías</p>
                    <p className="text-2xl font-bold">
                      {allCategories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
              >
                <Card className="group hover:border-primary/50 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-4 rounded-lg ${category.bgColor}`}>
                        {typeof category.icon === 'string' ? (
                          <span className="text-3xl">{category.icon}</span>
                        ) : (
                          <category.icon className={`h-8 w-8 ${category.color}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.products.toLocaleString()} productos
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{category.subcategories.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {category.subcategories.length} subcategorías
                      </span>
                      <span className="text-primary font-semibold group-hover:underline">
                        Ver productos →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No se encontraron categorías que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

