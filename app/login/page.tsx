'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        toast.success('¡Bienvenido de nuevo!')
        router.push('/')
      } else {
        await register(formData.name, formData.email, formData.password)
        toast.success('¡Cuenta creada exitosamente!')
        router.push('/')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Ingresa a tu cuenta para continuar' 
                : 'Crea una cuenta para comenzar a comprar y vender'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre completo</label>
                  <Input
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Recordarme
                  </label>
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </Button>

              <div className="text-center text-sm">
                {isLogin ? (
                  <>
                    ¿No tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-primary hover:underline"
                    >
                      Regístrate
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-primary hover:underline"
                    >
                      Inicia sesión
                    </button>
                  </>
                )}
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" type="button">
                  Google
                </Button>
                <Button variant="outline" type="button">
                  Facebook
                </Button>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-primary/20">
              <div className="text-center mb-4">
                <h3 className="text-sm font-semibold text-primary mb-2">🧪 Cuentas Demo para Pruebas</h3>
                <p className="text-xs text-muted-foreground">
                  Usa estas cuentas para probar diferentes funcionalidades
                </p>
              </div>
              
              <div className="space-y-3">
                {/* Usuario Regular */}
                <div className="p-3 bg-background/50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">U</span>
                      </div>
                      <span className="text-sm font-medium">Usuario Regular</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Comprador</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div><strong>Email:</strong> usuario@demo.com</div>
                    <div><strong>Contraseña:</strong> demo123</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full mt-2 text-xs"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: 'usuario@demo.com',
                        password: 'demo123'
                      })
                      setIsLogin(true)
                    }}
                  >
                    Usar esta cuenta
                  </Button>
                </div>

                {/* Vendedor */}
                <div className="p-3 bg-background/50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">V</span>
                      </div>
                      <span className="text-sm font-medium">Vendedor</span>
                    </div>
                    <Badge variant="default" className="text-xs">Vendedor</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div><strong>Email:</strong> vendedor@demo.com</div>
                    <div><strong>Contraseña:</strong> demo123</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full mt-2 text-xs"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: 'vendedor@demo.com',
                        password: 'demo123'
                      })
                      setIsLogin(true)
                    }}
                  >
                    Usar esta cuenta
                  </Button>
                </div>

                {/* Administrador */}
                <div className="p-3 bg-background/50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">A</span>
                      </div>
                      <span className="text-sm font-medium">Administrador</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Admin</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div><strong>Email:</strong> admin@demo.com</div>
                    <div><strong>Contraseña:</strong> demo123</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full mt-2 text-xs"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: 'admin@demo.com',
                        password: 'demo123'
                      })
                      setIsLogin(true)
                    }}
                  >
                    Usar esta cuenta
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-primary/20">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">
                    💡 <strong>Tip:</strong> Cada cuenta tiene acceso a diferentes funcionalidades
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-green-600">👤 Comprar productos</div>
                    <div className="text-blue-600">🏪 Vender + Dropshipping</div>
                    <div className="text-purple-600">⚙️ Panel Admin</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

