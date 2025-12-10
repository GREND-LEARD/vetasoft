import { TipoConsultaService } from "../services/tipo-consulta.service";
import { NextRequest, NextResponse } from "next/server";

export class TipoConsultaController {
static async getAll(request: NextRequest) {
    try {
        const tipoConsulta = await TipoConsultaService.findAll();

        return NextResponse.json({
            success: true,
            data: tipoConsulta,
        },
        { status: 200 }
    );
    } catch (error) {
        console.error("Error fetching tipo consulta:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Error al obtener el tipo de consulta",
            },
            { status: 500 }
        );
    }
}
static async getById(request: NextRequest, id: string) {
    try {
        const tipoConsulta = await TipoConsultaService.findById(Number(id));

        return NextResponse.json({
            success: true,
            data: tipoConsulta,
        },
        { status: 200 }
    );
    } catch (error) {
        console.error("Error fetching tipo consulta:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Error al obtener el tipo de consulta",
            },
            { status: 500 }
        );
    }
}

}