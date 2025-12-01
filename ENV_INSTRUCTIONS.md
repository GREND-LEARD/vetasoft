# 🔐 Variables de Entorno - Instrucciones

## 📝 Cómo configurar

1. **Crea un archivo llamado `.env.local` en la raíz del proyecto** (mismo nivel que `package.json`)

2. **Copia y pega el siguiente contenido:**

```env
# URL del API (ahora será el mismo proyecto Next.js)
NEXT_PUBLIC_API_URL=/api

# Configuración de Base de Datos MySQL
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=vetasoft_db
DATABASE_USER=vetasoft_user
DATABASE_PASSWORD=vetasoft_password

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

## ⚠️ Importante

- El archivo `.env.local` **NO se sube a Git** (está en `.gitignore`)
- Modifica las credenciales si cambias la configuración de Docker
- Las variables que empiezan con `NEXT_PUBLIC_` son accesibles desde el navegador
- Las demás variables SOLO son accesibles en el servidor (más seguro)

## 🔄 Cambiar credenciales

Si cambias las credenciales en `docker-compose.yml`, **debes actualizar también `.env.local`** para que coincidan.
