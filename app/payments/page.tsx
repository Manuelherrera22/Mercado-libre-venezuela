'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PaymentSystem } from '@/components/PaymentSystem'

export default function PaymentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="break-words">Payment System</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sistema de pagos automático con gestión inteligente de comisiones
            </p>
          </div>

          <PaymentSystem />
        </div>
      </main>

      <Footer />
    </div>
  )
}
