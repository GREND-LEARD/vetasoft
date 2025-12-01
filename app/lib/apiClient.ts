/**
 * Cliente API Base para el monolito Next.js
 *
 * Este archivo configura el cliente HTTP que usarán todos los servicios
 * para comunicarse con las API Routes internas de Next.js.
 */

// Ahora usamos las API Routes internas de Next.js (monolito)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

/**
 * Realiza una petición HTTP a las API Routes
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * Métodos helper para peticiones comunes
 */
export const api = {
  get: <T>(endpoint: string) => apiClient<T>(endpoint, { method: "GET" }),

  post: <T>(endpoint: string, data: unknown) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) => apiClient<T>(endpoint, { method: "DELETE" }),
};
