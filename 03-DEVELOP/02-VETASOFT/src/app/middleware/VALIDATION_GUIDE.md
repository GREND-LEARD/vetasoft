# 🔐 Joi Validation - Usage Guide

## ✅ Validación Implementada

El sistema ahora usa **Joi** para validaciones robustas en todos los endpoints de autenticación.

---

## 📋 Esquemas Disponibles

### 1. **Login Schema**

```typescript
{
  correo: string (email válido, requerido),
  contrasena: string (mínimo 6 caracteres, requerido)
}
```

### 2. **Register Schema**

```typescript
{
  nombre: string (2-50 caracteres, requerido),
  apellido: string (2-50 caracteres, requerido),
  correo: string (email válido, requerido),
  contrasena: string (mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, requerido),
  rol_id: number (opcional, default: 2)
}
```

### 3. **Update User Schema**

```typescript
{
  nombre?: string (2-50 caracteres),
  apellido?: string (2-50 caracteres),
  correo?: string (email válido),
  contrasena?: string (mínimo 8, requisitos de complejidad),
  rol_id?: number,
  activo?: boolean
}
```

---

## 🛠️ Cómo Usar

### Opción 1: En rutas individuales

```typescript
import { withValidation } from "@/app/middleware/validation.middleware";
import { loginSchema } from "@/app/utils/validation.schemas";

export const POST = withValidation(loginSchema, (request: NextRequest) => {
  // Los datos validados están en request.validatedData
  const { correo, contrasena } = (request as any).validatedData;
  return MyController.login(request);
});
```

### Opción 2: Combinar con autenticación

```typescript
import { combineMiddlewares } from "@/app/middleware/validation.middleware";
import { withAuth } from "@/app/middleware/auth.middleware";
import { withValidation } from "@/app/middleware/validation.middleware";
import { updateUserSchema } from "@/app/utils/validation.schemas";

export const PUT = combineMiddlewares(
  withAuth,
  withValidation(updateUserSchema),
  (request: NextRequest) => {
    const user = (request as any).user; // Usuario autenticado
    const data = (request as any).validatedData; // Datos validados
    return MyController.update(request);
  }
);
```

---

## 📝 Ejemplos de Errores de Validación

### Ejemplo 1: Email inválido

**Request:**

```json
{
  "correo": "no-es-email",
  "contrasena": "123456"
}
```

**Response (400):**

```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "field": "correo",
      "message": "El correo debe ser válido"
    }
  ]
}
```

### Ejemplo 2: Contraseña débil

**Request:**

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "contrasena": "123"
}
```

**Response (400):**

```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "field": "contrasena",
      "message": "La contraseña debe tener al menos 8 caracteres"
    }
  ]
}
```

### Ejemplo 3: Múltiples errores

**Request:**

```json
{
  "correo": "invalid",
  "contrasena": "12"
}
```

**Response (400):**

```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "field": "correo",
      "message": "El correo debe ser válido"
    },
    {
      "field": "contrasena",
      "message": "La contraseña debe tener al menos 6 caracteres"
    }
  ]
}
```

---

## 🎨 Crear tus propios esquemas

```typescript
// src/app/utils/validation.schemas.ts
import Joi from "joi";

export const miEsquema = Joi.object({
  campo1: Joi.string().min(5).required().messages({
    "string.min": "Mínimo 5 caracteres",
    "any.required": "Campo requerido",
  }),
  campo2: Joi.number().integer().positive().optional(),
});
```

Luego úsalo en tu ruta:

```typescript
import { withValidation } from "@/app/middleware/validation.middleware";
import { miEsquema } from "@/app/utils/validation.schemas";

export const POST = withValidation(miEsquema, myHandler);
```

---

## ✨ Beneficios

- ✅ **Validación centralizada** - Un solo lugar para todas las reglas
- ✅ **Mensajes en español** - Errores claros para el usuario
- ✅ **Type-safe** - Los datos validados tienen el tipo correcto
- ✅ **Auto-sanitización** - Remueve campos no permitidos
- ✅ **Reutilizable** - Mismos esquemas en múltiples endpoints
