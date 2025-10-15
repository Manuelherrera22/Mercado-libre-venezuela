'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Bell, 
  BellRing,
  BellOff,
  Check,
  X,
  Trash2,
  Settings,
  ShoppingBag,
  Truck,
  CreditCard,
  Gift,
  AlertCircle,
  Info,
  Star,
  MessageSquare,
  Package,
  Zap,
  Eye,
  EyeOff,
  BarChart3
} from 'lucide-react'

interface Notification {
  id: string
  type: 'order' | 'promotion' | 'system' | 'social' | 'payment'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    url: string
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: '¡Pedido Confirmado!',
      message: 'Tu pedido #12345 ha sido confirmado y está siendo preparado',
      timestamp: new Date(Date.now() - 60000),
      read: false,
      action: { label: 'Ver Pedido', url: '/orders/12345' }
    },
    {
      id: '2',
      type: 'promotion',
      title: 'Oferta Especial',
      message: 'Descuento del 30% en productos de tecnología. ¡Válido por 24 horas!',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      action: { label: 'Ver Ofertas', url: '/promotions' }
    },
    {
      id: '3',
      type: 'order',
      title: 'Envío en Camino',
      message: 'Tu pedido #12340 está en camino. Llegará el 20 de marzo',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      action: { label: 'Rastrear', url: '/tracking' }
    },
    {
      id: '4',
      type: 'payment',
      title: 'Pago Recibido',
      message: 'Tu pago de $850 ha sido procesado exitosamente',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      action: { label: 'Ver Detalles', url: '/payments' }
    },
    {
      id: '5',
      type: 'social',
      title: 'Nuevo Seguidor',
      message: 'Juan Pérez comenzó a seguir tu tienda',
      timestamp: new Date(Date.now() - 172800000),
      read: true
    },
    {
      id: '6',
      type: 'system',
      title: 'Actualización Disponible',
      message: 'Nueva versión de la app disponible con mejoras de rendimiento',
      timestamp: new Date(Date.now() - 259200000),
      read: true,
      action: { label: 'Actualizar', url: '/update' }
    }
  ])

  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    orderUpdates: true,
    promotions: true,
    social: true,
    system: false
  })

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const deleteAll = () => {
    setNotifications([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case 'promotion':
        return <Gift className="h-5 w-5 text-purple-500" />
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-500" />
      case 'social':
        return <MessageSquare className="h-5 w-5 text-pink-500" />
      case 'system':
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-500/10 text-blue-500'
      case 'promotion':
        return 'bg-purple-500/10 text-purple-500'
      case 'payment':
        return 'bg-green-500/10 text-green-500'
      case 'social':
        return 'bg-pink-500/10 text-pink-500'
      case 'system':
        return 'bg-orange-500/10 text-orange-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <Bell className="h-8 w-8 text-primary" />
                  Notificaciones
                </h1>
                <p className="text-muted-foreground">
                  Mantente al día con tus pedidos, ofertas y actualizaciones
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {unreadCount} sin leer
                </Badge>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Marcar todas
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notifications List */}
            <div className="lg:col-span-2 space-y-4">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BellOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No hay notificaciones</h3>
                    <p className="text-muted-foreground">
                      Cuando tengas nuevas notificaciones, aparecerán aquí
                    </p>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification) => (
                  <Card key={notification.id} className={`transition-all ${
                    !notification.read ? 'border-primary/50 bg-primary/5' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className={`p-3 rounded-lg ${getTypeColor(notification.type)}`}>
                          {getTypeIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold mb-1">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                            <div className="flex gap-2">
                              {notification.action && (
                                <Button size="sm" variant="outline">
                                  {notification.action.label}
                                </Button>
                              )}
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              {/* Clear All */}
              {notifications.length > 0 && (
                <div className="flex justify-center">
                  <Button variant="outline" onClick={deleteAll}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Todas
                  </Button>
                </div>
              )}
            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuración
                  </CardTitle>
                  <CardDescription>
                    Personaliza tus notificaciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones Push</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones en tiempo real
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, pushEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones por correo
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones por SMS
                      </p>
                    </div>
                    <Switch
                      checked={settings.smsEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, smsEnabled: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Notificaciones</CardTitle>
                  <CardDescription>
                    Elige qué notificaciones recibir
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Actualizaciones de Pedidos</span>
                    </div>
                    <Switch
                      checked={settings.orderUpdates}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, orderUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Promociones y Ofertas</span>
                    </div>
                    <Switch
                      checked={settings.promotions}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, promotions: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-pink-500" />
                      <span className="text-sm">Actividad Social</span>
                    </div>
                    <Switch
                      checked={settings.social}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, social: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Notificaciones del Sistema</span>
                    </div>
                    <Switch
                      checked={settings.system}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, system: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Estadísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-semibold">{notifications.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sin Leer</span>
                    <span className="font-semibold text-primary">{unreadCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Leídas</span>
                    <span className="font-semibold">{notifications.length - unreadCount}</span>
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

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Hace un momento'
  if (minutes < 60) return `Hace ${minutes}m`
  if (hours < 24) return `Hace ${hours}h`
  return `Hace ${days}d`
}

