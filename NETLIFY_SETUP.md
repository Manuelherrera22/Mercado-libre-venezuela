# 🚀 CONFIGURACIÓN DE NETLIFY

## 📋 **Variables de Entorno en Netlify**

Para que la plataforma funcione correctamente en Netlify, necesitas configurar estas variables de entorno:

### **1. Ve a tu Dashboard de Netlify:**
- Site settings → Environment variables

### **2. Agrega estas variables:**

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Entorno de producción |
| `NEXT_PUBLIC_MOCK_AUTH` | `true` | Habilita autenticación mock |
| `NEXT_PUBLIC_API_URL` | *(dejar vacío)* | URL del backend (vacío para mock) |
| `NEXT_PUBLIC_ANALYTICS` | `false` | Deshabilitar analytics por ahora |

---

## 🔐 **¿Por qué Mock Auth en Producción?**

Mientras no tengas un backend real funcionando, el mock auth permite:

✅ **Probar la plataforma** sin backend  
✅ **Demostrar funcionalidades** a clientes  
✅ **Usar cuentas demo** para testing  
✅ **Evitar errores** de conexión  

### **Cuentas Demo Disponibles:**

| Email | Contraseña | Rol |
|-------|------------|-----|
| `usuario@demo.com` | `demo123` | Usuario |
| `vendedor@demo.com` | `demo123` | Vendedor |
| `admin@demo.com` | `demo123` | Admin |

---

## 📝 **Pasos para Deploy:**

### **1. Conectar Repositorio:**
```
1. New site from Git
2. Selecciona GitHub
3. Elige: Manuelherrera22/Mercado-libre-venezuela
4. Autoriza acceso
```

### **2. Configurar Build:**
```
Build command: npm run build
Publish directory: .next
```

### **3. Agregar Variables de Entorno:**
```
Site settings → Environment variables → Add a variable

Agregar las 4 variables mencionadas arriba
```

### **4. Deploy:**
```
Click en "Deploy site"
Espera 2-3 minutos
¡Listo!
```

---

## 🔄 **Cuando Tengas Backend Real:**

### **Actualiza las variables:**

```env
NODE_ENV=production
NEXT_PUBLIC_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=https://tu-api.com
NEXT_PUBLIC_ANALYTICS=true
```

### **Redeploy:**
```
Netlify detectará los cambios automáticamente
O haz click en "Trigger deploy"
```

---

## 🐛 **Troubleshooting:**

### **Error: "Failed to load resource: 404"**
**Solución:** Las páginas faltantes ya fueron creadas:
- ✅ `/seller-guide`
- ✅ `/offers`
- ✅ `/help`
- ✅ `/contact`
- ✅ `/fees`
- ✅ `/faq`

### **Error: "ERR_CONNECTION_REFUSED"**
**Solución:** Verifica que `NEXT_PUBLIC_MOCK_AUTH=true`

### **Error: "Login no funciona"**
**Solución:** 
1. Verifica variables de entorno
2. Usa cuentas demo con contraseña `demo123`
3. Limpia cache del navegador

---

## ✅ **Checklist de Deploy:**

- [ ] Repositorio conectado a Netlify
- [ ] Variables de entorno configuradas
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Plugin Next.js instalado
- [ ] Deploy exitoso
- [ ] Login funciona con cuentas demo
- [ ] Todas las páginas cargan sin 404

---

## 📞 **Soporte:**

Si tienes problemas con el deploy:
1. Revisa los logs de build en Netlify
2. Verifica las variables de entorno
3. Asegúrate que `netlify.toml` esté en el repo

---

## 🎯 **Resultado Esperado:**

✅ **Plataforma funcionando** en https://tu-sitio.netlify.app  
✅ **Login funciona** con cuentas demo  
✅ **Todas las páginas** cargan correctamente  
✅ **Responsive** en todos los dispositivos  
✅ **IA features** funcionando  

**¡Tu plataforma estará en vivo!** 🚀
