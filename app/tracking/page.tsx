'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Package, 
  MapPin, 
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Navigation,
  Phone,
  Mail,
  Calendar,
  User,
  Building,
  Home,
  Map
} from 'lucide-react'

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('1')

  const orders = [
    {
      id: '1',
      trackingNumber: 'MLVE-2024-001234',
      status: 'in_transit',
      statusText: 'En Tránsito',
      currentLocation: 'Centro de Distribución Caracas',
      estimatedDelivery: '2024-03-20',
      carrier: 'ML Express',
      driver: {
        name: 'Carlos Rodríguez',
        phone: '+58 412-123-4567',
        vehicle: 'ML-1234'
      },
      timeline: [
        {
          id: '1',
          status: 'delivered',
          title: 'Entregado',
          description: 'Paquete entregado al destinatario',
          location: 'Caracas, Miranda',
          timestamp: '2024-03-18 14:30',
          completed: true
        },
        {
          id: '2',
          status: 'in_transit',
          title: 'En Camino',
          description: 'Repartidor en camino a la dirección',
          location: 'Caracas, Miranda',
          timestamp: '2024-03-18 13:15',
          completed: true
        },
        {
          id: '3',
          status: 'out_for_delivery',
          title: 'Listo para Entrega',
          description: 'Paquete salió del centro de distribución',
          location: 'Centro de Distribución Caracas',
          timestamp: '2024-03-18 08:00',
          completed: true
        },
        {
          id: '4',
          status: 'in_transit',
          title: 'En Tránsito',
          description: 'En camino al centro de distribución',
          location: 'Valencia, Carabobo',
          timestamp: '2024-03-17 16:45',
          completed: true
        },
        {
          id: '5',
          status: 'processing',
          title: 'Procesado',
          description: 'Paquete procesado y embalado',
          location: 'Centro de Distribución Valencia',
          timestamp: '2024-03-17 10:20',
          completed: true
        },
        {
          id: '6',
          status: 'confirmed',
          title: 'Confirmado',
          description: 'Orden confirmada y lista para envío',
          location: 'Valencia, Carabobo',
          timestamp: '2024-03-16 14:00',
          completed: true
        }
      ],
      items: [
        { name: 'iPhone 15 Pro Max', quantity: 1, price: 850 },
        { name: 'Cargador Inalámbrico', quantity: 1, price: 25 }
      ],
      recipient: {
        name: 'María González',
        address: 'Av. Principal, Edificio Los Pinos, Apto 5B',
        city: 'Caracas',
        state: 'Miranda',
        phone: '+58 414-987-6543',
        email: 'maria@email.com'
      },
      shipping: {
        method: 'Express',
        cost: 15,
        insurance: true
      }
    }
  ]

  const selectedOrderData = orders.find(o => o.id === selectedOrder)!

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500'
      case 'in_transit':
        return 'bg-blue-500'
      case 'out_for_delivery':
        return 'bg-purple-500'
      case 'processing':
        return 'bg-yellow-500'
      case 'confirmed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />
      case 'in_transit':
        return <Truck className="h-5 w-5" />
      case 'out_for_delivery':
        return <MapPin className="h-5 w-5" />
      case 'processing':
        return <Package className="h-5 w-5" />
      case 'confirmed':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              Seguimiento de Pedidos
            </h1>
            <p className="text-muted-foreground">
              Rastrea tu pedido en tiempo real con GPS
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Ingresa tu número de seguimiento (MLVE-XXXX-XXXXXX)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Rastrear
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Estado del Pedido
                      </CardTitle>
                      <CardDescription>
                        {selectedOrderData.trackingNumber}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(selectedOrderData.status)} text-white`}>
                      {selectedOrderData.statusText}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                      <div className={`p-3 rounded-lg ${getStatusColor(selectedOrderData.status)} text-white`}>
                        {getStatusIcon(selectedOrderData.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{selectedOrderData.statusText}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.currentLocation}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Truck className="h-4 w-4" />
                          Transportista
                        </div>
                        <p className="font-semibold">{selectedOrderData.carrier}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          Entrega Estimada
                        </div>
                        <p className="font-semibold">{selectedOrderData.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Historial de Seguimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {selectedOrderData.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full ${
                            event.completed 
                              ? getStatusColor(event.status) 
                              : 'bg-gray-300'
                          } text-white`}>
                            {getStatusIcon(event.status)}
                          </div>
                          {index < selectedOrderData.timeline.length - 1 && (
                            <div className={`w-0.5 h-full ${
                              event.completed 
                                ? getStatusColor(event.status) 
                                : 'bg-gray-300'
                            }`} />
                          )}
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold">{event.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {event.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Ubicación en Tiempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Mapa de seguimiento en tiempo real
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedOrderData.currentLocation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Driver Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información del Repartidor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{selectedOrderData.driver.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Vehículo: {selectedOrderData.driver.vehicle}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar Repartidor
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Navigation className="h-4 w-4 mr-2" />
                      Ver Ruta en Mapa
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Detalles del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Productos</h4>
                    <div className="space-y-2">
                      {selectedOrderData.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-semibold">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold">
                        {selectedOrderData.shipping.method}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Costo</span>
                      <span className="font-semibold">
                        ${selectedOrderData.shipping.cost}
                      </span>
                    </div>
                    {selectedOrderData.shipping.insurance && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Seguro incluido</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recipient Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Dirección de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">{selectedOrderData.recipient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrderData.recipient.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrderData.recipient.city}, {selectedOrderData.recipient.state}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">¿Necesitas Ayuda?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Si tienes problemas con tu pedido, contáctanos
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Contactar Soporte
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

