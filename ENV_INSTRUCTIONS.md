# 🔐 Variables de Entorno - Instrucciones

## 📝 Cómo configurar

1. **Crea un archivo llamado `.env.local` en la raíz del proyecto** (mismo nivel que `package.json`)

2. **Copia y pega el siguiente contenido:**

```env
# URL del API (ahora será el mismo proyecto Next.js)
NEXT_PUBLIC_API_URL=/api

# Configuración de Base de Datos PostgreSQL (Neon)
# Obtén tu URL de conexión en https://neon.tech
DATABASE_URL=postgresql://usuario:password@host/database?sslmode=require

# Variables de la aplicación
NEXT_PUBLIC_APP_NAME=Vetasoft
```

3. **Guarda el archivo**

4. **Reinicia el servidor de desarrollo** si ya estaba corriendo:
   ```bash
   # En la terminal, presiona Ctrl+C para detener
   # Luego ejecuta de nuevo:
   npm run dev
   ```

## 🔄 Opción alternativa: MySQL con Docker

Si prefieres usar MySQL localmente en lugar de Neon, puedes usar Docker:

1. Levanta los contenedores:
   ```bash
   docker-compose up -d
   ```

2. Accede a phpMyAdmin en: http://localhost:8080

**Nota:** Si usas MySQL, necesitarás modificar `src/app/lib/db.ts` para usar `mysql2` en lugar de `@neondatabase/serverless`.

## ⚠️ Importante

- El archivo `.env.local` **NO se sube a Git** (está en `.gitignore`)
- Las variables que empiezan con `NEXT_PUBLIC_` son accesibles desde el navegador
- Las demás variables SOLO son accesibles en el servidor (más seguro)

## 🆘 Soporte

Si tienes problemas con la base de datos:
1. Verifica que `DATABASE_URL` esté correctamente configurada
2. Prueba el endpoint de salud: http://localhost:3000/api/health
