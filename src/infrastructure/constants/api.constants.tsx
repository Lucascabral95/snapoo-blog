export const API_ENDPOINTS = {
  USER: "/api/register",
  POSTEOS: "/api/posteos/posteosPorUsuario",
  INTERESES: "/api/intereses/interesesPorUsuario",
} as const;

export const CACHE_CONFIG = {
  REVALIDATE_USER: 300,
  REVALIDATE_POSTS: 60,
  REVALIDATE_REPOSTS: 60,
} as const;

export const API_ROUTES = {
  PROFILE: {
    BY_USERNAME: (username: string) => `/api/register?username=${username}`,
  },
  MEDIA: {
    BY_USER: (username: string) =>
      `/api/posteos/posteosPorUsuario?username=${username}`,
  },
  INTERACTIONS: {
    BY_USER: (username: string) =>
      `/api/intereses/interesesPorUsuario?username=${username}`,
  },
  POSTS: {
    BY_ID: (id: string) => `/api/posteos?id=${id}`,
    ALL: "/api/posteo",
  },
} as const;

export const CACHE_STRATEGIES = {
  PROFILE: { revalidate: 300 },
  MEDIA: { revalidate: 60 },
  INTERACTIONS: { revalidate: 60 },
  POST_DETAIL: { revalidate: 60 },
  FEED: { revalidate: 30 },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
