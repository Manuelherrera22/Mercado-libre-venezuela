'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

interface OrderTrackingProps {
  orderNumber: string
  status: string
  trackingNumber?: string
  estimatedDelivery?: Date
}

export function OrderTracking({ orderNumber, status, trackingNumber, estimatedDelivery }: OrderTrackingProps) {
  const statusSteps = [
    { key: 'pending', label: 'Pendiente', icon: Clock },
    { key: 'confirmed', label: 'Confirmado', icon: CheckCircle },
    { key: 'processing', label: 'Procesando', icon: Package },
    { key: 'shipped', label: 'Enviado', icon: Truck },
    { key: 'delivered', label: 'Entregado', icon: CheckCircle }
  ]

  const currentStepIndex = statusSteps.findIndex(s => s.key === status)

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pendiente', variant: 'secondary' },
      confirmed: { label: 'Confirmado', variant: 'default' },
      processing: { label: 'Procesando', variant: 'default' },
      shipped: { label: 'Enviado', variant: 'default' },
      delivered: { label: 'Entregado', variant: 'outline' },
      cancelled: { label: 'Cancelado', variant: 'destructive' }
    }
    const statusInfo = statusMap[status]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Seguimiento de Pedido</h3>
            {getStatusBadge(status)}
          </div>
          <p className="text-sm text-muted-foreground">Número: {orderNumber}</p>
          {trackingNumber && (
            <p className="text-sm text-muted-foreground">Tracking: {trackingNumber}</p>
          )}
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {statusSteps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.key} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 pt-1">
                  <p className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                    {step.label}
                  </p>
                  {index === 0 && isCompleted && (
                    <p className="text-xs text-muted-foreground">Pedido recibido</p>
                  )}
                  {index === 1 && isCompleted && (
                    <p className="text-xs text-muted-foreground">Pago confirmado</p>
                  )}
                  {index === 2 && isCompleted && (
                    <p className="text-xs text-muted-foreground">Preparando envío</p>
                  )}
                  {index === 3 && isCompleted && (
                    <p className="text-xs text-muted-foreground">En camino al destino</p>
                  )}
                  {index === 4 && isCompleted && (
                    <p className="text-xs text-muted-foreground">Entregado exitosamente</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {estimatedDelivery && (
          <div className="mt-6 p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Fecha Estimada de Entrega</p>
            <p className="font-semibold">
              {new Date(estimatedDelivery).toLocaleDateString('es-VE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

