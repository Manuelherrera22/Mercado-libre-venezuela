'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, TrendingUp, DollarSign, Package, Users, Star } from 'lucide-react'

export default function SellerGuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              Guía para Vendedores
            </h1>
            <p className="text-muted-foreground">
              Todo lo que necesitas saber para vender en Mercado Libre Venezuela
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Cómo Empezar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>1. Regístrate como vendedor</p>
                <p>2. Completa tu perfil</p>
                <p>3. Publica tus primeros productos</p>
                <p>4. Empieza a vender</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Comisiones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Comisiones desde 2% según tu volumen de ventas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Gestión de Productos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Aprende a gestionar tu inventario y productos de forma eficiente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
