'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Store, 
  CheckCircle, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Shield,
  Star,
  ArrowRight,
  Building2,
  FileText,
  Phone
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

export default function BecomeSellerPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    rif: '',
    businessType: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    description: '',
    categories: [] as string[],
    acceptTerms: false
  })
  const { upgradeToSeller, user } = useAuth()
  const router = useRouter()

  const businessTypes = [
    { value: 'individual', label: 'Persona Natural' },
    { value: 'company', label: 'Empresa' },
    { value: 'cooperative', label: 'Cooperativa' },
    { value: 'partnership', label: 'Sociedad' }
  ]

  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Beauty',
    'Books', 'Toys', 'Automotive', 'Health', 'Food'
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Gana Dinero',
      description: 'Vende productos y gana comisiones por cada venta'
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento',
      description: 'Escala tu negocio sin límites de inventario'
    },
    {
      icon: Users,
      title: 'Alcance Global',
      description: 'Vende a clientes en toda Venezuela'
    },
    {
      icon: Shield,
      title: 'Protección',
      description: 'Garantía de pago y protección contra fraudes'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones')
      return
    }

    setLoading(true)
    try {
      await upgradeToSeller(formData)
      toast.success('¡Felicidades! Ahora eres un vendedor oficial')
      router.push('/seller/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al registrarse como vendedor')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Acceso Requerido</h2>
            <p className="text-muted-foreground mb-4">
              Debes iniciar sesión para convertirte en vendedor
            </p>
            <Button onClick={() => router.push('/login')}>
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (user.role === 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">¡Ya eres Vendedor!</h2>
            <p className="text-muted-foreground mb-4">
              Tu cuenta ya está configurada como vendedor
            </p>
            <Button onClick={() => router.push('/seller/dashboard')}>
              Ir al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-500 mb-4">
              <Store className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Conviértete en <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Vendedor</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Únete a miles de vendedores exitosos y comienza a ganar dinero vendiendo productos
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Información del Negocio
                  </CardTitle>
                  <CardDescription>
                    Completa la información de tu negocio para comenzar a vender
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Business Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Nombre del Negocio</label>
                        <Input
                          placeholder="Mi Tienda Online"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">RIF</label>
                        <Input
                          placeholder="V-12345678-9"
                          value={formData.rif}
                          onChange={(e) => setFormData({ ...formData, rif: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tipo de Negocio</label>
                        <select
                          className="w-full p-2 border rounded-md bg-background"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          required
                        >
                          <option value="">Selecciona tipo</option>
                          {businessTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Teléfono</label>
                        <Input
                          placeholder="+58 412 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Dirección
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Calle</label>
                          <Input
                            placeholder="Calle 123, Casa 45"
                            value={formData.address.street}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              address: { ...formData.address, street: e.target.value }
                            })}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Ciudad</label>
                          <Input
                            placeholder="Caracas"
                            value={formData.address.city}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              address: { ...formData.address, city: e.target.value }
                            })}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Estado</label>
                          <Input
                            placeholder="Distrito Capital"
                            value={formData.address.state}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              address: { ...formData.address, state: e.target.value }
                            })}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Código Postal</label>
                          <Input
                            placeholder="1010"
                            value={formData.address.zipCode}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              address: { ...formData.address, zipCode: e.target.value }
                            })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Categorías de Productos</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryToggle(category)}
                            className={`p-2 rounded-lg text-sm border transition-all ${
                              formData.categories.includes(category)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-secondary'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Descripción del Negocio</label>
                      <textarea
                        className="w-full p-3 border rounded-md bg-background min-h-[100px]"
                        placeholder="Describe tu negocio, experiencia y qué productos planeas vender..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                        className="mt-1"
                        required
                      />
                      <label htmlFor="terms" className="text-sm">
                        Acepto los{' '}
                        <a href="/terms" className="text-primary hover:underline">
                          términos y condiciones
                        </a>{' '}
                        y la{' '}
                        <a href="/privacy" className="text-primary hover:underline">
                          política de privacidad
                        </a>
                      </label>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Procesando...' : 'Convertirme en Vendedor'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Estadísticas de Vendedores</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Vendedores Activos</span>
                      <span className="font-semibold">12,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ventas Mensuales</span>
                      <span className="font-semibold">$2.4M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Productos Vendidos</span>
                      <span className="font-semibold">156K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Story */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Historia de Éxito
                  </h3>
                  <blockquote className="text-sm text-muted-foreground mb-4">
                    "Comencé vendiendo 5 productos y ahora tengo más de 500. 
                    La plataforma me ayudó a escalar mi negocio sin inversión inicial."
                  </blockquote>
                  <div className="text-sm">
                    <strong>María González</strong><br />
                    <span className="text-muted-foreground">Vendedora desde 2023</span>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">¿Necesitas Ayuda?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nuestro equipo de soporte está aquí para ayudarte a comenzar
                  </p>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contactar Soporte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
