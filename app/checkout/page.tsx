'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  CheckCircle,
  MapPin,
  Truck,
  Lock
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('¡Pago procesado exitosamente!')
      clearCart()
      router.push('/profile?tab=orders')
    } catch (error) {
      toast.error('Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  const paymentMethods = [
    {
      id: 'transfer',
      name: 'Transferencia Bancaria',
      icon: Wallet,
      description: 'Pago directo a cuenta bancaria'
    },
    {
      id: 'pagomovil',
      name: 'Pago Móvil',
      icon: Smartphone,
      description: 'Pago rápido con tu teléfono'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      icon: CreditCard,
      description: 'Pago internacional'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
            <p className="text-muted-foreground">
              Revisa tu pedido y completa el pago
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Dirección de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                      <Input defaultValue={user?.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Teléfono</label>
                      <Input placeholder="+58 212-555-0100" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Dirección</label>
                    <Input placeholder="Calle y número" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ciudad</label>
                      <Input placeholder="Caracas" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Estado</label>
                      <Input placeholder="Distrito Capital" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Código Postal</label>
                    <Input placeholder="1010" />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-secondary hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${
                            paymentMethod === method.id ? 'bg-primary/20' : 'bg-secondary'
                          }`}>
                            <method.icon className={`h-6 w-6 ${
                              paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{method.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                          {paymentMethod === method.id && (
                            <CheckCircle className="h-6 w-6 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Payment Details */}
                  {paymentMethod && (
                    <div className="mt-6 p-4 rounded-lg bg-secondary/50">
                      <h4 className="font-semibold mb-3">Instrucciones de Pago</h4>
                      {paymentMethod === 'transfer' && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Banco:</strong> Banco de Venezuela</p>
                          <p><strong>Cuenta:</strong> 0102-0156-7890123456</p>
                          <p><strong>Titular:</strong> MercadoLibre VE</p>
                          <p className="text-muted-foreground mt-3">
                            Realiza la transferencia y envía el comprobante por email
                          </p>
                        </div>
                      )}
                      {paymentMethod === 'pagomovil' && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Teléfono:</strong> 0414-123-4567</p>
                          <p><strong>CI:</strong> V-12345678</p>
                          <p><strong>Banco:</strong> Banco de Venezuela</p>
                          <p className="text-muted-foreground mt-3">
                            Realiza el pago móvil y envía el comprobante
                          </p>
                        </div>
                      )}
                      {paymentMethod === 'zelle' && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Email:</strong> pagos@mercadolibreve.com</p>
                          <p><strong>Nombre:</strong> MercadoLibre Venezuela</p>
                          <p className="text-muted-foreground mt-3">
                            Realiza el pago por Zelle y envía el comprobante
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Cantidad: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envío</span>
                        <span className="text-green-500">Gratis</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Impuestos</span>
                        <span>$0.00</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-primary">{formatPrice(total)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={loading}
                    >
                      {loading ? 'Procesando...' : 'Confirmar Pedido'}
                    </Button>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                      <Lock className="h-4 w-4" />
                      <span>Pago seguro y encriptado</span>
                    </div>
                  </div>
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

