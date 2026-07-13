# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

- `npm run dev` — servidor de desarrollo en `http://localhost:3000`.
- `npm run build` — build de producción (también valida tipos).
- `npm run lint` — ESLint (`next/core-web-vitals`).
- `npm run test` — corre la suite de Vitest una vez (`vitest run`).
- `npm run test:watch` — Vitest en modo watch.
- Un solo archivo de test: `npx vitest run src/infrastructure/auth/route-policy.test.ts`.
- No hay `vitest.config`; Vitest corre con su configuración por defecto.
- Copiar `.env.template` a `.env.local` antes de levantar el proyecto (Mongo, Google OAuth, Cloudinary, Upstash Redis, Nodemailer, límites de rate limit).

## Arquitectura

Next.js 15 (App Router) + TypeScript + MongoDB/Mongoose. Alias `@/*` → `src/*`.

### Capas y una trampa importante de rutas duplicadas

El proyecto tiene **dos jerarquías paralelas para acceso a datos**, y solo una está realmente en uso:

- **En uso real:** `src/DAO/*DAO.tsx` (acceso a Mongo) y `src/models/*.tsx` (esquemas Mongoose) y `src/services/mongoDB.tsx` (conexión). Todas las API routes y el resto del código importan de `@/DAO/...` y `@/models/...`.
- **`src/infrastructure/DAO/` y `src/infrastructure/models/` son duplicados sin referencias** (nada los importa). No los uses ni los actualices en paralelo con los de `src/DAO` / `src/models`; si tocás lógica de acceso a datos, el original vive en `src/DAO` y `src/models`.
- `src/infrastructure/services/*` sí está activo, pero es una capa distinta: son servicios de **cliente** (fetch hacia las API routes, usados desde hooks de `src/presentation/hooks/`), no acceso a datos. Ejemplo: `useFeedPost.ts` llama a `@/infrastructure/services/feed.service`, que a su vez hace fetch a `src/app/api/posteos/route.tsx`, que llama a `@/DAO/PosteosDAO`.
- `src/services/authOptions.jsx` es legacy; la configuración de NextAuth real está en `src/infrastructure/auth/options.ts`.

Antes de agregar un archivo nuevo de tipos/DAO/modelo, revisá si ya existe una versión "viva" con `grep` por el nombre del import (`@/DAO/...` vs `@/infrastructure/DAO/...`) para no duplicar más.

### Autenticación y protección de rutas

- NextAuth (`src/infrastructure/auth/options.ts`): JWT sessions, Credentials (bcrypt) + Google OAuth. Auto-crea usuario en el primer login con Google.
- `src/middleware.tsx` protege rutas a nivel de Next.js middleware (no en cada page): usa `getToken` de `next-auth/jwt` + `isProtectedRoute`/`isPublicOnlyRoute` de `src/infrastructure/auth/route-policy.ts`, con las listas de rutas centralizadas en `src/infrastructure/config/routes.config.ts` (`PROTECTED_ROUTE_PREFIXES`, `PUBLIC_ONLY_ROUTES`, `REDIRECT_ROUTES`). Para agregar una ruta protegida o pública-only nueva, tocá `routes.config.ts` y el `matcher` en `middleware.tsx`.
- Registro por email pasa por OTP (`src/infrastructure/auth/registration-otp.ts`, modelo `PendingRegistration`) y tokens de verificación/reset (`src/infrastructure/auth/tokens.ts`, modelo `AuthToken`).
- Rate limiting de login/registro vía Upstash Redis (`src/infrastructure/auth/rate-limit.ts`), con límites configurables por env (`MAX_LOGIN_ATTEMPTS`, `MAX_REGISTER_ATTEMPTS`) parseados en `rate-limit-config.ts`.
- Validación de inputs de auth con Zod en `src/infrastructure/auth/schemas.ts`.

### Estructura general

- `src/app/`: App Router — páginas, layouts, `loading`/`error` por ruta, y `src/app/api/` con los route handlers (uno por recurso: `posteos`, `posteo`, `comentarios`, `intereses`, `datospersonales`, `upload`, `auth/*`, `register`).
- `src/presentation/components/`: componentes de UI agrupados por feature (`Feed`, `PostDetail`, `UserProfile`, `Settings`, `Auth`, `Search`, etc.), con sus SCSS/module styles al lado.
- `src/presentation/hooks/`: lógica de cliente (llaman a `@/infrastructure/services/*`, nunca directo a DAOs).
- `src/infrastructure/`: config (`config/`), tipos compartidos (`types/`), utilidades (`utils/`), constantes (`constants/`) y los servicios de cliente/auth descriptos arriba.
- Media e imágenes de usuario se sirven desde Cloudinary (`res.cloudinary.com`) y avatares de Google (`lh3.googleusercontent.com`) — whitelisteados en `next.config.ts` `images.remotePatterns`. Ese mismo archivo define headers de seguridad globales (CSP-adyacentes: `X-Frame-Options`, HSTS, etc.) aplicados a todas las rutas.

### Testing

Los tests existentes (`*.test.ts`) están junto al código que cubren, no en una carpeta separada (ver `src/infrastructure/auth/*.test.ts`). Seguí esa convención para tests nuevos.
