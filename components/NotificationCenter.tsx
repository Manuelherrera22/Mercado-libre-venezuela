'use client'

import React, { useState } from 'react'
import { Bell, X, Check, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNotifications } from '@/contexts/NotificationContext'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      case 'warning':
        return 'text-yellow-500'
      default:
        return 'text-blue-500'
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <Card className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-hidden z-50 animate-fadeIn">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                  {unreadCount > 0 && (
                    <Badge variant="secondary">{unreadCount} nuevas</Badge>
                  )}
                </CardTitle>
                <div className="flex gap-1">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={markAllAsRead}
                      title="Marcar todas como leídas"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tienes notificaciones</p>
                </div>
              ) : (
                <div className="max-h-[500px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-secondary/50 transition-colors ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`text-2xl ${getColor(notification.type)}`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, {
                                addSuffix: true,
                                locale: es
                              })}
                            </span>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => markAsRead(notification.id)}
                                  title="Marcar como leída"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeNotification(notification.id)}
                                title="Eliminar"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {notification.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 w-full"
                              onClick={() => {
                                notification.action?.onClick()
                                markAsRead(notification.id)
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            {notifications.length > 0 && (
              <div className="border-t p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-destructive"
                  onClick={clearAll}
                >
                  Limpiar todas las notificaciones
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  )
}

