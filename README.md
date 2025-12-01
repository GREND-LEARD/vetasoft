# 🐾 Vetasoft

Sistema de gestión veterinaria construido con Next.js 16, React 19 y PostgreSQL (Neon).

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **Git** ([Descargar](https://git-scm.com/))
- Cuenta en **Neon** para la base de datos ([Crear cuenta gratis](https://neon.tech))

### Pasos para iniciar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/GREND-LEARD/vetasoft.git
   cd vetasoft
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_API_URL=/api
   DATABASE_URL=postgresql://tu-usuario:tu-password@tu-host/tu-database?sslmode=require
   NEXT_PUBLIC_APP_NAME=Vetasoft
   ```
   
   > 📖 Ver [ENV_INSTRUCTIONS.md](./ENV_INSTRUCTIONS.md) para más detalles.

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador:**
   - App: [http://localhost:3000](http://localhost:3000)
   - Health Check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## 📁 Estructura del Proyecto

```
vetasoft/
├── src/
│   └── app/
│       ├── api/           # API Routes (endpoints)
│       │   ├── health/    # Verificación de salud
│       │   └── users/     # Gestión de usuarios
│       ├── components/    # Componentes React
│       ├── contexts/      # React Contexts
│       ├── hooks/         # Custom Hooks
│       ├── lib/           # Utilidades y configuración DB
│       ├── services/      # Servicios de negocio
│       ├── types/         # Definiciones TypeScript
│       └── utils/         # Funciones utilitarias
├── public/                # Archivos estáticos
├── docker-compose.yml     # Docker para MySQL (opcional)
└── package.json
```

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run start` | Inicia la aplicación compilada |
| `npm run lint` | Ejecuta el linter (ESLint) |

## 🗄️ Base de Datos

Este proyecto utiliza **Neon** (PostgreSQL serverless). 

### Configuración de Neon:
1. Crea una cuenta en [neon.tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia la URL de conexión
4. Pégala en tu `.env.local` como `DATABASE_URL`

### Alternativa: MySQL con Docker

Si prefieres usar MySQL localmente:
```bash
docker-compose up -d
```

Esto levantará:
- MySQL en puerto `3306`
- phpMyAdmin en [http://localhost:8080](http://localhost:8080)

## 🔧 Tecnologías

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Next.js API Routes
- **Base de datos:** PostgreSQL (Neon) / MySQL (opcional)
- **Lenguaje:** TypeScript

## ⚠️ Solución de Problemas

### Error: "DATABASE_URL no está configurada"
→ Asegúrate de crear el archivo `.env.local` con la variable `DATABASE_URL`

### Error: "Cannot connect to database"
→ Verifica que la URL de conexión sea correcta y que tu IP esté permitida en Neon

### El servidor no inicia
→ Verifica que el puerto 3000 no esté ocupado:
```bash
npx kill-port 3000
npm run dev
```

## 📄 Licencia

Proyecto privado - Vetasoft © 2024
