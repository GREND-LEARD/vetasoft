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

  // TODO: Agregar métodos para POST *******************************************
  // static async create(data: ClienteData) { ... }

  static async create(data: any) {
  const cliente = await sql`
    INSERT INTO clientes (
      nombre,
      email,
      telefono,
      direccion,
      fecha_nacimiento,
      documento_identidad,
      empleado_id
    ) VALUES (
      ${data.nombre},
      ${data.email},
      ${data.telefono},
      ${data.direccion},
      ${data.fecha_nacimiento},
      ${data.documento_identidad},
      ${data.empleado_id}
    ) RETURNING *;
  `;

  return cliente[0];
}

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

  // TODO: Agregar método update(id, data) para PUT ****************************
  static async update(id: string, data: any) {
    const cliente = await sql`
      UPDATE clientes
      SET
        nombre = ${data.nombre},
        email = ${data.email},
        telefono = ${data.telefono},
        direccion = ${data.direccion},
        fecha_nacimiento = ${data.fecha_nacimiento},
        documento_identidad = ${data.documento_identidad},
        empleado_id = ${data.empleado_id}
      WHERE cliente_id = ${id}
      RETURNING *;
    `;
    
return cliente[0]|| null;
  }

// TODO: Agregar método delete(id) para DELETE

static async deactivate(id: string) {
  const cliente = await sql`
    UPDATE clientes
    set activo = false
    WHERE cliente_id = ${id}
    RETURNING *;
  `;  
  return cliente[0] || null;
}
}
