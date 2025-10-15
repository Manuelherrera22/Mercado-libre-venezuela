'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
}

interface SearchFilters {
  query: string
  category: string
  minPrice: number
  maxPrice: number
  condition: string[]
  freeShipping: boolean
  rating: number
  sortBy: string
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    condition: [],
    freeShipping: false,
    rating: 0,
    sortBy: 'relevance'
  })

  const categories = [
    'Electrónica',
    'Computadoras',
    'Celulares',
    'Hogar',
    'Ropa',
    'Deportes',
    'Libros',
    'Juguetes'
  ]

  const conditions = ['Nuevo', 'Usado', 'Reacondicionado']

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({
      query: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      condition: [],
      freeShipping: false,
      rating: 0,
      sortBy: 'relevance'
    })
  }

  const toggleCondition = (condition: string) => {
    setFilters(prev => ({
      ...prev,
      condition: prev.condition.includes(condition)
        ? prev.condition.filter(c => c !== condition)
        : [...prev.condition, condition]
    }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Búsqueda Avanzada
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Búsqueda Principal */}
        <div>
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Filtros Avanzados */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t animate-fadeIn">
            {/* Categoría */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categoría</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rango de Precio */}
            <div>
              <label className="text-sm font-medium mb-2 block">Rango de Precio</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Mínimo"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                />
                <Input
                  type="number"
                  placeholder="Máximo"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Condición */}
            <div>
              <label className="text-sm font-medium mb-2 block">Condición</label>
              <div className="flex flex-wrap gap-2">
                {conditions.map(condition => (
                  <Badge
                    key={condition}
                    variant={filters.condition.includes(condition) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleCondition(condition)}
                  >
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Envío Gratis */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="freeShipping"
                checked={filters.freeShipping}
                onChange={(e) => setFilters({ ...filters, freeShipping: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="freeShipping" className="text-sm">
                Solo envío gratis
              </label>
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Calificación mínima: {filters.rating > 0 ? `${filters.rating}+ ⭐` : 'Cualquiera'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Ordenar */}
            <div>
              <label className="text-sm font-medium mb-2 block">Ordenar por</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
                <option value="newest">Más Recientes</option>
                <option value="popular">Más Vendidos</option>
              </select>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <X className="mr-2 h-4 w-4" />
            Limpiar
          </Button>
        </div>

        {/* Filtros Activos */}
        {(filters.category || filters.condition.length > 0 || filters.freeShipping) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {filters.category && (
              <Badge variant="secondary">
                {filters.category}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, category: '' })} />
              </Badge>
            )}
            {filters.condition.map(c => (
              <Badge key={c} variant="secondary">
                {c}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => toggleCondition(c)} />
              </Badge>
            ))}
            {filters.freeShipping && (
              <Badge variant="secondary">
                Envío gratis
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, freeShipping: false })} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

