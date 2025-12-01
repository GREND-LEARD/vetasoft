/**
 * API Route de ejemplo: Usuarios
 *
 * Endpoints:
 * - GET /api/users - Obtener todos los usuarios
 * - POST /api/users - Crear un nuevo usuario
 */

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/db";

// Tipo para el usuario
interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: Date;
}

// GET /api/users - Obtener todos los usuarios
export async function GET() {
  try {
    const users = await query<User[]>("SELECT * FROM users");

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener usuarios",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Crear nuevo usuario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Nombre y email son requeridos",
        },
        { status: 400 }
      );
    }

    // Insertar usuario
    const result = await query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Usuario creado exitosamente",
        data: { id: (result as any).insertId, name, email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error al crear usuario",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
