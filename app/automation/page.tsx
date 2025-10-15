'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { OrderAutomation } from '@/components/OrderAutomation'

export default function AutomationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Order Automation
            </h1>
            <p className="text-muted-foreground">
              Automatización inteligente de órdenes y sincronización con proveedores
            </p>
          </div>

          <OrderAutomation />
        </div>
      </main>

      <Footer />
    </div>
  )
}
