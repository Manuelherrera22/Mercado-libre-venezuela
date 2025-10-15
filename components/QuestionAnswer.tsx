'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface Question {
  id: string
  question: string
  answer?: string
  author: string
  date: Date
  helpful: number
  notHelpful: number
}

interface QuestionAnswerProps {
  productId: string
}

export function QuestionAnswer({ productId }: QuestionAnswerProps) {
  const [showForm, setShowForm] = useState(false)
  const [question, setQuestion] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Datos de ejemplo
  const questions: Question[] = [
    {
      id: '1',
      question: '¿Cuánto tiempo tarda el envío?',
      answer: 'El envío tarda entre 3-5 días hábiles en Caracas y 5-7 días en el interior del país.',
      author: 'Cliente Verificado',
      date: new Date('2024-01-20'),
      helpful: 12,
      notHelpful: 2
    },
    {
      id: '2',
      question: '¿Viene con garantía?',
      answer: 'Sí, todos nuestros productos vienen con 1 año de garantía del fabricante.',
      author: 'Cliente Verificado',
      date: new Date('2024-01-18'),
      helpful: 8,
      notHelpful: 1
    },
    {
      id: '3',
      question: '¿Aceptan pago en efectivo?',
      author: 'Cliente Verificado',
      date: new Date('2024-01-15'),
      helpful: 5,
      notHelpful: 0
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      // Aquí iría la lógica para enviar la pregunta
      console.log('Pregunta enviada:', question)
      setQuestion('')
      setShowForm(false)
    }
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Preguntas y Respuestas
        </h3>
        <Button onClick={() => setShowForm(!showForm)}>
          Hacer una Pregunta
        </Button>
      </div>

      {/* Formulario de Pregunta */}
      {showForm && (
        <Card className="animate-fadeIn">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Tu Pregunta
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Escribe tu pregunta aquí..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Enviar Pregunta</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setQuestion('')
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Preguntas */}
      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Pregunta */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{q.question}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{q.author}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(q.date, { addSuffix: true, locale: es })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpanded(q.id)}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      {expandedId === q.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Respuesta */}
                  {q.answer && expandedId === q.id && (
                    <div className="mt-4 p-4 bg-secondary/50 rounded-lg animate-fadeIn">
                      <p className="text-sm mb-3">{q.answer}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 hover:text-primary">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Útil ({q.helpful})</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary">
                          <ThumbsDown className="h-4 w-4" />
                          <span>No útil ({q.notHelpful})</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ver más */}
      {questions.length > 3 && (
        <div className="text-center">
          <Button variant="outline">
            Ver todas las preguntas ({questions.length})
          </Button>
        </div>
      )}
    </div>
  )
}

