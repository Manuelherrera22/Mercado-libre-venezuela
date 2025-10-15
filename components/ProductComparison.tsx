'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, ShoppingCart, Star, Check, X as XIcon } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  specs: Record<string, string>
}

interface ProductComparisonProps {
  products: Product[]
  onClose: () => void
}

export function ProductComparison({ products, onClose }: ProductComparisonProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(products)

  const allSpecKeys = Array.from(
    new Set(selectedProducts.flatMap(p => Object.keys(p.specs)))
  )

  const removeProduct = (id: string) => {
    const newProducts = selectedProducts.filter(p => p.id !== id)
    setSelectedProducts(newProducts)
    if (newProducts.length === 0) {
      onClose()
    }
  }

  const getBestValue = (specKey: string) => {
    // Lógica simple para determinar el mejor valor
    // En producción, esto sería más sofisticado
    return selectedProducts[0]?.id
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Comparar Productos</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-secondary/50">
                <tr>
                  <th className="p-4 text-left sticky left-0 bg-secondary/50 z-10 min-w-[200px]">
                    Características
                  </th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="p-4 text-center min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="absolute top-0 right-0 p-1 hover:bg-destructive/20 rounded"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                        <div className="relative w-32 h-32 mx-auto mb-3 rounded-lg overflow-hidden bg-secondary">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-primary mb-3">
                          {formatPrice(product.price)}
                        </p>
                        <Button size="sm" className="w-full">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Agregar al Carrito
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSpecKeys.map((specKey) => {
                  const bestValueId = getBestValue(specKey)
                  return (
                    <tr key={specKey} className="border-b hover:bg-secondary/30">
                      <td className="p-4 font-medium sticky left-0 bg-background z-10">
                        {specKey}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className={`p-4 text-center ${
                            product.id === bestValueId ? 'bg-green-500/10' : ''
                          }`}
                        >
                          {product.specs[specKey] ? (
                            <span className="flex items-center justify-center gap-1">
                              {product.specs[specKey]}
                              {product.id === bestValueId && (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

