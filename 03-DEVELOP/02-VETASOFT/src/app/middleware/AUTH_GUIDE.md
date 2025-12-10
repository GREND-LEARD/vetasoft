# 🔐 Sistema de Autenticación JWT - VETASOFT

Este documento explica cómo usar el sistema de autenticación JWT implementado en VETASOFT.

## 📋 Endpoints Disponibles

### 1. **Registro de Usuario**

- **URL**: `POST /api/auth/register`
- **Cuerpo**:

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "contrasena": "password123",
  "rol_id": 2
}
```

- **Respuesta exitosa** (201):

```json
{
  "success": true,
  "data": {
    "user": {
      "usuario_id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "correo": "juan@example.com",
      "rol_id": 2,
      "activo": true,
      "fecha_registro": "2025-12-05T23:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. **Login**

- **URL**: `POST /api/auth/login`
- **Cuerpo**:

```json
{
  "correo": "juan@example.com",
  "contrasena": "password123"
}
```

- **Respuesta exitosa** (200):

```json
{
  "success": true,
  "data": {
    "user": {
      "usuario_id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "correo": "juan@example.com",
      "rol_id": 2,
      "nombre_rol": "Empleado",
      "activo": true,
      "fecha_registro": "2025-12-05T23:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. **Verificar Token**

- **URL**: `GET /api/auth/verify`
- **Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **Respuesta exitosa** (200):

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "juan@example.com",
    "roleId": 2,
    "roleName": "Empleado"
  }
}
```

---

## 🛡️ Proteger Rutas

### Método 1: Usando el middleware `withAuth`

Para proteger una ruta existente, usa el middleware `withAuth`:

```typescript
// src/app/api/usuarios/route.ts
import { withAuth } from "@/app/middleware/auth.middleware";
import { UsuariosController } from "@/app/controllers/usuarios.controller";
import { NextRequest } from "next/server";

// Ruta protegida - requiere autenticación
export const GET = withAuth(async (request: NextRequest) => {
  // El usuario autenticado está disponible en request.user
  const user = (request as any).user;
  console.log("Usuario autenticado:", user);

  return UsuariosController.getAll();
});
```

### Método 2: Usando el middleware `withRole`

Para proteger una ruta y verificar roles específicos:

```typescript
// Solo administradores (rol_id = 1) pueden acceder
import { withRole } from "@/app/middleware/auth.middleware";

export const DELETE = withRole(
  [1],
  async (request: NextRequest, { params }: any) => {
    // Solo usuarios con rol_id = 1 pueden ejecutar esto
    return UsuariosController.delete(params.id);
  }
);
```

---

## 🔧 Configuración

### 1. Variables de Entorno

Asegúrate de tener estas variables en tu archivo `.env.local`:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

**⚠️ IMPORTANTE**: En producción, genera un secret seguro con:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📝 Ejemplos de Uso con Fetch

### Ejemplo 1: Registro

```typescript
const register = async () => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: "Juan",
      apellido: "Pérez",
      correo: "juan@example.com",
      contrasena: "password123",
      rol_id: 2,
    }),
  });

  const data = await response.json();

  if (data.success) {
    // Guardar token en localStorage
    localStorage.setItem("token", data.data.token);
    console.log("Usuario registrado:", data.data.user);
  }
};
```

### Ejemplo 2: Login

```typescript
const login = async () => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: "juan@example.com",
      contrasena: "password123",
    }),
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.data.token);
    console.log("Login exitoso:", data.data.user);
  }
};
```

### Ejemplo 3: Hacer petición autenticada

```typescript
const getUsuarios = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/usuarios", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log("Usuarios:", data);
};
```

---

## 🧪 Testing con Postman

### 1. Crear un usuario (Register)

```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "nombre": "Test",
  "apellido": "User",
  "correo": "test@vetasoft.com",
  "contrasena": "test123",
  "rol_id": 2
}
```

### 2. Login

```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "correo": "test@vetasoft.com",
  "contrasena": "test123"
}
```

**Copia el `token` de la respuesta**

### 3. Acceder a ruta protegida

```
GET http://localhost:3000/api/usuarios
Authorization: Bearer <PEGA_TU_TOKEN_AQUÍ>
```

---

## 🔍 Estructura del Token JWT

El token JWT contiene la siguiente información:

```typescript
{
  userId: number;      // ID del usuario
  email: string;       // Email del usuario
  roleId: number;      // ID del rol
  roleName?: string;   // Nombre del rol (opcional)
  iat: number;         // Timestamp de creación
  exp: number;         // Timestamp de expiración
}
```

---

## ⚠️ Errores Comunes

### Error 401: "Token no proporcionado"

- Asegúrate de enviar el header `Authorization: Bearer <token>`

### Error 401: "Token inválido o expirado"

- El token ha expirado (24h por defecto)
- El token no es válido
- Solución: Hacer login nuevamente

### Error 401: "Credenciales inválidas"

- Email o contraseña incorrectos

### Error 400: "El correo ya está registrado"

- El email ya existe en la base de datos

### Error 403: "Acceso denegado - No tienes los permisos necesarios"

- Tu rol no tiene permisos para acceder a ese recurso
