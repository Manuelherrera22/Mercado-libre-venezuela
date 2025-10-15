'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Bell,
  MapPin,
  Phone,
  Mail,
  Edit,
  Package,
  Truck,
  CheckCircle,
  Clock
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  // Datos de ejemplo
  const orders = [
    {
      id: 'ORD-123456',
      date: '2024-01-15',
      status: 'delivered',
      total: 899,
      items: 1,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100'
    },
    {
      id: 'ORD-123457',
      date: '2024-01-20',
      status: 'shipped',
      total: 1299,
      items: 2,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100'
    },
    {
      id: 'ORD-123458',
      date: '2024-01-25',
      status: 'processing',
      total: 599,
      items: 1,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100'
    }
  ]

  const favorites = [
    {
      id: '1',
      name: 'MacBook Pro M3',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200'
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      processing: { label: 'Procesando', icon: Clock, color: 'text-yellow-500' },
      shipped: { label: 'En Camino', icon: Truck, color: 'text-blue-500' },
      delivered: { label: 'Entregado', icon: CheckCircle, color: 'text-green-500' }
    }
    const statusInfo = statusMap[status as keyof typeof statusMap]
    const Icon = statusInfo.icon
    
    return (
      <div className={`flex items-center gap-2 ${statusInfo.color}`}>
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{statusInfo.label}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Cuenta</h1>
            <p className="text-muted-foreground">
              Gestiona tu perfil, pedidos y preferencias
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mb-3">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h3 className="font-semibold">{user?.name || 'Usuario'}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>

                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      }`}
                    >
                      <User className="h-5 w-5" />
                      <span>Mi Perfil</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Mis Pedidos</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'favorites' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                      <span>Favoritos</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      }`}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Configuración</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Información Personal</CardTitle>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                      <Input value={user?.name || ''} disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input value={user?.email || ''} disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Teléfono</label>
                      <Input placeholder="+58 212-555-0100" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Dirección</label>
                      <Input placeholder="Calle, número, ciudad" />
                    </div>
                    <Button>Guardar Cambios</Button>
                  </CardContent>
                </Card>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                            <img
                              src={order.image}
                              alt="Product"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold">Pedido #{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.date).toLocaleDateString('es-VE')}
                                </p>
                              </div>
                              {getStatusBadge(order.status)}
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">
                                {order.items} {order.items === 1 ? 'producto' : 'productos'}
                              </p>
                              <p className="font-bold text-primary">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button variant="outline" size="sm">
                                Ver Detalles
                              </Button>
                              {order.status === 'delivered' && (
                                <Button variant="outline" size="sm">
                                  Calificar
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {favorites.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <p className="text-xl font-bold text-primary mb-3">
                              {formatPrice(item.price)}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                Comprar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4 fill-current text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notificaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificaciones por Email</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe actualizaciones sobre tus pedidos
                          </p>
                        </div>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificaciones Push</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones en tiempo real
                          </p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Privacidad</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">Cambiar Contraseña</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

