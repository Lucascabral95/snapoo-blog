import {
  Usuario,
  Posteo,
  Reposteo,
  ApiResponse,
} from "@/infrastructure/types/user.types";
import {
  API_ENDPOINTS,
  CACHE_CONFIG,
} from "@/infrastructure/constants/api.constants";

const BASE_URL = process.env.NEXTAUTH_URL;

async function handleApiRequest<T>(
  url: string,
  revalidate?: number
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

export async function obtenerUsuarioPorUsername(
  username: string
): Promise<Usuario | null> {
  const url = `${BASE_URL}${API_ENDPOINTS.USER}?username=${username}`;
  const result = await handleApiRequest<{ userName: Usuario }>(
    url,
    CACHE_CONFIG.REVALIDATE_USER
  );

  return result?.userName ?? null;
}

export async function obtenerPosteosPorUsuario(
  username: string
): Promise<Posteo[]> {
  const url = `${BASE_URL}${API_ENDPOINTS.POSTEOS}?username=${username}`;
  const result = await handleApiRequest<Posteo[]>(
    url,
    CACHE_CONFIG.REVALIDATE_POSTS
  );

  return result ?? [];
}

export async function obtenerReposteosPorUsuario(
  username: string
): Promise<Reposteo[]> {
  const url = `${BASE_URL}${API_ENDPOINTS.INTERESES}?username=${username}`;
  const result = await handleApiRequest<Reposteo[]>(
    url,
    CACHE_CONFIG.REVALIDATE_REPOSTS
  );

  return result ?? [];
}
