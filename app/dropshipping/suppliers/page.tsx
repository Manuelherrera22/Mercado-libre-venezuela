'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Globe, 
  Package, 
  Truck, 
  Star,
  CheckCircle,
  Sync,
  ExternalLink
} from 'lucide-react'

export default function SuppliersPage() {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)

  const suppliers = [
    {
      id: '1',
      name: 'TechSupplier China',
      country: 'China',
      logo: '🏭',
      products: 1240,
      commission: 10,
      shipping: { min: 7, max: 15 },
      rating: 4.8,
      reviews: 1250,
      categories: ['Electronics', 'Computers', 'Phones', 'Audio'],
      features: ['Auto Sync', 'API Integration', 'Bulk Orders', 'Tracking'],
      minOrder: 100,
      paymentTerms: 'Net 30',
      verified: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'Fashion Wholesale Co',
      country: 'China',
      logo: '👕',
      products: 856,
      commission: 8,
      shipping: { min: 5, max: 10 },
      rating: 4.6,
      reviews: 890,
      categories: ['Clothing', 'Accessories', 'Shoes', 'Bags'],
      features: ['Auto Sync', 'Dropshipping', 'Private Label'],
      minOrder: 50,
      paymentTerms: 'Net 15',
      verified: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'Home & Garden Pro',
      country: 'USA',
      logo: '🏡',
      products: 623,
      commission: 12,
      shipping: { min: 3, max: 7 },
      rating: 4.9,
      reviews: 450,
      categories: ['Home', 'Garden', 'Furniture', 'Decor'],
      features: ['Fast Shipping', 'USA Based', 'Quality Guarantee'],
      minOrder: 200,
      paymentTerms: 'Net 30',
      verified: true,
      status: 'active'
    },
    {
      id: '4',
      name: 'Beauty & Health Supply',
      country: 'South Korea',
      logo: '💄',
      products: 450,
      commission: 15,
      shipping: { min: 7, max: 12 },
      rating: 4.7,
      reviews: 320,
      categories: ['Beauty', 'Health', 'Skincare', 'Wellness'],
      features: ['Certified Products', 'Organic Options', 'Private Label'],
      minOrder: 150,
      paymentTerms: 'Net 30',
      verified: true,
      status: 'active'
    }
  ]

  const getSupplierDetails = (id: string) => {
    return suppliers.find(s => s.id === id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Proveedores de Dropshipping</h1>
            <p className="text-muted-foreground">
              Conecta con proveedores confiables y sincroniza sus productos
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Proveedores</p>
                    <p className="text-2xl font-bold">{suppliers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Productos</p>
                    <p className="text-2xl font-bold">
                      {suppliers.reduce((sum, s) => sum + s.products, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rating Promedio</p>
                    <p className="text-2xl font-bold">
                      {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Envío Promedio</p>
                    <p className="text-2xl font-bold">7-12 días</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suppliers List */}
          <div className="space-y-6">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center text-4xl">
                        {supplier.logo}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{supplier.name}</h3>
                            {supplier.verified && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <span>{supplier.country}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-500">
                          {supplier.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Productos</p>
                          <p className="font-semibold">{supplier.products.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Comisión</p>
                          <p className="font-semibold">{supplier.commission}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Envío</p>
                          <p className="font-semibold">{supplier.shipping.min}-{supplier.shipping.max} días</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{supplier.rating}</span>
                            <span className="text-xs text-muted-foreground">({supplier.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Categorías</p>
                        <div className="flex flex-wrap gap-2">
                          {supplier.categories.map((cat, idx) => (
                            <Badge key={idx} variant="secondary">{cat}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Características</p>
                        <div className="flex flex-wrap gap-2">
                          {supplier.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button onClick={() => setSelectedSupplier(supplier.id)}>
                          Ver Catálogo
                        </Button>
                        <Button variant="outline">
                          <Sync className="mr-2 h-4 w-4" />
                          Sincronizar
                        </Button>
                        <Button variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Sitio Web
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                ¿Eres Proveedor?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Únete a nuestra red de proveedores y llega a miles de vendedores en Venezuela
              </p>
              <Button size="lg">
                Convertirse en Proveedor
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

