# 🔧 Configuración de Entornos

## 📋 Variables de Entorno

### Desarrollo (Development)
```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_MOCK_AUTH=true
```

### Producción (Production)
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.tudominio.com
NEXT_PUBLIC_MOCK_AUTH=false
NEXT_PUBLIC_ANALYTICS=true
```

### Testing
```bash
NODE_ENV=test
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_MOCK_AUTH=true
```

## 🚀 Inicio Rápido

### 1. Desarrollo (Sin Backend)
```bash
# Solo frontend
npm run dev
```
- ✅ Autenticación mock automática
- ✅ Cuentas demo funcionando
- ✅ Sin necesidad de backend

### 2. Desarrollo (Con Backend)
```bash
# Backend
cd server && npm start

# Frontend
npm run dev
```
- ✅ Autenticación real
- ✅ Base de datos funcional
- ✅ APIs completas

### 3. Producción
```bash
# Build para producción
npm run build
npm start
```
- ✅ Solo autenticación real
- ✅ Sin cuentas demo
- ✅ Optimizado

## 🧪 Cuentas Demo (Solo Desarrollo)

| Rol | Email | Contraseña | Funcionalidades |
|-----|-------|------------|-----------------|
| 👤 Usuario | usuario@demo.com | demo123 | Comprar productos |
| 🏪 Vendedor | vendedor@demo.com | demo123 | Vender + Dropshipping |
| ⚙️ Admin | admin@demo.com | demo123 | Panel administración |

## 🔄 Migración a Producción

### Paso 1: Configurar Variables
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://tu-api.com
NEXT_PUBLIC_MOCK_AUTH=false
```

### Paso 2: Build
```bash
npm run build
```

### Paso 3: Deploy
```bash
npm start
```

## 🛡️ Seguridad

### Desarrollo
- ✅ Autenticación mock habilitada
- ✅ Cuentas demo visibles
- ✅ Logs de debug activos

### Producción
- ❌ Autenticación mock deshabilitada
- ❌ Cuentas demo ocultas
- ❌ Logs de debug desactivados

## 🔧 Troubleshooting

### Error: "Backend no disponible"
- **Causa:** Backend no está corriendo
- **Solución:** Usar cuentas demo o iniciar backend

### Error: "ERR_CONNECTION_REFUSED"
- **Causa:** API_URL incorrecta
- **Solución:** Verificar NEXT_PUBLIC_API_URL

### Error: "Mock auth no funciona"
- **Causa:** NODE_ENV no es 'development'
- **Solución:** Verificar variable de entorno

## 📁 Estructura de Archivos

```
lib/
├── config.ts          # Configuración centralizada
├── utils.ts           # Utilidades generales
└── api.ts             # Cliente API (futuro)

contexts/
└── AuthContext.tsx    # Contexto de autenticación

.env.local             # Variables locales (no commit)
.env.production        # Variables de producción
```

## 🎯 Flujo de Autenticación

### Desarrollo (Mock)
```
Usuario → Mock Auth → localStorage → Context
```

### Producción (Real)
```
Usuario → Backend API → JWT Token → Context
```

## 🚀 Próximos Pasos

1. **Implementar API real** en `/server`
2. **Configurar base de datos** MongoDB/PostgreSQL
3. **Agregar middleware** de autenticación
4. **Implementar JWT** tokens reales
5. **Configurar CI/CD** con diferentes entornos
