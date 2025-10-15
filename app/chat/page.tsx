'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon,
  Video,
  Phone,
  VideoOff,
  Mic,
  Search,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  User,
  ShoppingBag,
  MessageSquare,
  Bot
} from 'lucide-react'

interface Message {
  id: string
  sender: string
  senderType: 'user' | 'vendor' | 'support' | 'bot'
  message: string
  timestamp: Date
  read: boolean
  type: 'text' | 'image' | 'file' | 'order'
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>('1')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Juan Pérez',
      senderType: 'user',
      message: 'Hola, ¿tienen el iPhone 15 en stock?',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      type: 'text'
    },
    {
      id: '2',
      sender: 'TechStore Venezuela',
      senderType: 'vendor',
      message: '¡Hola! Sí, tenemos el iPhone 15 en stock. ¿Te gustaría ver las opciones disponibles?',
      timestamp: new Date(Date.now() - 3550000),
      read: true,
      type: 'text'
    },
    {
      id: '3',
      sender: 'Juan Pérez',
      senderType: 'user',
      message: 'Perfecto, ¿cuál es el precio?',
      timestamp: new Date(Date.now() - 3500000),
      read: true,
      type: 'text'
    },
    {
      id: '4',
      sender: 'TechStore Venezuela',
      senderType: 'vendor',
      message: 'El iPhone 15 128GB está en $850. Incluye envío gratis a toda Venezuela.',
      timestamp: new Date(Date.now() - 3450000),
      read: true,
      type: 'text'
    },
    {
      id: '5',
      sender: 'Soporte',
      senderType: 'bot',
      message: '💡 Recuerda que puedes pagar con Pago Móvil, Transferencia o Zelle',
      timestamp: new Date(Date.now() - 3400000),
      read: true,
      type: 'text'
    }
  ])

  const chats = [
    {
      id: '1',
      name: 'TechStore Venezuela',
      type: 'vendor',
      lastMessage: 'El iPhone 15 128GB está en $850...',
      timestamp: new Date(Date.now() - 3450000),
      unread: 0,
      online: true,
      avatar: '🏪'
    },
    {
      id: '2',
      name: 'Soporte al Cliente',
      type: 'support',
      lastMessage: '¿En qué puedo ayudarte hoy?',
      timestamp: new Date(Date.now() - 7200000),
      unread: 2,
      online: true,
      avatar: '💬'
    },
    {
      id: '3',
      name: 'Fashion Store',
      type: 'vendor',
      lastMessage: 'Nueva colección disponible',
      timestamp: new Date(Date.now() - 86400000),
      unread: 0,
      online: false,
      avatar: '👕'
    },
    {
      id: '4',
      name: 'Home & Garden Pro',
      type: 'vendor',
      lastMessage: 'Confirmamos tu pedido #12345',
      timestamp: new Date(Date.now() - 172800000),
      unread: 0,
      online: true,
      avatar: '🏡'
    }
  ]

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Tú',
      senderType: 'user',
      message: message,
      timestamp: new Date(),
      read: false,
      type: 'text'
    }

    setMessages([...messages, newMessage])
    setMessage('')
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Ahora'
    if (minutes < 60) return `Hace ${minutes}m`
    if (hours < 24) return `Hace ${hours}h`
    return `Hace ${days}d`
  }

  const activeChatData = chats.find(chat => chat.id === activeChat)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              Centro de Mensajería
            </h1>
            <p className="text-muted-foreground">
              Comunícate con vendedores y soporte en tiempo real
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
            {/* Chats List */}
            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col">
                <CardContent className="p-4 flex-1 overflow-y-auto">
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar conversaciones..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          activeChat === chat.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                              {chat.avatar}
                            </div>
                            {chat.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold truncate">{chat.name}</p>
                              <span className="text-xs opacity-70">{formatTime(chat.timestamp)}</span>
                            </div>
                            <p className="text-sm opacity-80 truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <Badge variant="secondary" className="mt-1">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                {activeChatData && (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                            {activeChatData.avatar}
                          </div>
                          {activeChatData.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{activeChatData.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {activeChatData.online ? 'En línea' : 'Desconectado'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${msg.senderType === 'user' ? 'order-2' : 'order-1'}`}>
                            {msg.senderType !== 'user' && (
                              <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                            )}
                            <div
                              className={`p-3 rounded-lg ${
                                msg.senderType === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : msg.senderType === 'bot'
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-secondary'
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatTime(msg.timestamp)}
                              </span>
                              {msg.senderType === 'user' && (
                                msg.read ? (
                                  <CheckCheck className="h-3 w-3 text-blue-500" />
                                ) : (
                                  <Check className="h-3 w-3 text-muted-foreground" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex items-end gap-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                          <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Escribe un mensaje..."
                            className="w-full"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

