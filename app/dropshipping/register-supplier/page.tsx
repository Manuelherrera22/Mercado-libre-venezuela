'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Building2, 
  MapPin, 
  Phone, 
  DollarSign, 
  Truck,
  CheckCircle,
  Upload
} from 'lucide-react'

export default function RegisterSupplierPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Información básica
    name: '',
    rif: '',
    email: '',
    phone: '',
    whatsapp: '',
    
    // Ubicación
    state: '',
    city: '',
    address: '',
    zipCode: '',
    
    // Métodos de pago
    paymentMethods: {
      pagomovil: { enabled: false, phone: '', ci: '' },
      transferencia: { enabled: false, bank: '', account: '' },
      zelle: { enabled: false, email: '' }
    },
    
    // Negocio
    businessType: '',
    categories: [],
    
    // Dropshipping
    minOrder: '',
    commission: '15',
    freeShippingThreshold: '50',
    
    // Envíos
    shippingZones: []
  })

  const states = [
    'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas',
    'Bolívar', 'Carabobo', 'Cojedes', 'Delta Amacuro',
    'Distrito Capital', 'Falcón', 'Guárico', 'Lara',
    'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta',
    'Portuguesa', 'Sucre', 'Táchira', 'Trujillo',
    'Vargas', 'Yaracuy', 'Zulia'
  ]

  const businessTypes = [
    { value: 'retailer', label: 'Minorista' },
    { value: 'wholesaler', label: 'Mayorista' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'distributor', label: 'Distribuidor' }
  ]

  const categories = [
    'Electronics', 'Computers', 'Phones', 'Audio',
    'Clothing', 'Accessories', 'Shoes', 'Bags',
    'Home', 'Garden', 'Furniture', 'Decor',
    'Beauty', 'Health', 'Sports', 'Toys'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              Registro de Proveedor Local
            </h1>
            <p className="text-muted-foreground">
              Únete a nuestra red de proveedores y comienza a vender en toda Venezuela
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Paso {step} de 4</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / 4) * 100)}% completado</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Información Básica */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                  <CardDescription>
                    Datos principales de tu negocio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre del Negocio *
                    </label>
                    <Input
                      type="text"
                      placeholder="Ej: TechVenezuela Distribuidora"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        RIF *
                      </label>
                      <Input
                        type="text"
                        placeholder="J-12345678-9"
                        value={formData.rif}
                        onChange={(e) => setFormData({ ...formData, rif: e.target.value.toUpperCase() })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tipo de Negocio *
                      </label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        {businessTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Teléfono *
                      </label>
                      <Input
                        type="tel"
                        placeholder="0414-123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      WhatsApp (Opcional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="0414-123-4567"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>

                  <Button type="button" onClick={() => setStep(2)} className="w-full">
                    Siguiente: Ubicación
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Ubicación */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                  <CardDescription>
                    ¿Dónde se encuentra tu negocio?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Estado *
                      </label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required
                      >
                        <option value="">Seleccionar estado...</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Ciudad *
                      </label>
                      <Input
                        type="text"
                        placeholder="Ej: Caracas"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Dirección Completa *
                    </label>
                    <Input
                      type="text"
                      placeholder="Calle, número, sector"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Código Postal (Opcional)
                    </label>
                    <Input
                      type="text"
                      placeholder="1010"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Anterior
                    </Button>
                    <Button type="button" onClick={() => setStep(3)} className="flex-1">
                      Siguiente: Métodos de Pago
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Métodos de Pago */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                  <CardDescription>
                    ¿Cómo quieres recibir pagos?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pago Móvil */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.paymentMethods.pagomovil.enabled}
                          onChange={(e) => setFormData({
                            ...formData,
                            paymentMethods: {
                              ...formData.paymentMethods,
                              pagomovil: { ...formData.paymentMethods.pagomovil, enabled: e.target.checked }
                            }
                          })}
                          className="rounded"
                        />
                        <label className="font-medium">Pago Móvil</label>
                      </div>
                      <Badge>Popular</Badge>
                    </div>
                    {formData.paymentMethods.pagomovil.enabled && (
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Teléfono</label>
                          <Input
                            type="tel"
                            placeholder="0414-123-4567"
                            value={formData.paymentMethods.pagomovil.phone}
                            onChange={(e) => setFormData({
                              ...formData,
                              paymentMethods: {
                                ...formData.paymentMethods,
                                pagomovil: { ...formData.paymentMethods.pagomovil, phone: e.target.value }
                              }
                            })}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Cédula</label>
                          <Input
                            type="text"
                            placeholder="V-12345678"
                            value={formData.paymentMethods.pagomovil.ci}
                            onChange={(e) => setFormData({
                              ...formData,
                              paymentMethods: {
                                ...formData.paymentMethods,
                                pagomovil: { ...formData.paymentMethods.pagomovil, ci: e.target.value }
                              }
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Transferencia */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.transferencia.enabled}
                        onChange={(e) => setFormData({
                          ...formData,
                          paymentMethods: {
                            ...formData.paymentMethods,
                            transferencia: { ...formData.paymentMethods.transferencia, enabled: e.target.checked }
                          }
                        })}
                        className="rounded"
                      />
                      <label className="font-medium">Transferencia Bancaria</label>
                    </div>
                    {formData.paymentMethods.transferencia.enabled && (
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Banco</label>
                          <Input
                            type="text"
                            placeholder="Banco de Venezuela"
                            value={formData.paymentMethods.transferencia.bank}
                            onChange={(e) => setFormData({
                              ...formData,
                              paymentMethods: {
                                ...formData.paymentMethods,
                                transferencia: { ...formData.paymentMethods.transferencia, bank: e.target.value }
                              }
                            })}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Número de Cuenta</label>
                          <Input
                            type="text"
                            placeholder="0102-0156-7890123456"
                            value={formData.paymentMethods.transferencia.account}
                            onChange={(e) => setFormData({
                              ...formData,
                              paymentMethods: {
                                ...formData.paymentMethods,
                                transferencia: { ...formData.paymentMethods.transferencia, account: e.target.value }
                              }
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Zelle */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.zelle.enabled}
                        onChange={(e) => setFormData({
                          ...formData,
                          paymentMethods: {
                            ...formData.paymentMethods,
                            zelle: { ...formData.paymentMethods.zelle, enabled: e.target.checked }
                          }
                        })}
                        className="rounded"
                      />
                      <label className="font-medium">Zelle</label>
                    </div>
                    {formData.paymentMethods.zelle.enabled && (
                      <div className="mt-4">
                        <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.paymentMethods.zelle.email}
                          onChange={(e) => setFormData({
                            ...formData,
                            paymentMethods: {
                              ...formData.paymentMethods,
                              zelle: { ...formData.paymentMethods.zelle, email: e.target.value }
                            }
                          })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Anterior
                    </Button>
                    <Button type="button" onClick={() => setStep(4)} className="flex-1">
                      Siguiente: Configuración
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Configuración */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Dropshipping</CardTitle>
                  <CardDescription>
                    Define tus términos y condiciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Categorías de Productos *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.categories.includes(cat)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, categories: [...formData.categories, cat] })
                              } else {
                                setFormData({ ...formData, categories: formData.categories.filter(c => c !== cat) })
                              }
                            }}
                            className="rounded"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Pedido Mínimo (USD) *
                      </label>
                      <Input
                        type="number"
                        placeholder="50"
                        value={formData.minOrder}
                        onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Comisión (%) *
                      </label>
                      <Input
                        type="number"
                        placeholder="15"
                        value={formData.commission}
                        onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Envío Gratis desde (USD) *
                      </label>
                      <Input
                        type="number"
                        placeholder="50"
                        value={formData.freeShippingThreshold}
                        onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">Ventajas de ser Proveedor Local</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Acceso a miles de vendedores en Venezuela</li>
                          <li>• Gestión automática de pedidos</li>
                          <li>• Sistema de pagos integrado</li>
                          <li>• Dashboard con métricas y analytics</li>
                          <li>• Soporte técnico incluido</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(3)} className="flex-1">
                      Anterior
                    </Button>
                    <Button type="submit" className="flex-1">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Registrar Proveedor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

