'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Package, 
  Truck, 
  DollarSign,
  CheckCircle,
  Building2,
  Phone,
  Mail
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function LocalDropshippingPage() {
  const [selectedState, setSelectedState] = useState('Todos')
  const [selectedCity, setSelectedCity] = useState('Todos')

  const states = [
    'Todos',
    'Distrito Capital',
    'Miranda',
    'Zulia',
    'Carabobo',
    'Aragua',
    'Lara',
    'Anzoátegui',
    'Bolívar',
    'Táchira',
    'Mérida'
  ]

  const cities = {
    'Distrito Capital': ['Caracas', 'El Hatillo', 'Baruta', 'Chacao'],
    'Miranda': ['Los Teques', 'Guarenas', 'Guatire', 'Petare'],
    'Zulia': ['Maracaibo', 'Cabimas', 'Ciudad Ojeda'],
    'Carabobo': ['Valencia', 'Puerto Cabello', 'Guacara']
  }

  const localSuppliers = [
    {
      id: '1',
      name: 'TechVenezuela Distribuidora',
      rif: 'J-12345678-9',
      state: 'Distrito Capital',
      city: 'Caracas',
      phone: '0414-123-4567',
      whatsapp: '0414-123-4567',
      categories: ['Electronics', 'Computers', 'Phones'],
      rating: 4.8,
      reviews: 234,
      minOrder: 50,
      commission: 15,
      shippingZones: [
        { state: 'Distrito Capital', cities: ['Caracas'], cost: 5, estimatedDays: 1 },
        { state: 'Miranda', cities: [], cost: 8, estimatedDays: 2 }
      ],
      freeShippingThreshold: 100,
      paymentMethods: ['pagomovil', 'transferencia', 'zelle'],
      verified: true,
      businessType: 'wholesaler'
    },
    {
      id: '2',
      name: 'Fashion Caracas',
      rif: 'J-87654321-0',
      state: 'Miranda',
      city: 'Guarenas',
      phone: '0424-987-6543',
      whatsapp: '0424-987-6543',
      categories: ['Clothing', 'Accessories', 'Shoes'],
      rating: 4.6,
      reviews: 156,
      minOrder: 30,
      commission: 12,
      shippingZones: [
        { state: 'Miranda', cities: [], cost: 6, estimatedDays: 1 },
        { state: 'Distrito Capital', cities: [], cost: 7, estimatedDays: 2 }
      ],
      freeShippingThreshold: 80,
      paymentMethods: ['pagomovil', 'transferencia'],
      verified: true,
      businessType: 'retailer'
    },
    {
      id: '3',
      name: 'Hogar y Más',
      rif: 'J-11223344-5',
      state: 'Carabobo',
      city: 'Valencia',
      phone: '0412-555-7890',
      whatsapp: '0412-555-7890',
      categories: ['Home', 'Garden', 'Furniture'],
      rating: 4.9,
      reviews: 89,
      minOrder: 100,
      commission: 18,
      shippingZones: [
        { state: 'Carabobo', cities: [], cost: 10, estimatedDays: 2 },
        { state: 'Aragua', cities: [], cost: 12, estimatedDays: 3 }
      ],
      freeShippingThreshold: 150,
      paymentMethods: ['pagomovil', 'transferencia', 'zelle'],
      verified: true,
      businessType: 'distributor'
    }
  ]

  const getFilteredSuppliers = () => {
    if (selectedState === 'Todos') return localSuppliers
    return localSuppliers.filter(s => s.state === selectedState)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dropshipping Local Venezuela</h1>
            <p className="text-muted-foreground">
              Conecta con proveedores venezolanos y vende productos locales
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Estado</label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value)
                      setSelectedCity('Todos')
                    }}
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                {selectedState !== 'Todos' && cities[selectedState as keyof typeof cities] && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ciudad</label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="Todos">Todas las ciudades</option>
                      {cities[selectedState as keyof typeof cities]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Suppliers List */}
          <div className="space-y-6">
            {getFilteredSuppliers().map((supplier) => (
              <Card key={supplier.id} className="hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-10 w-10 text-primary" />
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
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {supplier.city}, {supplier.state}
                            </span>
                            <span>RIF: {supplier.rif}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-500">
                          Verificado
                        </Badge>
                      </div>

                      {/* Contact */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{supplier.phone}</span>
                          {supplier.whatsapp && (
                            <Badge variant="secondary" className="text-xs">
                              WhatsApp
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>Email disponible</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Comisión</p>
                          <p className="font-semibold">{supplier.commission}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pedido Mínimo</p>
                          <p className="font-semibold">{formatPrice(supplier.minOrder)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Envío Gratis</p>
                          <p className="font-semibold">+{formatPrice(supplier.freeShippingThreshold)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rating</p>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
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

                      {/* Payment Methods */}
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Métodos de Pago</p>
                        <div className="flex flex-wrap gap-2">
                          {supplier.paymentMethods.map((method, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {method === 'pagomovil' ? 'Pago Móvil' : 
                               method === 'transferencia' ? 'Transferencia' : 
                               method === 'zelle' ? 'Zelle' : method}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Zones */}
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Zonas de Envío</p>
                        <div className="flex flex-wrap gap-2">
                          {supplier.shippingZones.map((zone, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {zone.state}: {formatPrice(zone.cost)} ({zone.estimatedDays} días)
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button>
                          <Package className="mr-2 h-4 w-4" />
                          Ver Catálogo
                        </Button>
                        <Button variant="outline">
                          <Truck className="mr-2 h-4 w-4" />
                          Calcular Envío
                        </Button>
                        <Button variant="outline">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Cotizar
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
                ¿Eres Proveedor Local?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Únete a nuestra red de proveedores locales y llega a miles de vendedores en toda Venezuela
              </p>
              <Button size="lg">
                Registrarse como Proveedor Local
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

