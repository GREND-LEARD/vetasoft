/**
 * Clientes Service
 * Maneja las operaciones de base de datos para clientes
 */

import { sql } from "@/app/lib/db";

export class ClientesService {
  /**
   * Obtener todos los clientes activos
   */
  static async findAll() {
    const clientes = await sql`
      SELECT 
        c.*,
        u.nombre as empleado_nombre,
        COUNT(a.animal_id) as total_animales
      FROM clientes c
      LEFT JOIN usuarios u ON c.empleado_id = u.usuario_id
      LEFT JOIN animales a ON c.cliente_id = a.cliente_id AND a.activo = true
      WHERE c.activo = true
      GROUP BY c.cliente_id, u.nombre
      ORDER BY c.fecha_registro DESC
    `;

    return clientes;
  }

  // TODO: Agregar métodos para POST
  // static async create(data: ClienteData) { ... }

  /**
   * Obtener un cliente por ID con sus animales
   */
  static async findById(id: string) {
    const clientes = await sql`
      SELECT 
        c.*,
        u.nombre as empleado_nombre
      FROM clientes c
      LEFT JOIN usuarios u ON c.empleado_id = u.usuario_id
      WHERE c.cliente_id = ${id}
    `;

    if (clientes.length === 0) return null;

    // Obtener animales del cliente
    const animales = await sql`
      SELECT 
        a.*,
        r.nombre_raza,
        e.nombre_especie
      FROM animales a
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE a.cliente_id = ${id} AND a.activo = true
      ORDER BY a.fecha_ingreso DESC
    `;

    return {
      ...clientes[0],
      animales: animales,
    };
  }

  // TODO: Agregar método update(id, data) para PUT
  // TODO: Agregar método delete(id) para DELETE
}
