/**
 * Animales Service
 * Maneja las operaciones de base de datos para animales
 */

import { sql } from "@/app/lib/db";

export class AnimalesService {
  /**
   * Obtener todos los animales con filtros opcionales
   */
  static async findAll(filters: {
    cliente_id: number | null;
    estado: string | null;
  }) {
    const animales = await sql`
      SELECT 
        a.*,
        c.nombre as cliente_nombre,
        c.documento_id as cliente_documento,
        r.nombre_raza,
        e.nombre_especie
      FROM animales a
      LEFT JOIN clientes c ON a.cliente_id = c.cliente_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE a.activo = true
        AND (${filters.cliente_id}::int IS NULL OR a.cliente_id = ${filters.cliente_id}::int)
        AND (${filters.estado}::text IS NULL OR a.estado = ${filters.estado}::text)
      ORDER BY a.fecha_ingreso DESC
    `;

    return animales;
  }


  static async findById(id: string) {
    const animals = await sql`
      SELECT 
        a.*,
        c.nombre as cliente_nombre,
        c.telefono as cliente_telefono,
        c.correo as cliente_correo,
        r.nombre_raza,
        e.nombre_especie
      FROM animales a
      LEFT JOIN clientes c ON a.cliente_id = c.cliente_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE a.animal_id = ${id}
    `;
    if (animals.length === 0) return null;
    const historial = await sql`
      SELECT 
        h.*,
        v.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre
      FROM historial_medico h
      LEFT JOIN veterinarios vet ON h.veterinario_id = vet.veterinario_id
      LEFT JOIN usuarios v ON vet.usuario_id = v.usuario_id
      LEFT JOIN tipo_consulta tc ON h.tipo_consulta_id = tc.tipo_consulta_id
      WHERE h.animal_id = ${id}
      ORDER BY h.fecha_consulta DESC
      LIMIT 10
    `;

    const vacunas = await sql`
      SELECT 
        hv.*,
        v.nombre as vacuna_nombre,
        vet_user.nombre as veterinario_nombre
      FROM historial_vacunacion hv
      LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
      LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
      LEFT JOIN usuarios vet_user ON vet.usuario_id = vet_user.usuario_id
      WHERE hv.animal_id = ${id}
      ORDER BY hv.fecha_vacunacion DESC
      LIMIT 10
    `;

    return {
      ...animals[0],
      historial_medico: historial,
      historial_vacunacion: vacunas,
    };
  }
  
  static async update(id: string, data: {
    nombre?: string;
    raza_id?: number;
    cliente_id?: number;
    fecha_nacimiento?: string;
    sexo?: string;
    color?: string;
    estado?: string;
    observaciones?: string;
  }) {
    const result = await sql`
      UPDATE animales
      SET 
        nombre = COALESCE(${data.nombre}, nombre),
        raza_id = COALESCE(${data.raza_id}, raza_id),
        cliente_id = COALESCE(${data.cliente_id}, cliente_id),
        fecha_nacimiento = COALESCE(${data.fecha_nacimiento}, fecha_nacimiento),
        sexo = COALESCE(${data.sexo}, sexo),
        color = COALESCE(${data.color}, color),
        estado = COALESCE(${data.estado}, estado),
        observaciones = COALESCE(${data.observaciones}, observaciones)
      WHERE animal_id = ${id}
      RETURNING *
    `;
    return result[0] || null;
  }
  
  static async delete(id: string) {
    const result = await sql`
      UPDATE animales
      SET activo = false
      WHERE animal_id = ${id}
      RETURNING *
    `;
    return result[0] || null;
  }

  static async create(data: {
    nombre: string;
    raza_id: number;
    cliente_id: number;
    fecha_nacimiento?: string;
    sexo: string;
    color?: string;
    estado?: string;
    observaciones?: string;
  }) {
    const result = await sql`
      INSERT INTO animales (
        nombre,
        raza_id,
        cliente_id,
        fecha_nacimiento,
        sexo,
        color,
        estado,
        observaciones,
        activo,
        fecha_ingreso
      )
      VALUES (
        ${data.nombre},
        ${data.raza_id},
        ${data.cliente_id},
        ${data.fecha_nacimiento || null},
        ${data.sexo},
        ${data.color || null},
        ${data.estado || 'Activo'},
        ${data.observaciones || null},
        true,
        NOW()
      )
      RETURNING *
    `;
    return result[0];
  }

}
