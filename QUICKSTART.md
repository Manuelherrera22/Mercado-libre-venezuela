# 🚀 Guía Rápida de Inicio - MercadoLibre Venezuela

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Instalación
```bash
# Clonar el repositorio
git clone <url>
cd mercado-libre-venezuela

# Instalar dependencias
npm install

# O usar el instalador automático
install.bat
```

### 2️⃣ Configuración
```bash
# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus configuraciones
# MONGODB_URI=mongodb://localhost:27017/mercadolibre-ve
# JWT_SECRET=tu-clave-secreta
# PORT=5000
```

### 3️⃣ Iniciar MongoDB
```bash
# En Windows
mongod

# O usar MongoDB Atlas (cloud)
```

### 4️⃣ Iniciar el Proyecto
```bash
# Opción 1: Todo de una vez
start-all.bat

# Opción 2: Por separado
# Terminal 1
start-backend.bat

# Terminal 2
start-frontend.bat
```

### 5️⃣ Acceder
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:5000

---

## 📋 Funcionalidades Principales

### Para Usuarios
1. **Explorar Productos**
   - Navegar por categorías
   - Buscar productos
   - Filtrar por precio, categoría, etc.

2. **Comprar**
   - Agregar al carrito
   - Ver detalles del producto
   - Completar checkout
   - Pagar (Transferencia, Pago Móvil, Zelle)

3. **Gestionar Cuenta**
   - Ver perfil
   - Historial de pedidos
   - Favoritos
   - Configuración

### Para Administradores
1. **Dashboard**
   - Ver métricas
   - Estadísticas de ventas
   - Productos más vendidos

2. **Gestión**
   - Productos
   - Pedidos
   - Usuarios

---

## 🎯 Rutas Principales

### Públicas
- `/` - Página principal
- `/products` - Catálogo
- `/products/[id]` - Detalle de producto
- `/login` - Login/Registro

### Protegidas (Usuario)
- `/profile` - Perfil
- `/cart` - Carrito
- `/checkout` - Checkout
- `/sell` - Publicar producto

### Protegidas (Admin)
- `/admin` - Panel de administración

---

## 🔑 Credenciales de Prueba

### Usuario Regular
```
Email: usuario@test.com
Password: password123
```

### Administrador
```
Email: admin@test.com
Password: admin123
```

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev          # Frontend
npm run server       # Backend
```

### Producción
```bash
npm run build        # Build
npm start            # Start
```

### Utilidades
```bash
npm run lint         # Linter
```

---

## 📁 Estructura del Proyecto

```
mercado-libre-venezuela/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home
│   ├── products/          # Productos
│   ├── profile/           # Perfil
│   ├── checkout/          # Checkout
│   ├── admin/             # Admin
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # UI Base
│   ├── Header.tsx        # Header
│   └── ...
├── contexts/             # Contextos
│   ├── AuthContext.tsx   # Auth
│   ├── CartContext.tsx   # Carrito
│   └── WishlistContext.tsx # Favoritos
├── server/               # Backend
│   ├── index.js          # Servidor
│   ├── models/           # Modelos
│   └── routes/           # Rutas API
└── ...
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mercadolibre-ve

# JWT
JWT_SECRET=tu-clave-super-secreta

# Servidor
PORT=5000
NODE_ENV=development

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mercadolibre-ve
```

---

## 🐛 Solución de Problemas

### Error: MongoDB no conecta
```bash
# Verificar que MongoDB está corriendo
mongod --version

# Iniciar MongoDB
mongod
```

### Error: Puerto en uso
```bash
# Cambiar puerto en .env
PORT=5001
```

### Error: Dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Recursos

### Documentación
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [MongoDB](https://docs.mongodb.com)
- [Express](https://expressjs.com)

### Comunidad
- Discord: [Enlace]
- GitHub: [Enlace]
- Email: soporte@mercadolibreve.com

---

## 🎓 Tutoriales

### Crear un Producto
1. Ir a `/sell`
2. Llenar formulario
3. Subir imágenes
4. Publicar

### Hacer una Compra
1. Buscar producto
2. Ver detalles
3. Agregar al carrito
4. Ir a checkout
5. Completar pago

### Gestionar como Admin
1. Login como admin
2. Ir a `/admin`
3. Ver dashboard
4. Gestionar productos/pedidos

---

## 🚀 Despliegue

### Vercel (Frontend)
```bash
vercel
```

### Heroku (Backend)
```bash
heroku create
git push heroku main
```

### MongoDB Atlas (Base de Datos)
1. Crear cuenta en MongoDB Atlas
2. Crear cluster
3. Obtener connection string
4. Actualizar .env

---

## 📞 Soporte

- 📧 Email: soporte@mercadolibreve.com
- 💬 Chat: [Enlace]
- 📱 Teléfono: +58 212-555-0100

---

## 🎉 ¡Listo!

Tu plataforma está lista para usar. ¡Disfruta! 🚀

---

**Versión:** 2.0.0  
**Última actualización:** Enero 2024

