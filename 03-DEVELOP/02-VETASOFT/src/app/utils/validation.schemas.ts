/**
 * Validation Schemas usando Joi
 * Esquemas de validación para endpoints de autenticación
 */

import Joi from 'joi';

/**
 * Esquema de validación para Login
 */
export const loginSchema = Joi.object({
  correo: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El correo debe ser válido',
      'string.empty': 'El correo es requerido',
      'any.required': 'El correo es requerido',
    }),
  contrasena: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.empty': 'La contraseña es requerida',
      'any.required': 'La contraseña es requerida',
    }),
});

/**
 * Esquema de validación para Registro
 */
export const registerSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 50 caracteres',
      'string.empty': 'El nombre es requerido',
      'any.required': 'El nombre es requerido',
    }),
    correo: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El correo debe ser válido',
      'string.empty': 'El correo es requerido',
      'any.required': 'El correo es requerido',
    }),
  contrasena: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
      'string.empty': 'La contraseña es requerida',
      'any.required': 'La contraseña es requerida',
    }),
  rol_id: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      'number.base': 'El rol_id debe ser un número',
      'number.integer': 'El rol_id debe ser un número entero',
      'number.min': 'El rol_id debe ser mayor a 0',
    }),
});

/**
 * Esquema de validación para actualizar usuario
 */
export const updateUserSchema = Joi.object({
  nombre: Joi.string().min(2).max(50).optional(),
  correo: Joi.string().email().optional(),
  contrasena: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .optional(),
  rol_id: Joi.number().integer().min(1).optional(),
  activo: Joi.boolean().optional(),
}).min(1); // Al menos un campo debe estar presente
