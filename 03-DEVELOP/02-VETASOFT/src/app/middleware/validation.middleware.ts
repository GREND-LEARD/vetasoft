/**
 * Validation Middleware
 * Middleware genérico para validar datos con Joi
 */

import { NextRequest, NextResponse } from 'next/server';
import Joi from 'joi';

/**
 * Middleware de validación genérico
 * @param schema - Esquema Joi para validar
 * @param handler - Handler original de la ruta
 * @returns Handler con validación
 */
export function withValidation(schema: Joi.ObjectSchema, handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      // Obtener el body del request
      const body = await request.json();

      // Validar con Joi
      const { error, value } = schema.validate(body, {
        abortEarly: false, // Retornar todos los errores, no solo el primero
        stripUnknown: true, // Remover campos no definidos en el schema
      });

      if (error) {
        // Formatear errores de validación
        const errors = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));

        return NextResponse.json(
          {
            success: false,
            error: 'Error de validación',
            details: errors,
          },
          { status: 400 }
        );
      }

      // Reemplazar el body del request con los valores validados
      // Esto asegura que solo se usen valores validados y sanitizados
      (request as any).validatedData = value;

      // Continuar con el handler original
      return handler(request, context);
    } catch (error) {
      // Si el body no es JSON válido
      return NextResponse.json(
        {
          success: false,
          error: 'El cuerpo de la petición debe ser JSON válido',
        },
        { status: 400 }
      );
    }
  };
}

/**
 * Helper para combinar múltiples middlewares
 * Útil para aplicar autenticación + validación
 * 
 * Ejemplo:
 * export const POST = combineMiddlewares(
 *   withAuth,
 *   withValidation(mySchema),
 *   myHandler
 * );
 */
export function combineMiddlewares(...middlewares: Function[]) {
  return middlewares.reduce((acc, middleware) => {
    return middleware(acc);
  });
}
