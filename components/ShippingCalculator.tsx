'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Truck, MapPin, DollarSign, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ShippingCalculatorProps {
  supplier: {
    state: string
    city: string
    shippingZones: Array<{
      state: string
      cities: string[]
      cost: number
      estimatedDays: number
    }>
    freeShippingThreshold: number
  }
  orderValue: number
}

export function ShippingCalculator({ supplier, orderValue }: ShippingCalculatorProps) {
  const [destinationState, setDestinationState] = useState('')
  const [destinationCity, setDestinationCity] = useState('')

  const states = [
    'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas',
    'Bolívar', 'Carabobo', 'Cojedes', 'Delta Amacuro',
    'Distrito Capital', 'Falcón', 'Guárico', 'Lara',
    'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta',
    'Portuguesa', 'Sucre', 'Táchira', 'Trujillo',
    'Vargas', 'Yaracuy', 'Zulia'
  ]

  const calculateShipping = () => {
    if (!destinationState) return null

    // Buscar zona de envío
    const shippingZone = supplier.shippingZones.find(
      zone => zone.state === destinationState && 
      (zone.cities.includes(destinationCity) || zone.cities.length === 0)
    )

    let shippingCost = 0
    let estimatedDays = 7

    if (shippingZone) {
      shippingCost = shippingZone.cost
      estimatedDays = shippingZone.estimatedDays
    } else {
      // Costo por defecto según distancia
      shippingCost = 10
      estimatedDays = 7
    }

    // Envío gratis si supera el threshold
    const freeShipping = orderValue >= supplier.freeShippingThreshold
    if (freeShipping) {
      shippingCost = 0
    }

    return { shippingCost, estimatedDays, freeShipping }
  }

  const result = calculateShipping()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Calculadora de Envío
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-sm text-muted-foreground mb-1">Origen</p>
          <p className="font-medium">{supplier.city}, {supplier.state}</p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Estado de Destino *</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={destinationState}
            onChange={(e) => {
              setDestinationState(e.target.value)
              setDestinationCity('')
            }}
          >
            <option value="">Seleccionar estado...</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {destinationState && (
          <div>
            <label className="text-sm font-medium mb-2 block">Ciudad de Destino</label>
            <Input
              type="text"
              placeholder="Ej: Caracas"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
            />
          </div>
        )}

        {result && (
          <div className="space-y-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Costo de Envío</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(result.shippingCost)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Tiempo Estimado
              </span>
              <span className="font-semibold">{result.estimatedDays} días</span>
            </div>

            {result.freeShipping && (
              <Badge className="w-full justify-center bg-green-500">
                ✓ Envío Gratis
              </Badge>
            )}

            {!result.freeShipping && orderValue > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                Agrega {formatPrice(supplier.freeShippingThreshold - orderValue)} más para envío gratis
              </div>
            )}
          </div>
        )}

        <Button 
          className="w-full" 
          disabled={!destinationState}
        >
          Calcular Envío
        </Button>
      </CardContent>
    </Card>
  )
}

