import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: number;
  email: string;
  roleId: number;
  roleName?: string;
}

export class JwtUtil { 
  private static readonly SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
  private static readonly EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

  /**
   * Generar un token JWT
   * @param payload - Datos del usuario a incluir en el token
   * @returns Token JWT firmado
   */
  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.SECRET, { 
      expiresIn: this.EXPIRES_IN 
    } as jwt.SignOptions);
  }

  /**
   * Verificar y decodificar un token JWT
   * @param token - Token JWT a verificar
   * @returns Payload del token si es válido, null si no lo es
   */
  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Decodificar un token sin verificar (útil para debugging)
   * @param token - Token JWT a decodificar
   * @returns Payload decodificado o null
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
