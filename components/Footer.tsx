'use client'

import React from 'react'
import Link from 'next/link'
import { Package, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MercadoLibre VE</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La plataforma de compra y venta más grande de Venezuela
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Compra */}
          <div>
            <h3 className="font-semibold mb-4">Compra</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-muted-foreground hover:text-primary transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-muted-foreground hover:text-primary transition-colors">
                  Tiendas
                </Link>
              </li>
            </ul>
          </div>

          {/* Vende */}
          <div>
            <h3 className="font-semibold mb-4">Vende</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Comenzar a Vender
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Guía para Vendedores
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-muted-foreground hover:text-primary transition-colors">
                  Tarifas
                </Link>
              </li>
              <li>
                <Link href="/seller-protection" className="text-muted-foreground hover:text-primary transition-colors">
                  Protección al Vendedor
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Teléfono</p>
                <p className="text-sm text-muted-foreground">+58 212-555-0100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">soporte@mercadolibreve.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Ubicación</p>
                <p className="text-sm text-muted-foreground">Caracas, Venezuela</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1">Suscríbete a nuestro boletín</h3>
                <p className="text-sm text-muted-foreground">
                  Recibe las mejores ofertas y novedades
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="max-w-xs"
                />
                <Button>Suscribirse</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6 mt-6 text-center text-sm text-muted-foreground">
          <p>© 2024 MercadoLibre Venezuela. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

