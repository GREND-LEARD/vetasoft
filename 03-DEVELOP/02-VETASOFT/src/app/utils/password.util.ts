import bcrypt from 'bcryptjs';

export class PasswordUtil {
/**   
 * Hashear una contraseña
 * @param password - Contraseña en texto plano
 * @returns Hash de la contraseña
 */
static async hash(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de salt
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Verificar si una contraseña coincide con su hash
 * @param password - Contraseña en texto plano
 * @param hash - Hash almacenado en la BD
 * @returns true si coincide, false si no
 */
static async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
}