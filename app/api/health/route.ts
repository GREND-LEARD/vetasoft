/**
 * API Route de ejemplo: Health Check
 *
 * Endpoint: GET /api/health
 * Verifica si el servidor y la base de datos están funcionando
 */

import { NextResponse } from "next/server";
import { checkConnection } from "@/app/lib/db";

export async function GET() {
  try {
    const dbConnected = await checkConnection();

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: dbConnected ? "connected" : "disconnected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
