'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'

export default function FAQPage() {
  const faqs = [
    {
      question: '¿Cómo puedo comprar?',
      answer: 'Busca el producto que deseas, agrégalo al carrito y procede al pago con tu método preferido.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos Pago Móvil, Zelle, transferencias bancarias, tarjetas de crédito y criptomonedas.'
    },
    {
      question: '¿Cuánto tarda el envío?',
      answer: 'Depende de la empresa: MRW (1-3 días), Zoom (2-5 días), Tealca (3-7 días).'
    },
    {
      question: '¿Puedo devolver un producto?',
      answer: 'Sí, tienes 30 días para devolver productos en su empaque original.'
    },
    {
      question: '¿Cómo me hago vendedor?',
      answer: 'Haz clic en "Vender" en el menú superior y completa el formulario de registro.'
    },
    {
      question: '¿Cuánto cobran de comisión?',
      answer: 'Las comisiones van desde 2% hasta 3.5% según tu volumen de ventas.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              Preguntas Frecuentes
            </h1>
            <p className="text-muted-foreground">
              Respuestas a las preguntas más comunes
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
