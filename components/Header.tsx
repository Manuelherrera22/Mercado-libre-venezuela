'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Package, Settings, LogOut, TrendingUp, Sparkles, Store, Bot, DollarSign, BarChart3, Zap, CreditCard } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { NotificationCenter } from '@/components/NotificationCenter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout, isAuthenticated, isSeller } = useAuth()
  const { itemCount, total } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar búsqueda
    console.log('Buscando:', searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                MercadoLibre VE
              </h1>
              <p className="text-xs text-muted-foreground">Venezuela</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* AI Recommendations Link */}
            <Link href="/ai-recommendations">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Sparkles className="mr-2 h-4 w-4" />
                Recomendaciones
              </Button>
            </Link>

            {/* Dropshipping Link */}
    {isAuthenticated && isSeller && (
      <>
        <Link href="/dropshipping">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <TrendingUp className="mr-2 h-4 w-4" />
            Dropshipping
          </Button>
        </Link>
        <Link href="/ai-research">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Bot className="mr-2 h-4 w-4" />
            IA Research
          </Button>
        </Link>
        <Link href="/pricing">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <DollarSign className="mr-2 h-4 w-4" />
            Pricing IA
          </Button>
        </Link>
        <Link href="/analytics">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </Link>
        <Link href="/automation">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Zap className="mr-2 h-4 w-4" />
            Automation
          </Button>
        </Link>
        <Link href="/payments">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </Button>
        </Link>
      </>
    )}

            {/* Become Seller Link */}
            {isAuthenticated && !isSeller && user?.role !== 'admin' && (
              <Link href="/become-seller">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Store className="mr-2 h-4 w-4" />
                  Vender
                </Button>
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative"
                >
                  <User className="h-5 w-5" />
                </Button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-2 shadow-lg animate-fadeIn">
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Mi Perfil
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4" />
                      Mis Pedidos
                    </Link>
                    {isSeller && (
                      <Link
                        href="/seller/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Store className="h-4 w-4" />
                        Dashboard Vendedor
                      </Link>
                    )}
                    {isSeller && (
                      <Link
                        href="/dropshipping"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <TrendingUp className="h-4 w-4" />
                        Dropshipping
                      </Link>
                    )}
                    <Link
                      href="/ai-recommendations"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Sparkles className="h-4 w-4" />
                      Recomendaciones IA
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Ingresar
                </Button>
              </Link>
            )}

            {/* Notifications */}
            <NotificationCenter />

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden animate-slideIn">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              href="/ai-recommendations"
              className="block px-4 py-2 hover:bg-accent rounded-md flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="h-4 w-4" />
              Recomendaciones IA
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categorías
            </Link>
            <Link
              href="/offers"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ofertas
            </Link>
            <Link
              href="/sell"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vender
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

