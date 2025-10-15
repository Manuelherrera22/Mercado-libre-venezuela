'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Store, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SellerRouteProps {
  children: React.ReactNode
}

export function SellerRoute({ children }: SellerRouteProps) {
  const { user, isAuthenticated, isSeller, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Acceso Requerido</h2>
            <p className="text-muted-foreground mb-6">
              Debes iniciar sesión para acceder al dashboard de vendedor
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push('/login')} className="w-full">
                Iniciar Sesión
              </Button>
              <Link href="/become-seller">
                <Button variant="outline" className="w-full">
                  Convertirme en Vendedor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isSeller && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
              <Store className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-4">¡Conviértete en Vendedor!</h2>
            <p className="text-muted-foreground mb-6">
              Para acceder al dashboard de vendedor, necesitas completar tu registro como vendedor
            </p>
            <div className="space-y-3">
              <Link href="/become-seller">
                <Button className="w-full">
                  <Store className="mr-2 h-4 w-4" />
                  Convertirme en Vendedor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                Volver al Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
