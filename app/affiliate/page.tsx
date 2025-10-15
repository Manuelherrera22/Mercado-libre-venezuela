'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Share2, 
  Copy, 
  CheckCircle,
  Gift,
  Target,
  Award,
  Link as LinkIcon,
  QrCode,
  Download,
  ExternalLink,
  BarChart3,
  Star,
  Zap,
  FileText,
  Image as ImageIcon,
  Video
} from 'lucide-react'

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const affiliateCode = 'AFILIADO2024'
  const affiliateLink = `https://mercadolibrevenezuela.com/ref/${affiliateCode}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${affiliateLink}`

  const stats = {
    totalEarnings: 2450.50,
    pendingEarnings: 320.75,
    totalReferrals: 127,
    activeReferrals: 89,
    conversionRate: 12.5,
    averageOrder: 45.20,
    thisMonth: 456.80,
    lastMonth: 389.45
  }

  const referrals = [
    { id: 1, name: 'María González', email: 'maria@email.com', status: 'active', orders: 12, earnings: 156.80, joined: '2024-01-15' },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos@email.com', status: 'active', orders: 8, earnings: 98.40, joined: '2024-02-20' },
    { id: 3, name: 'Ana Martínez', email: 'ana@email.com', status: 'pending', orders: 3, earnings: 24.60, joined: '2024-03-10' },
    { id: 4, name: 'Luis Pérez', email: 'luis@email.com', status: 'active', orders: 15, earnings: 189.00, joined: '2024-01-05' },
    { id: 5, name: 'Sofia López', email: 'sofia@email.com', status: 'active', orders: 6, earnings: 72.30, joined: '2024-02-28' }
  ]

  const commissions = [
    { level: 'Bronce', minReferrals: 0, commission: 5, benefits: ['5% en todas las ventas', 'Soporte por email'] },
    { level: 'Plata', minReferrals: 10, commission: 7, benefits: ['7% en todas las ventas', 'Soporte prioritario', 'Dashboard avanzado'] },
    { level: 'Oro', minReferrals: 50, commission: 10, benefits: ['10% en todas las ventas', 'Soporte 24/7', 'Bonus mensual', 'Materiales de marketing'] },
    { level: 'Diamante', minReferrals: 100, commission: 15, benefits: ['15% en todas las ventas', 'Soporte dedicado', 'Bonus trimestral', 'Eventos exclusivos'] }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentLevel = referrals.length >= 100 ? 'Diamante' : 
                       referrals.length >= 50 ? 'Oro' : 
                       referrals.length >= 10 ? 'Plata' : 'Bronce'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Gift className="h-8 w-8 text-primary" />
              Programa de Afiliados
            </h1>
            <p className="text-muted-foreground">
              Gana dinero recomendando productos a tus amigos y familiares
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <Badge variant="secondary" className="text-green-500">
                    +17.3%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Ganancias Totales</p>
                <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="secondary" className="text-blue-500">
                    +23
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Referidos Totales</p>
                <p className="text-2xl font-bold">{stats.totalReferrals}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                  </div>
                  <Badge variant="secondary" className="text-purple-500">
                    +12.5%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Tasa de Conversión</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <Award className="h-6 w-6 text-orange-500" />
                  </div>
                  <Badge variant="secondary" className="text-orange-500">
                    {currentLevel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Nivel Actual</p>
                <p className="text-2xl font-bold">{currentLevel}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex gap-8">
              {['overview', 'referrals', 'commissions', 'materials'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Your Affiliate Link */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Tu Enlace de Afiliado
                  </CardTitle>
                  <CardDescription>Comparte este enlace y gana comisiones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input value={affiliateLink} readOnly className="flex-1" />
                      <Button
                        onClick={() => copyToClipboard(affiliateLink)}
                        variant="outline"
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Input value={affiliateCode} readOnly className="flex-1" />
                      <Button
                        onClick={() => copyToClipboard(affiliateCode)}
                        variant="outline"
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-6 border rounded-lg">
                        <h3 className="font-semibold mb-4">Código QR</h3>
                        <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto" />
                        <Button variant="outline" className="w-full mt-4">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar QR
                        </Button>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <h3 className="font-semibold mb-4">Compartir en Redes</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            WhatsApp
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Facebook
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Instagram
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Twitter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Commission Levels */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Niveles de Comisión
                  </CardTitle>
                  <CardDescription>Mientras más refieras, más ganas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {commissions.map((level, index) => (
                      <div
                        key={index}
                        className={`p-6 border rounded-lg ${
                          currentLevel === level.level ? 'border-primary bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">{level.level}</h3>
                          {currentLevel === level.level && (
                            <Badge>Actual</Badge>
                          )}
                        </div>
                        <p className="text-3xl font-bold text-primary mb-2">
                          {level.commission}%
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Mínimo {level.minReferrals} referidos
                        </p>
                        <ul className="space-y-2">
                          {level.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    ¿Cómo Funciona?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">1</span>
                      </div>
                      <h3 className="font-semibold mb-2">Regístrate</h3>
                      <p className="text-sm text-muted-foreground">
                        Únete al programa de afiliados de forma gratuita
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">2</span>
                      </div>
                      <h3 className="font-semibold mb-2">Comparte</h3>
                      <p className="text-sm text-muted-foreground">
                        Comparte tu enlace único con amigos y familiares
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">3</span>
                      </div>
                      <h3 className="font-semibold mb-2">Gana</h3>
                      <p className="text-sm text-muted-foreground">
                        Recibe comisiones por cada compra realizada
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">4</span>
                      </div>
                      <h3 className="font-semibold mb-2">Cobra</h3>
                      <p className="text-sm text-muted-foreground">
                        Retira tus ganancias cuando quieras
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Mis Referidos
                </CardTitle>
                <CardDescription>Gestiona y monitorea tus referidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Estado</th>
                        <th className="text-right py-3 px-4 font-semibold">Órdenes</th>
                        <th className="text-right py-3 px-4 font-semibold">Ganancias</th>
                        <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((referral) => (
                        <tr key={referral.id} className="border-b hover:bg-secondary/50 transition-colors">
                          <td className="py-3 px-4">{referral.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{referral.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant={referral.status === 'active' ? 'default' : 'secondary'}>
                              {referral.status}
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">{referral.orders}</td>
                          <td className="text-right py-3 px-4 font-semibold">${referral.earnings.toFixed(2)}</td>
                          <td className="py-3 px-4 text-muted-foreground">{referral.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Commissions Tab */}
          {activeTab === 'commissions' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Historial de Comisiones
                  </CardTitle>
                  <CardDescription>Detalle de tus ganancias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">Comisión por venta #12345</p>
                        <p className="text-sm text-muted-foreground">María González - iPhone 15</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-500">+$12.50</p>
                        <p className="text-sm text-muted-foreground">2024-03-15</p>
                      </div>
                    </div>
                    {/* Add more commission history items */}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Materiales de Marketing
                </CardTitle>
                <CardDescription>Descarga banners y contenido para promocionar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 border rounded-lg text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Banners</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Banners en diferentes tamaños
                    </p>
                    <Button variant="outline" size="sm">
                      Descargar
                    </Button>
                  </div>
                  <div className="p-6 border rounded-lg text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Plantillas</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Plantillas para redes sociales
                    </p>
                    <Button variant="outline" size="sm">
                      Descargar
                    </Button>
                  </div>
                  <div className="p-6 border rounded-lg text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Video className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Videos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Videos promocionales
                    </p>
                    <Button variant="outline" size="sm">
                      Descargar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

