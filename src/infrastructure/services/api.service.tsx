import type { ApiResponse, FetchOptions } from "@/infrastructure/types";

const BASE_URL = process.env.NEXTAUTH_URL || "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Códigos de estado que indican "sin datos" pero no son errores fatales
const EMPTY_DATA_CODES = [400, 404] as const;

export async function fetchApi<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T | null> {
  try {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
      cache: options?.cache,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Manejar casos donde no hay datos (404, 400 para "sin resultados")
    if (EMPTY_DATA_CODES.includes(response.status as any)) {
      console.info(`No data found for ${endpoint}: ${response.status}`);
      return null;
    }

    // Errores reales del servidor
    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`,
        { endpoint, status: response.status }
      );
    }

    const data: ApiResponse<T> = await response.json();
    return data.result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Log pero no propagar errores de red
    console.error(`Network error fetching ${endpoint}:`, error);
    return null;
  }
}

// Versión con fallback para casos donde queremos devolver array vacío
export async function fetchApiWithFallback<T>(
  endpoint: string,
  fallbackValue: T,
  options?: FetchOptions
): Promise<T> {
  try {
    const result = await fetchApi<T>(endpoint, options);
    return result ?? fallbackValue;
  } catch (error) {
    console.error(`Error fetching ${endpoint}, using fallback:`, error);
    return fallbackValue;
  }
}
