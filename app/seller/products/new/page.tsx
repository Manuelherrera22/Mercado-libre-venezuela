'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SellerRoute } from '@/components/SellerRoute'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Save, 
  Eye, 
  Sparkles,
  DollarSign,
  Package,
  Image as ImageIcon,
  Tag,
  TrendingUp,
  Bot,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Camera,
  Link,
  BarChart3,
  Zap
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

interface ProductFormData {
  // Basic Info
  name: string
  description: string
  shortDescription: string
  category: string
  subcategory: string
  brand: string
  
  // Pricing
  price: number
  comparePrice: number
  costPrice: number
  margin: number
  
  // Inventory
  sku: string
  stock: number
  trackInventory: boolean
  allowBackorder: boolean
  
  // Shipping
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  freeShipping: boolean
  shippingCost: number
  
  // SEO
  metaTitle: string
  metaDescription: string
  slug: string
  
  // Media
  images: string[]
  videos: string[]
  
  // Attributes
  attributes: Record<string, string>
  
  // Dropshipping
  supplierInfo: {
    name: string
    url: string
    productId: string
  }
  
  // AI Suggestions
  aiSuggestions: {
    title: string
    description: string
    price: number
    tags: string[]
    category: string
    confidence: number
  }
}

export default function NewProductPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    brand: '',
    price: 0,
    comparePrice: 0,
    costPrice: 0,
    margin: 0,
    sku: '',
    stock: 0,
    trackInventory: true,
    allowBackorder: false,
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    freeShipping: false,
    shippingCost: 0,
    metaTitle: '',
    metaDescription: '',
    slug: '',
    images: [],
    videos: [],
    attributes: {},
    supplierInfo: { name: '', url: '', productId: '' },
    aiSuggestions: {
      title: '',
      description: '',
      price: 0,
      tags: [],
      category: '',
      confidence: 0
    }
  })

  const categories = [
    { value: 'electronics', label: 'Electrónicos', subcategories: ['smartphones', 'laptops', 'audio', 'gaming'] },
    { value: 'clothing', label: 'Ropa', subcategories: ['men', 'women', 'kids', 'accessories'] },
    { value: 'home', label: 'Hogar', subcategories: ['furniture', 'decor', 'kitchen', 'bedding'] },
    { value: 'sports', label: 'Deportes', subcategories: ['fitness', 'outdoor', 'team-sports', 'water-sports'] },
    { value: 'beauty', label: 'Belleza', subcategories: ['skincare', 'makeup', 'hair', 'fragrance'] },
    { value: 'automotive', label: 'Automotriz', subcategories: ['parts', 'accessories', 'tools', 'care'] }
  ]

  const brands = [
    'Apple', 'Samsung', 'Sony', 'LG', 'Nike', 'Adidas', 'Zara', 'H&M',
    'Amazon Basics', 'Generic', 'Otras marcas'
  ]

  // Auto-generate SKU
  useEffect(() => {
    if (formData.name && formData.category) {
      const sku = `${formData.category.toUpperCase().slice(0,3)}-${Date.now().toString().slice(-6)}`
      setFormData(prev => ({ ...prev, sku }))
    }
  }, [formData.name, formData.category])

  // Auto-generate slug
  useEffect(() => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name])

  // Calculate margin
  useEffect(() => {
    if (formData.price && formData.costPrice) {
      const margin = ((formData.price - formData.costPrice) / formData.costPrice) * 100
      setFormData(prev => ({ ...prev, margin: Math.round(margin * 100) / 100 }))
    }
  }, [formData.price, formData.costPrice])

  const generateAISuggestions = async () => {
    setAiLoading(true)
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const suggestions = {
        title: `${formData.name} - ${formData.brand || 'Premium'} - Envío Gratis`,
        description: `Descubre el increíble ${formData.name}. ${formData.brand ? `Desarrollado por ${formData.brand}, ` : ''}este producto ofrece calidad premium y excelente relación precio-calidad. Perfecto para tus necesidades diarias. ¡Envío gratis a toda Venezuela!`,
        price: formData.costPrice ? formData.costPrice * 2.5 : 0,
        tags: [formData.category, formData.brand, 'envío gratis', 'calidad', 'premium'],
        category: formData.category,
        confidence: 87
      }
      
      setFormData(prev => ({ ...prev, aiSuggestions: suggestions }))
      toast.success('Sugerencias de IA generadas')
    } catch (error) {
      toast.error('Error al generar sugerencias')
    } finally {
      setAiLoading(false)
    }
  }

  const applyAISuggestion = (field: keyof typeof formData.aiSuggestions) => {
    const suggestion = formData.aiSuggestions[field]
    if (field === 'title') {
      setFormData(prev => ({ ...prev, name: suggestion as string }))
    } else if (field === 'description') {
      setFormData(prev => ({ ...prev, description: suggestion as string }))
    } else if (field === 'price') {
      setFormData(prev => ({ ...prev, price: suggestion as number }))
    } else if (field === 'category') {
      setFormData(prev => ({ ...prev, category: suggestion as string }))
    }
    toast.success('Sugerencia aplicada')
  }

  const addImage = (url: string) => {
    if (formData.images.length < 10) {
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Producto creado exitosamente')
      router.push('/seller/dashboard')
    } catch (error) {
      toast.error('Error al crear producto')
    } finally {
      setSaving(false)
    }
  }

  const steps = [
    { id: 1, title: 'Información Básica', icon: Package },
    { id: 2, title: 'Precios e Inventario', icon: DollarSign },
    { id: 3, title: 'Imágenes y Media', icon: ImageIcon },
    { id: 4, title: 'SEO y Optimización', icon: TrendingUp },
    { id: 5, title: 'Dropshipping', icon: Link }
  ]

  return (
    <SellerRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Plus className="h-8 w-8 text-primary" />
                    Nuevo Producto
                  </h1>
                  <p className="text-muted-foreground">
                    Crea un nuevo producto con la ayuda de IA
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewMode(!previewMode)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {previewMode ? 'Editar' : 'Vista Previa'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={generateAISuggestions}
                    disabled={aiLoading}
                  >
                    <Bot className={`h-4 w-4 mr-2 ${aiLoading ? 'animate-spin' : ''}`} />
                    IA Assistant
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((stepItem, index) => (
                  <div key={stepItem.id} className="flex items-center">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      step >= stepItem.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <stepItem.icon className="h-4 w-4" />
                      <span className="hidden md:block text-sm font-medium">{stepItem.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        step > stepItem.id ? 'bg-primary' : 'bg-secondary'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Información Básica
                        </CardTitle>
                        <CardDescription>
                          Información fundamental del producto
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* AI Suggestions */}
                        {formData.aiSuggestions.title && (
                          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <Bot className="h-5 w-5 text-purple-500" />
                              <span className="font-semibold text-purple-500">Sugerencias de IA</span>
                              <Badge variant="outline" className="text-purple-500">
                                {formData.aiSuggestions.confidence}% confianza
                              </Badge>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Título sugerido:</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => applyAISuggestion('title')}
                                >
                                  Aplicar
                                </Button>
                              </div>
                              <p className="text-sm bg-background p-2 rounded border">
                                {formData.aiSuggestions.title}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Nombre del Producto *</label>
                            <Input
                              placeholder="iPhone 15 Pro Max 256GB"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Marca</label>
                            <select
                              className="w-full p-2 border rounded-md bg-background"
                              value={formData.brand}
                              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            >
                              <option value="">Seleccionar marca</option>
                              {brands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Descripción Corta</label>
                          <Input
                            placeholder="Breve descripción del producto..."
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Descripción Completa</label>
                          <textarea
                            className="w-full p-3 border rounded-md bg-background min-h-[120px]"
                            placeholder="Descripción detallada del producto..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Categoría *</label>
                            <select
                              className="w-full p-2 border rounded-md bg-background"
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                              required
                            >
                              <option value="">Seleccionar categoría</option>
                              {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Subcategoría</label>
                            <select
                              className="w-full p-2 border rounded-md bg-background"
                              value={formData.subcategory}
                              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                              disabled={!formData.category}
                            >
                              <option value="">Seleccionar subcategoría</option>
                              {formData.category && categories
                                .find(cat => cat.value === formData.category)
                                ?.subcategories.map(sub => (
                                  <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">SKU</label>
                          <Input
                            placeholder="Auto-generado"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: Pricing & Inventory */}
                  {step === 2 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Precios e Inventario
                        </CardTitle>
                        <CardDescription>
                          Configura precios y gestión de inventario
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Precio de Venta *</label>
                            <Input
                              type="number"
                              placeholder="99.99"
                              value={formData.price || ''}
                              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Precio de Comparación</label>
                            <Input
                              type="number"
                              placeholder="149.99"
                              value={formData.comparePrice || ''}
                              onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Precio de Costo</label>
                            <Input
                              type="number"
                              placeholder="49.99"
                              value={formData.costPrice || ''}
                              onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                            />
                          </div>
                        </div>

                        {formData.margin > 0 && (
                          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium text-green-500">
                                Margen de ganancia: {formData.margin}%
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Stock Inicial</label>
                            <Input
                              type="number"
                              placeholder="100"
                              value={formData.stock || ''}
                              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Opciones de Inventario</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={formData.trackInventory}
                                onChange={(e) => setFormData({ ...formData, trackInventory: e.target.checked })}
                              />
                              <span className="text-sm">Rastrear inventario</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={formData.allowBackorder}
                                onChange={(e) => setFormData({ ...formData, allowBackorder: e.target.checked })}
                              />
                              <span className="text-sm">Permitir pedidos sin stock</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Peso (kg)</label>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="0.5"
                              value={formData.weight || ''}
                              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Envío</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={formData.freeShipping}
                                onChange={(e) => setFormData({ ...formData, freeShipping: e.target.checked })}
                              />
                              <span className="text-sm">Envío gratis</span>
                            </div>
                          </div>
                        </div>

                        {!formData.freeShipping && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Costo de Envío</label>
                            <Input
                              type="number"
                              placeholder="5.99"
                              value={formData.shippingCost || ''}
                              onChange={(e) => setFormData({ ...formData, shippingCost: Number(e.target.value) })}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(Math.max(1, step - 1))}
                      disabled={step === 1}
                    >
                      Anterior
                    </Button>
                    {step < 5 ? (
                      <Button
                        type="button"
                        onClick={() => setStep(Math.min(5, step + 1))}
                      >
                        Siguiente
                      </Button>
                    ) : (
                      <Button type="submit" disabled={saving}>
                        {saving ? 'Guardando...' : 'Crear Producto'}
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Margen</span>
                      <span className="font-semibold text-green-500">
                        {formData.margin > 0 ? `${formData.margin}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Precio Final</span>
                      <span className="font-semibold">
                        ${formData.price > 0 ? formData.price.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stock</span>
                      <span className="font-semibold">
                        {formData.stock || 'No definido'}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Assistant */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-purple-500" />
                      IA Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={generateAISuggestions}
                      disabled={aiLoading}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {aiLoading ? 'Analizando...' : 'Generar Sugerencias'}
                    </Button>
                    
                    {formData.aiSuggestions.confidence > 0 && (
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Sugerencias Listas</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Confianza: {formData.aiSuggestions.confidence}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">💡 Tips para Éxito</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>Usa la IA para optimizar títulos y descripciones</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Mantén un margen mínimo del 50%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ImageIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Agrega al menos 3 imágenes de calidad</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span>Optimiza SEO para mejor visibilidad</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SellerRoute>
  )
}
