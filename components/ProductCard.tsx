'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Truck, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    freeShipping?: boolean
    badge?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-primary">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              -{discount}%
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              // Implementar favoritos
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.freeShipping && (
              <div className="flex items-center text-xs text-green-500">
                <Truck className="h-3 w-3 mr-1" />
                Envío gratis
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

