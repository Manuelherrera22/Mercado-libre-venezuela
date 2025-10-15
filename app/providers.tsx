'use client'

import React from 'react'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
