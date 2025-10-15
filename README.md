# MercadoLibre Venezuela 🛒

Una plataforma completa de compra y venta adaptada para Venezuela, construida con tecnologías modernas.

**✨ Versión 2.0 - Ahora con Panel de Administración, Sistema de Pagos Venezolano, Wishlist y mucho más!**

## 🚀 Características

### ✨ Funcionalidades Principales
- **Frontend Moderno**: Next.js 14 con App Router, TypeScript, Tailwind CSS
- **Backend Robusto**: Express.js con MongoDB
- **Autenticación Completa**: Sistema de login, registro y roles
- **Gestión de Productos**: CRUD completo con categorías y búsqueda avanzada
- **Carrito de Compras**: Sistema persistente con localStorage
- **Sistema de Pedidos**: Gestión completa de órdenes
- **Panel de Administración**: Dashboard completo con métricas y gestión
- **Sistema de Pagos**: Transferencia, Pago Móvil, Zelle
- **Wishlist/Favoritos**: Guarda tus productos favoritos
- **Perfil de Usuario**: Dashboard personal con historial
- **Sistema de Reviews**: Calificaciones y reseñas de productos
- **Diseño Responsivo**: Adaptado para todos los dispositivos
- **Tema Oscuro**: Interfaz elegante y moderna

## 📋 Requisitos Previos

- Node.js 18+ 
- MongoDB (local o Atlas)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repo>
cd mercado-libre-venezuela
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```
MONGODB_URI=mongodb://localhost:27017/mercadolibre-ve
JWT_SECRET=tu-clave-secreta-aqui
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Iniciar MongoDB**
Si usas MongoDB local, asegúrate de que esté corriendo:
```bash
mongod
```

5. **Iniciar el servidor de desarrollo**

En una terminal, inicia el backend:
```bash
npm run server
```

En otra terminal, inicia el frontend:
```bash
npm run dev
```

6. **Abrir en el navegador**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Estructura del Proyecto

```
mercado-libre-venezuela/
├── app/                    # Next.js App Router
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   ├── login/             # Página de login
│   ├── products/          # Página de productos
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   ├── Header.tsx        # Header principal
│   ├── Footer.tsx        # Footer
│   └── ProductCard.tsx   # Tarjeta de producto
├── contexts/             # Contextos de React
│   ├── AuthContext.tsx   # Contexto de autenticación
│   └── CartContext.tsx   # Contexto del carrito
├── lib/                  # Utilidades
│   └── utils.ts          # Funciones auxiliares
├── server/               # Backend Express
│   ├── index.js          # Servidor principal
│   ├── models/           # Modelos de MongoDB
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Order.js
│   └── routes/           # Rutas de la API
│       ├── auth.js
│       ├── products.js
│       ├── categories.js
│       ├── orders.js
│       └── users.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Tecnologías Utilizadas

### Frontend
- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework CSS utility-first
- **Shadcn/UI**: Componentes UI modernos
- **Framer Motion**: Animaciones
- **React Hook Form**: Manejo de formularios
- **Zustand**: State management
- **Axios**: Cliente HTTP

### Backend
- **Express.js**: Framework web de Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación con tokens
- **Bcrypt**: Hash de contraseñas
- **CORS**: Manejo de CORS

## 🔐 Autenticación

El sistema incluye autenticación completa con JWT:

- **Registro**: Crear nueva cuenta
- **Login**: Iniciar sesión
- **Protección de rutas**: Middleware de autenticación
- **Gestión de sesiones**: Tokens JWT con expiración

## 🛍️ Funcionalidades

### Para Compradores
- ✅ Búsqueda de productos
- ✅ Filtros y categorías
- ✅ Carrito de compras
- ✅ Checkout y pagos
- ✅ Seguimiento de pedidos
- ✅ Sistema de reseñas

### Para Vendedores
- ✅ Publicar productos
- ✅ Gestionar inventario
- ✅ Ver ventas
- ✅ Estadísticas de productos

### Para Administradores
- ✅ Panel de administración
- ✅ Gestión de usuarios
- ✅ Gestión de productos
- ✅ Gestión de categorías
- ✅ Reportes y estadísticas

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el frontend en desarrollo
npm run server       # Inicia el backend

