'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  Send, 
  Sparkles,
  MessageSquare,
  Zap,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Mic,
  Loader2,
  User,
  ShoppingBag,
  Package,
  Truck,
  CreditCard,
  HelpCircle
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente virtual de Mercado Libre Venezuela. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      suggestions: [
        'Buscar productos',
        'Ver mis pedidos',
        'Ayuda con pagos',
        'Información de envíos'
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    { icon: ShoppingBag, label: 'Buscar Productos', action: 'Buscar productos' },
    { icon: Package, label: 'Mis Pedidos', action: 'Ver mis pedidos' },
    { icon: Truck, label: 'Seguimiento', action: 'Rastrear mi pedido' },
    { icon: CreditCard, label: 'Pagos', action: 'Información de pagos' },
    { icon: HelpCircle, label: 'Ayuda', action: 'Necesito ayuda' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(message),
        timestamp: new Date(),
        suggestions: getSuggestions(message)
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes('buscar') || message.includes('producto')) {
      return '¡Perfecto! Puedo ayudarte a buscar productos. ¿Qué tipo de producto estás buscando? Por ejemplo: smartphones, laptops, ropa, etc. También puedes usar el buscador en la parte superior de la página.'
    }

    if (message.includes('pedido') || message.includes('orden')) {
      return 'Para ver tus pedidos, puedes ir a tu perfil y seleccionar "Mis Pedidos". Allí verás el estado de todos tus pedidos, fechas de entrega y opciones de seguimiento. ¿Necesitas ayuda con algún pedido específico?'
    }

    if (message.includes('pago') || message.includes('pagar')) {
      return 'Aceptamos múltiples métodos de pago:\n\n💰 **Pago Móvil** - Rápido y seguro\n💳 **Transferencia Bancaria** - Directo a tu cuenta\n🌐 **Zelle** - Para pagos internacionales\n₿ **Criptomonedas** - Bitcoin, Ethereum, USDT\n\n¿Necesitas ayuda con algún método de pago específico?'
    }

    if (message.includes('envío') || message.includes('entrega')) {
      return 'Ofrecemos envío a todo Venezuela:\n\n🚚 **Envío Express** - 1-3 días laborables\n📦 **Envío Estándar** - 3-7 días laborables\n🏠 **Retiro en Tienda** - Gratis\n\nLos envíos incluyen seguimiento GPS en tiempo real. ¿Quieres rastrear un pedido?'
    }

    if (message.includes('precio') || message.includes('costo')) {
      return 'Los precios varían según el producto y el método de pago. Todos nuestros precios incluyen IVA. Aceptamos múltiples monedas y métodos de pago. ¿Hay algún producto específico del que quieras saber el precio?'
    }

    if (message.includes('devolución') || message.includes('reembolso')) {
      return 'Ofrecemos garantía de satisfacción:\n\n✅ **30 días** para devoluciones\n🔄 **Reembolso completo** si no estás satisfecho\n📦 **Recogida gratuita** en tu domicilio\n\n¿Necesitas iniciar una devolución?'
    }

    if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes')) {
      return '¡Hola! 😊 ¿En qué puedo ayudarte hoy? Puedo ayudarte con:\n\n• Búsqueda de productos\n• Información de pedidos\n• Métodos de pago\n• Seguimiento de envíos\n• Devoluciones y reembolsos\n• Y mucho más...'
    }

    if (message.includes('gracias') || message.includes('muchas gracias')) {
      return '¡De nada! 😊 Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?'
    }

    // Default response
    return 'Entiendo tu consulta. Permíteme ayudarte con eso. ¿Podrías ser más específico sobre lo que necesitas? Por ejemplo:\n\n• "Buscar iPhone 15"\n• "Ver estado de mi pedido #12345"\n• "Información sobre pagos"\n• "Seguimiento de envío"'
  }

  const getSuggestions = (userMessage: string): string[] => {
    const message = userMessage.toLowerCase()

    if (message.includes('buscar') || message.includes('producto')) {
      return ['Ver categorías', 'Productos populares', 'Ofertas del día']
    }

    if (message.includes('pedido')) {
      return ['Rastrear pedido', 'Ver historial', 'Contactar soporte']
    }

    if (message.includes('pago')) {
      return ['Ver métodos de pago', 'Agregar tarjeta', 'Historial de pagos']
    }

    return ['Buscar productos', 'Ver mis pedidos', 'Ayuda con pagos']
  }

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion)
  }

  const handleQuickAction = (action: string) => {
    handleSend(action)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-500" />
              Asistente Virtual con IA
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pregúntame lo que necesites. Puedo ayudarte a buscar productos, rastrear pedidos, 
              resolver dudas sobre pagos y mucho más.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Asistente IA</h3>
                        <p className="text-xs text-muted-foreground">En línea • Responde instantáneamente</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">
                      <Zap className="h-3 w-3 mr-1" />
                      Activo
                    </Badge>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-4 w-4 text-purple-500" />
                            <span className="text-xs font-semibold text-purple-500">Asistente IA</span>
                          </div>
                        )}
                        <div
                          className={`p-4 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestion(suggestion)}
                                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Feedback */}
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-2">
                            <button className="p-1 hover:bg-secondary rounded transition-colors">
                              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded transition-colors">
                              <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-secondary p-4 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleSend(input)} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    Acciones Rápidas
                  </h3>
                  <div className="space-y-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                      >
                        <div className="p-2 rounded-lg bg-primary/10">
                          <action.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Estadísticas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Conversaciones</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tasa de Resolución</span>
                      <span className="font-semibold text-green-500">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tiempo Promedio</span>
                      <span className="font-semibold">2.3s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    ¿Qué Puedo Hacer?
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span>Buscar productos y comparar precios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span>Rastrear pedidos en tiempo real</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span>Información sobre pagos y envíos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span>Recomendaciones personalizadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span>Soporte 24/7 en tiempo real</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Respuestas Instantáneas</h3>
                <p className="text-sm text-muted-foreground">
                  Responde en menos de 2 segundos con IA avanzada
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">IA Avanzada</h3>
                <p className="text-sm text-muted-foreground">
                  Entiende contexto y aprende de cada conversación
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Multilenguaje</h3>
                <p className="text-sm text-muted-foreground">
                  Soporte en español, inglés y más idiomas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

