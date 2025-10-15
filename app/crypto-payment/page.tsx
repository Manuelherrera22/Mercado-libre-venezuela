'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Bitcoin, 
  Ethereum, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Copy,
  CheckCircle,
  QrCode,
  Wallet,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Info
} from 'lucide-react'

export default function CryptoPaymentPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('btc')
  const [amount, setAmount] = useState('')
  const [copied, setCopied] = useState(false)

  const cryptocurrencies = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      price: 43250.50,
      change: 2.45,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: '⟠',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      price: 2456.80,
      change: -1.23,
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      price: 1.00,
      change: 0.01,
      address: 'TXYZabcdefghijklmnopqrstuvwxyz123456',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TXYZabcdefghijklmnopqrstuvwxyz123456'
    }
  ]

  const selectedCryptoData = cryptocurrencies.find(c => c.id === selectedCrypto)!

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const calculateCryptoAmount = () => {
    if (!amount || !selectedCryptoData) return '0'
    const usdAmount = parseFloat(amount)
    return (usdAmount / selectedCryptoData.price).toFixed(8)
  }

  const recentTransactions = [
    {
      id: '1',
      crypto: 'BTC',
      amount: 0.00234,
      usdValue: 101.25,
      status: 'completed',
      date: '2024-03-15 14:23',
      txHash: 'a1b2c3d4e5f6...'
    },
    {
      id: '2',
      crypto: 'ETH',
      amount: 0.145,
      usdValue: 356.24,
      status: 'completed',
      date: '2024-03-14 09:15',
      txHash: 'f6e5d4c3b2a1...'
    },
    {
      id: '3',
      crypto: 'USDT',
      amount: 500,
      usdValue: 500.00,
      status: 'pending',
      date: '2024-03-15 16:45',
      txHash: 'pending...'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Bitcoin className="h-8 w-8 text-orange-500" />
              Pagos con Criptomonedas
            </h1>
            <p className="text-muted-foreground">
              Paga de forma segura y rápida con Bitcoin, Ethereum y USDT
            </p>
          </div>

          {/* Crypto Prices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cryptocurrencies.map((crypto) => (
              <Card 
                key={crypto.id} 
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedCrypto === crypto.id ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedCrypto(crypto.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${crypto.bgColor}`}>
                      <span className="text-2xl">{crypto.icon}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {crypto.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-semibold ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                      </span>
                    </div>
                  </div>
                  <p className="font-semibold mb-1">{crypto.name}</p>
                  <p className="text-2xl font-bold">{crypto.symbol}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ${crypto.price.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Realizar Pago
                </CardTitle>
                <CardDescription>
                  Ingresa el monto y envía la criptomoneda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Monto a Pagar (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10 text-lg"
                    />
                  </div>
                </div>

                {/* Crypto Amount */}
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Recibirás</span>
                    <span className="text-sm font-medium">{selectedCryptoData.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {calculateCryptoAmount()}
                    </span>
                    <span className="text-muted-foreground">
                      {selectedCryptoData.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ≈ ${selectedCryptoData.price.toLocaleString()} por {selectedCryptoData.symbol}
                  </p>
                </div>

                {/* Wallet Address */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Dirección de Pago
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={selectedCryptoData.address}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(selectedCryptoData.address)}
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg">
                    <img
                      src={selectedCryptoData.qrCode}
                      alt="QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg text-sm text-blue-600">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Importante:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Solo envía {selectedCryptoData.symbol} a esta dirección</li>
                      <li>• El pago se confirmará en 10-30 minutos</li>
                      <li>• No envíes desde exchanges directamente</li>
                    </ul>
                  </div>
                </div>

                {/* Pay Button */}
                <Button className="w-full" size="lg">
                  <Shield className="h-4 w-4 mr-2" />
                  Confirmar Pago
                </Button>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Historial de Transacciones
                </CardTitle>
                <CardDescription>
                  Tus pagos recientes con criptomonedas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${
                            tx.crypto === 'BTC' ? 'bg-orange-500/10' :
                            tx.crypto === 'ETH' ? 'bg-blue-500/10' :
                            'bg-green-500/10'
                          }`}>
                            {tx.crypto === 'BTC' && <Bitcoin className="h-4 w-4 text-orange-500" />}
                            {tx.crypto === 'ETH' && <Ethereum className="h-4 w-4 text-blue-500" />}
                            {tx.crypto === 'USDT' && <span className="text-green-500 font-bold">₮</span>}
                          </div>
                          <div>
                            <p className="font-semibold">{tx.crypto}</p>
                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                          </div>
                        </div>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{tx.amount} {tx.crypto}</p>
                          <p className="text-sm text-muted-foreground">≈ ${tx.usdValue.toFixed(2)}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      {tx.txHash && (
                        <p className="text-xs text-muted-foreground mt-2 font-mono">
                          {tx.txHash}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                ¿Por Qué Pagar con Criptomonedas?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Seguridad</h3>
                  <p className="text-sm text-muted-foreground">
                    Transacciones seguras y descentralizadas con blockchain
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Rapidez</h3>
                  <p className="text-sm text-muted-foreground">
                    Confirmación en minutos, sin esperas bancarias
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Bajas Comisiones</h3>
                  <p className="text-sm text-muted-foreground">
                    Sin intermediarios, comisiones mínimas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                    <Wallet className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Global</h3>
                  <p className="text-sm text-muted-foreground">
                    Aceptado en todo el mundo, sin fronteras
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

