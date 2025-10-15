'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { Upload, Package, DollarSign, FileText, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    condition: 'new',
    stock: '',
    freeShipping: false
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para vender')
      router.push('/login')
      return
    }

    setLoading(true)

    try {
      // Aquí iría la lógica para subir el producto
      toast.success('¡Producto publicado exitosamente!')
      router.push('/products')
    } catch (error) {
      toast.error('Error al publicar el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setImages(prev => [...prev, ...files])
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Vende tus Productos</h1>
            <p className="text-muted-foreground">
              Publica tus productos y llega a miles de compradores en Venezuela
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Información Básica */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Información Básica
                  </CardTitle>
                  <CardDescription>
                    Describe tu producto de forma clara y atractiva
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre del Producto *
                    </label>
                    <Input
                      type="text"
                      placeholder="Ej: iPhone 15 Pro Max 256GB"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Descripción *
                    </label>
                    <textarea
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Describe tu producto en detalle..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Categoría *
                      </label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="electronics">Electrónica</option>
                        <option value="computers">Computadoras</option>
                        <option value="phones">Celulares</option>
                        <option value="home">Hogar</option>
                        <option value="clothing">Ropa</option>
                        <option value="sports">Deportes</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Condición *
                      </label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        required
                      >
                        <option value="new">Nuevo</option>
                        <option value="used">Usado</option>
                        <option value="refurbished">Reacondicionado</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Precio e Inventario */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Precio e Inventario
                  </CardTitle>
                  <CardDescription>
                    Define el precio y disponibilidad de tu producto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Precio (USD) *
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Stock *
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="freeShipping"
                      checked={formData.freeShipping}
                      onChange={(e) => setFormData({ ...formData, freeShipping: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="freeShipping" className="text-sm">
                      Ofrecer envío gratis
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Imágenes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Imágenes
                  </CardTitle>
                  <CardDescription>
                    Sube hasta 10 imágenes de tu producto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Arrastra imágenes aquí o haz clic para seleccionar
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" asChild>
                        <span>Seleccionar Imágenes</span>
                      </Button>
                    </label>
                    {images.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-4">
                        {images.length} {images.length === 1 ? 'imagen' : 'imágenes'} seleccionadas
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Publicando...' : 'Publicar Producto'}
                  <Package className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

