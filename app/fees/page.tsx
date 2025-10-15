'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, TrendingUp, Award } from 'lucide-react'

export default function FeesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              Comisiones y Tarifas
            </h1>
            <p className="text-muted-foreground">
              Transparencia total en nuestras comisiones
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Badge className="mb-2">Bronze</Badge>
                <CardTitle className="text-2xl">3.5%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">$0 - $10,000</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="mb-2">Silver</Badge>
                <CardTitle className="text-2xl">2.9%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">$10,000 - $50,000</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="mb-2">Gold</Badge>
                <CardTitle className="text-2xl">2.5%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">$50,000 - $200,000</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="mb-2">Platinum</Badge>
                <CardTitle className="text-2xl">2.0%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">$200,000+</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Sin Costos Ocultos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Sin costo de registro</li>
                <li>✅ Sin costo mensual</li>
                <li>✅ Solo pagas cuando vendes</li>
                <li>✅ Retiros sin comisión</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
