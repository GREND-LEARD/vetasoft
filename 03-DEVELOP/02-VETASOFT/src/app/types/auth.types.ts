export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  rol_id?: number;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      usuario_id: number;
      nombre: string;
      apellido: string;
      correo: string;
      rol_id: number;
      nombre_rol?: string;
      activo?: boolean;
      fecha_registro?: string;
    };
    token: string;
  };
  message?: string;
  error?: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  data?: {
    userId: number;
    email: string;
    roleId: number;
    roleName?: string;
  };
  message?: string;
  error?: string;
}
