'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  Send, 
  X, 
  Minimize2,
  MessageSquare,
  Loader2
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes('buscar') || message.includes('producto')) {
      return '¡Perfecto! Puedo ayudarte a buscar productos. ¿Qué estás buscando?\n\n💡 **Tip:** Todos los productos con envío en Venezuela'
    }

    if (message.includes('pedido') || message.includes('orden')) {
      return 'Para ver tus pedidos, ve a tu perfil → "Mis Pedidos".\n\n📍 **Seguimiento en tiempo real** en todo Venezuela con MRW, Zoom y Tealca.'
    }

    if (message.includes('pago') || message.includes('pagar') || message.includes('móvil') || message.includes('zelle')) {
      return 'Métodos de pago para Venezuela:\n\n💰 **Pago Móvil** - Instantáneo\n💵 **Bolívares** - 0% comisión\n🌐 **Zelle** - USD\n💳 **Tarjetas** - Visa/MC\n₿ **Cripto** - BTC/USDT\n\n¿Necesitas configurar alguno?'
    }

    if (message.includes('envío') || message.includes('entrega') || message.includes('mrw') || message.includes('zoom')) {
      return 'Envíos a todo Venezuela:\n\n🚚 **MRW** - 1-3 días\n📦 **Zoom** - 2-5 días\n🚛 **Tealca** - 3-7 días\n🏠 **Retiro Gratis** - Caracas\n\n¿A qué ciudad lo necesitas?'
    }

    if (message.includes('vendedor') || message.includes('vender') || message.includes('dropshipping')) {
      return '¿Quieres vender? 🚀\n\n✨ **Beneficios:**\n• Comisiones desde 2%\n• IA gratuita\n• Pagos automáticos\n• Soporte 24/7\n\n¿Te registro como vendedor?'
    }

    if (message.includes('caracas') || message.includes('maracaibo') || message.includes('valencia') || message.includes('ciudad')) {
      return 'Cobertura nacional:\n\n📍 **Caracas** - 1-2 días\n📍 **Maracaibo** - 2-3 días\n📍 **Valencia** - 1-2 días\n📍 **Barquisimeto** - 2-3 días\n\n¿Tu ciudad?'
    }

    if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes') || message.includes('buenas noches')) {
      return '¡Hola! 😊 Bienvenido a Mercado Libre Venezuela.\n\n**Te ayudo con:**\n🔍 Productos\n💰 Pagos venezolanos\n🚚 Envíos MRW/Zoom\n📦 Pedidos\n🏪 Vender'
    }

    if (message.includes('gracias')) {
      return '¡De nada! 😊 ¿Algo más?\n\n💡 Pregúntame sobre envíos, pagos o productos'
    }

    if (message.includes('ayuda') || message.includes('soporte')) {
      return 'Ayuda disponible:\n\n🔍 Productos\n💰 Pago Móvil/Zelle\n🚚 MRW/Zoom/Tealca\n📦 Seguimiento\n🏪 Vender\n\n¿Qué necesitas?'
    }

    return 'Entiendo. ¿Podrías ser más específico?\n\n**Ejemplos:**\n• "¿Aceptan Pago Móvil?"\n• "Envío a Maracaibo"\n• "Quiero vender"\n• "Buscar iPhone"'
  }

  const quickSuggestions = [
    '¿Aceptan Pago Móvil?',
    'Envío a mi ciudad',
    'Quiero vender',
    'Buscar productos'
  ]

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-bounce-slow"
          aria-label="Abrir chat"
        >
          <div className="relative">
            <Bot className="h-8 w-8 text-white mx-auto" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-500 border-2 border-background">
              <span className="text-xs">1</span>
            </Badge>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'h-16 w-80' : 'h-[600px] w-96'} transition-all duration-300`}>
          <div className="bg-background border-2 border-primary/20 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden">
            {/* Header */}
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
                    <h3 className="font-semibold text-sm">Asistente IA</h3>
                    <p className="text-xs text-muted-foreground">En línea</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-3 w-3 text-purple-500" />
                            <span className="text-xs font-semibold text-purple-500">Asistente IA</span>
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg text-sm ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary'
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-secondary p-3 rounded-lg">
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

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSend(suggestion)}
                          className="px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 text-sm"
                    />
                    <Button onClick={() => handleSend(input)} size="sm" disabled={!input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </>
  )
}

