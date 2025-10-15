'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function DropshippingCalculatorPage() {
  const [supplierPrice, setSupplierPrice] = useState('')
  const [profitMargin, setProfitMargin] = useState('50')
  const [platformCommission, setPlatformCommission] = useState('10')
  const [shippingCost, setShippingCost] = useState('')

  const calculateResults = () => {
    const cost = parseFloat(supplierPrice) || 0
    const margin = parseFloat(profitMargin) || 0
    const commission = parseFloat(platformCommission) || 0
    const shipping = parseFloat(shippingCost) || 0

    const sellingPrice = cost * (1 + margin / 100)
    const profit = sellingPrice - cost - (sellingPrice * commission / 100) - shipping
    const profitPercentage = cost > 0 ? (profit / cost) * 100 : 0
    const commissionAmount = sellingPrice * commission / 100

    return {
      sellingPrice,
      profit,
      profitPercentage,
      commissionAmount,
      totalCost: cost + shipping
    }
  }

  const results = calculateResults()

  const presets = [
    { name: 'Bajo Margen', margin: 30, commission: 10 },
    { name: 'Margen Medio', margin: 50, commission: 10 },
    { name: 'Alto Margen', margin: 100, commission: 10 },
    { name: 'Premium', margin: 150, commission: 15 }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              Calculadora de Dropshipping
            </h1>
            <p className="text-muted-foreground">
              Calcula tus márgenes de ganancia y precios de venta
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Precio del Proveedor (USD)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={supplierPrice}
                      onChange={(e) => setSupplierPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Margen de Ganancia (%)
                    </label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Comisión de la Plataforma (%)
                    </label>
                    <Input
                      type="number"
                      placeholder="10"
                      value={platformCommission}
                      onChange={(e) => setPlatformCommission(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Costo de Envío (USD)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(e.target.value)}
                    />
                  </div>

                  {/* Presets */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Plantillas Rápidas
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {presets.map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setProfitMargin(preset.margin.toString())
                            setPlatformCommission(preset.commission.toString())
                          }}
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Tips para Maximizar Ganancias
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Busca productos con bajo costo y alta demanda</li>
                    <li>• Margen recomendado: 50-100%</li>
                    <li>• Considera costos de envío en tu precio final</li>
                    <li>• Negocia mejores precios con proveedores por volumen</li>
                    <li>• Monitorea la competencia y ajusta precios</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Resultados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-sm text-muted-foreground">Precio de Venta</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(results.sellingPrice)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Costo Proveedor</span>
                        <span>-{formatPrice(parseFloat(supplierPrice) || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Costo Envío</span>
                        <span>-{formatPrice(parseFloat(shippingCost) || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Comisión ({platformCommission}%)</span>
                        <span>-{formatPrice(results.commissionAmount)}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Ganancia Neta</span>
                        <span className={`text-xl font-bold ${
                          results.profit > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {formatPrice(results.profit)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {results.profitPercentage.toFixed(1)}% de margen
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">ROI Estimado</span>
                      <span className="text-lg font-bold text-green-500">
                        {results.profitPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${Math.min(results.profitPercentage, 200)}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2 pt-4 border-t">
                    <Button className="w-full">
                      Agregar a Mi Tienda
                    </Button>
                    <Button variant="outline" className="w-full">
                      Guardar Configuración
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Ejemplos de Cálculo</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { cost: 50, margin: 50, name: 'Producto Básico' },
                { cost: 100, margin: 75, name: 'Producto Medio' },
                { cost: 200, margin: 100, name: 'Producto Premium' }
              ].map((example, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{example.name}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Costo:</span>
                        <span>{formatPrice(example.cost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Margen:</span>
                        <span>{example.margin}%</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Venta:</span>
                        <span className="text-primary">
                          {formatPrice(example.cost * (1 + example.margin / 100))}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-500">
                        <span>Ganancia:</span>
                        <span className="font-bold">
                          {formatPrice(example.cost * (example.margin / 100))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

