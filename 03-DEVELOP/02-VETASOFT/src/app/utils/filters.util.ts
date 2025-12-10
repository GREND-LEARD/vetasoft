/**
 * Filters Utility
 * Funciones reutilizables para parsear filtros de query params
 */

/**
 * Parsea el filtro "activo" de los query params
 * @param searchParams - URLSearchParams del request
 * @returns boolean | null
 */
export function parseActivoFilter(searchParams: URLSearchParams): boolean | null {
  const activo = searchParams.get("activo");
  return activo !== null ? activo === "true" : null;
}

/**
 * Parsea filtros numéricos (IDs) de los query params
 * @param searchParams - URLSearchParams del request
 * @param paramName - Nombre del parámetro a parsear
 * @returns number | null
 */
export function parseNumberFilter(searchParams: URLSearchParams, paramName: string): number | null {
  const value = searchParams.get(paramName);
  return value ? parseInt(value, 10) : null;
}

/**
 * Parsea múltiples filtros comunes de una sola vez
 * @param searchParams - URLSearchParams del request
 * @param filterNames - Array de nombres de filtros a parsear
 * @returns Objeto con los filtros parseados
 */
export function parseFilters(searchParams: URLSearchParams, filterNames: string[]): Record<string, any> {
  const filters: Record<string, any> = {};

  filterNames.forEach((filterName) => {
    const value = searchParams.get(filterName);
    
    // Si el filtro es "activo", parsearlo como boolean
    if (filterName === "activo") {
      filters[filterName] = value !== null ? value === "true" : null;
    }
    // Si termina en "_id", parsearlo como número
    else if (filterName.endsWith("_id")) {
      filters[filterName] = value ? parseInt(value, 10) : null;
    }
    // De lo contrario, dejarlo como string
    else {
      filters[filterName] = value || null;
    }
  });

  return filters;
}
