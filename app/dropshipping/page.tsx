'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users,
  ShoppingCart,
  Plus,
  Sync,
  Filter,
  Search
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function DropshippingPage() {
  const [activeTab, setActiveTab] = useState('catalog')

  // Datos de ejemplo
  const stats = [
    {
      title: 'Productos Activos',
      value: '124',
      change: '+12',
      icon: Package,
      color: 'text-blue-500'
    },
    {
      title: 'Ganancia Total',
      value: '$8,450',
      change: '+23%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Ventas',
      value: '89',
      change: '+15%',
      icon: ShoppingCart,
      color: 'text-purple-500'
    },
    {
      title: 'Proveedores',
      value: '12',
      change: '+2',
      icon: Users,
      color: 'text-orange-500'
    }
  ]

  const suppliers = [
    {
      id: '1',
      name: 'TechSupplier China',
      country: 'China',
      products: 1240,
      commission: '10%',
      shipping: '7-15 días',
      rating: 4.8,
      categories: ['Electronics', 'Computers', 'Phones']
    },
    {
      id: '2',
      name: 'Fashion Wholesale',
      country: 'China',
      products: 856,
      commission: '8%',
      shipping: '5-10 días',
      rating: 4.6,
      categories: ['Clothing', 'Accessories', 'Shoes']
    },
    {
      id: '3',
      name: 'Home & Garden Pro',
      country: 'USA',
      products: 623,
      commission: '12%',
      shipping: '3-7 días',
      rating: 4.9,
      categories: ['Home', 'Garden', 'Furniture']
    }
  ]

  const supplierProducts = [
    {
      id: '1',
      name: 'Smartphone Android 5G 128GB',
      supplier: 'TechSupplier China',
      supplierPrice: 150,
      stock: 100,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
      category: 'Electronics',
      shipping: '7-15 días'
    },
    {
      id: '2',
      name: 'Laptop Gaming 16GB RAM',
      supplier: 'TechSupplier China',
      supplierPrice: 800,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
      category: 'Computers',
      shipping: '7-15 días'
    },
    {
      id: '3',
      name: 'Wireless Headphones Pro',
      supplier: 'TechSupplier China',
      supplierPrice: 45,
      stock: 200,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300',
      category: 'Audio',
      shipping: '7-15 días'
    },
    {
      id: '4',
      name: 'Smart Watch Fitness',
      supplier: 'TechSupplier China',
      supplierPrice: 75,
      stock: 150,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300',
      category: 'Wearables',
      shipping: '7-15 días'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dropshipping Dashboard</h1>
            <p className="text-muted-foreground">
              Gestiona tus productos de dropshipping y maximiza tus ganancias
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-secondary">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-green-500">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'catalog'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Catálogo de Proveedores
              </button>
              <button
                onClick={() => setActiveTab('my-products')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'my-products'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mis Productos
              </button>
              <button
                onClick={() => setActiveTab('suppliers')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'suppliers'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Proveedores
              </button>
            </div>
          </div>

          {/* Catalog Tab */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Catálogo de Productos</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {supplierProducts.map((product) => (
                  <Card key={product.id} className="group hover:border-primary/50 transition-all">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden bg-secondary">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <Badge className="absolute top-2 left-2 bg-green-500">
                          En Stock
                        </Badge>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{product.supplier}</p>
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Precio Proveedor:</span>
                            <span className="font-semibold">{formatPrice(product.supplierPrice)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Stock:</span>
                            <span>{product.stock} unidades</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Envío:</span>
                            <span>{product.shipping}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Agregar a Mi Tienda
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* My Products Tab */}
          {activeTab === 'my-products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Mis Productos de Dropshipping</h2>
                <Button>
                  <Sync className="mr-2 h-4 w-4" />
                  Sincronizar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {supplierProducts.slice(0, 4).map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden bg-secondary">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Costo:</span>
                            <span>{formatPrice(product.supplierPrice)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Venta:</span>
                            <span className="font-bold text-primary">
                              {formatPrice(product.supplierPrice * 1.5)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Ganancia:</span>
                            <span className="font-semibold text-green-500">
                              {formatPrice(product.supplierPrice * 0.5)}
                            </span>
                          </div>
                        </div>
                        <Badge className="w-full justify-center">Activo</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Suppliers Tab */}
          {activeTab === 'suppliers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Proveedores Disponibles</h2>
              
              <div className="grid gap-6">
                {suppliers.map((supplier) => (
                  <Card key={supplier.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{supplier.name}</h3>
                            <Badge variant="outline">{supplier.country}</Badge>
                          </div>
                          <div className="grid md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Productos</p>
                              <p className="font-semibold">{supplier.products.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Comisión</p>
                              <p className="font-semibold">{supplier.commission}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Envío</p>
                              <p className="font-semibold">{supplier.shipping}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Rating</p>
                              <p className="font-semibold">{supplier.rating} ⭐</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {supplier.categories.map((cat, idx) => (
                              <Badge key={idx} variant="secondary">{cat}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline">
                            Ver Catálogo
                          </Button>
                          <Button variant="outline">
                            <Sync className="mr-2 h-4 w-4" />
                            Sincronizar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

