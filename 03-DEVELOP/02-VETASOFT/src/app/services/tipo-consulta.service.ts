
import { sql } from "@/app/lib/db";

export class TipoConsultaService {
    static async findAll() {
        const tipoConsulta = await sql`
            SELECT * FROM tipo_consulta
        `;
        return tipoConsulta;
    }

    static async findById(id: number) {
        const tipoConsulta = await sql`
            SELECT * FROM tipo_consulta WHERE id = ${id}
        `;
        return tipoConsulta;
    }


}