# Producción
npm run build        # Construye el proyecto
npm start            # Inicia en producción

# Otros
npm run lint         # Ejecuta el linter
```

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (auth)
- `PUT /api/products/:id` - Actualizar producto (auth)
- `DELETE /api/products/:id` - Eliminar producto (auth)

### Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:id` - Obtener categoría

### Pedidos
- `GET /api/orders` - Listar pedidos del usuario
- `GET /api/orders/:id` - Obtener pedido
- `POST /api/orders` - Crear pedido

### Usuarios
- `GET /api/users/:id` - Obtener perfil
- `PUT /api/users/:id` - Actualizar perfil

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `app/globals.css`:

```css
:root {
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  /* ... */
}
```

### Componentes UI
Los componentes están en `components/ui/` y se pueden personalizar fácilmente.

## 📱 Responsive Design

El sitio está completamente optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🎯 Páginas Principales

### Para Usuarios
- **Página Principal** (`/`) - Hero, categorías, productos destacados
- **Catálogo** (`/products`) - Búsqueda, filtros, paginación
- **Detalle de Producto** (`/products/[id]`) - Galería, reviews, especificaciones
- **Carrito** (`/cart`) - Gestión de items, checkout
- **Checkout** (`/checkout`) - Pago y envío
- **Perfil** (`/profile`) - Dashboard personal, pedidos, favoritos
- **Vender** (`/sell`) - Publicar productos

### Para Administradores
- **Panel de Administración** (`/admin`) - Dashboard, gestión completa
  - Dashboard con métricas
  - Gestión de productos
  - Gestión de pedidos
  - Gestión de usuarios

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT para autenticación
- ✅ Validación de datos en servidor
- ✅ CORS configurado
- ✅ Variables de entorno para secretos

## 🎯 Nuevas Funcionalidades v2.0

### ✅ Implementadas
- [x] **Panel de Administración** - Dashboard completo con métricas
- [x] **Sistema de Pagos Venezolano** - Transferencia, Pago Móvil, Zelle
- [x] **Wishlist/Favoritos** - Guarda tus productos favoritos
- [x] **Perfil de Usuario** - Dashboard personal completo
- [x] **Sistema de Reviews** - Calificaciones y reseñas
- [x] **Página de Detalle de Producto** - Galería de imágenes y especificaciones
- [x] **Checkout Completo** - Proceso de compra mejorado
- [x] **Historial de Pedidos** - Seguimiento de compras
- [x] **Gestión de Usuarios** - Panel de control de usuarios

### 📝 Próximas Mejoras
- [ ] Chat en tiempo real
- [ ] Sistema de notificaciones push
- [ ] App móvil (React Native)
- [ ] Sistema de cupones y descuentos
- [ ] Integración con APIs de envío
- [ ] Dashboard de analytics avanzado
- [ ] Sistema de afiliados
- [ ] Marketplace multi-vendedor

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📊 Estadísticas del Proyecto

- **Líneas de Código**: ~10,000+
- **Componentes React**: 30+
- **Páginas**: 9+
- **Contextos**: 3
- **Rutas API**: 15+
- **Modelos de Base de Datos**: 4

## 📚 Documentación Adicional

- **[MEJORAS.md](MEJORAS.md)** - Lista completa de mejoras implementadas
- **[QUICKSTART.md](QUICKSTART.md)** - Guía rápida de inicio
- **[README.md](README.md)** - Este archivo

## 🎓 Recursos de Aprendizaje

### Para Desarrolladores
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)

### Tutoriales Recomendados
1. Next.js App Router
2. React Context API
3. MongoDB y Mongoose
4. JWT Authentication
5. TypeScript Best Practices

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para Venezuela

## 📞 Soporte

- 📧 Email: soporte@mercadolibreve.com
- 💬 Chat: [Enlace al chat]
- 📱 Teléfono: +58 212-555-0100
- 🌐 Website: https://mercadolibreve.com

## 🙏 Agradecimientos

- Next.js Team
- React Team
- MongoDB Team
- Comunidad de desarrolladores
- Todos los contribuidores

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!

**Versión:** 2.0.0  
**Última actualización:** Enero 2024  
**Estado:** ✅ Producción Ready

