'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tag } from 'lucide-react'

export default function OffersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Tag className="h-8 w-8 text-primary" />
              Ofertas y Promociones
            </h1>
            <p className="text-muted-foreground">
              Las mejores ofertas en productos seleccionados
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <Badge className="mb-4">-50% OFF</Badge>
              <h3 className="font-bold mb-2">Electrónicos</h3>
              <p className="text-sm text-muted-foreground">Hasta 50% de descuento en productos seleccionados</p>
            </Card>
            <Card className="p-6">
              <Badge className="mb-4">-30% OFF</Badge>
              <h3 className="font-bold mb-2">Ropa</h3>
              <p className="text-sm text-muted-foreground">Descuentos especiales en moda</p>
            </Card>
            <Card className="p-6">
              <Badge className="mb-4">ENVÍO GRATIS</Badge>
              <h3 className="font-bold mb-2">Hogar</h3>
              <p className="text-sm text-muted-foreground">Envío gratis en compras mayores a $50</p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
