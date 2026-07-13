# Repository Guidelines

## Project Structure & Module Organization

Snapoo is a Next.js 15 photography social network. App Router pages, layouts, API routes, and route-level loading/error states live in `src/app/`; for example, `src/app/api/` contains handlers and `src/app/feed/` contains feed routes. Keep UI components and their SCSS/module styles together under `src/presentation/components/`, and reusable client logic in `src/presentation/hooks/`.

Data models belong in `src/models/`; database access is isolated in `src/DAO/`; shared services, types, constants, configuration, and utilities live in `src/infrastructure/`. Static images and icons go in `public/`. Use the `@/*` alias for imports from `src/`.

## Build, Test, and Development Commands

- `npm install` installs locked dependencies from `package-lock.json`.
- `npm run dev` starts the local Next.js development server at `http://localhost:3000`.
- `npm run lint` runs ESLint with Next.js Core Web Vitals rules.
- `npm run build` creates the production build and performs Next.js type/build validation.
- `npm run start` serves a completed production build.

Copy `.env.template` to `.env.local` for local configuration. Never commit `.env` or `.env.local`, or expose database, OAuth, and Cloudinary credentials.

## Coding Style & Naming Conventions

Use TypeScript for new code when practical, preserve strict typing, and prefer the `@/` import alias. Follow the existing four-space indentation and semicolon style. Name React components in PascalCase (`FeedContainer.tsx`), hooks with `use` in camelCase (`useSearchPosts.ts`), and route files with Next.js conventions (`page.tsx`, `route.tsx`, `loading.tsx`). Keep presentation code separate from DAO and infrastructure concerns. Use SCSS files or `*.module.scss` beside the component they style; reserve `globals.css` for global rules.

## Testing Guidelines

There is currently no committed test runner or test suite, despite references in the README. Add focused tests with any new testing setup, using `*.test.ts(x)` or `*.spec.ts(x)` names, and document the corresponding npm script. Until then, every change must pass `npm run lint` and `npm run build`; manually exercise affected pages and API routes.

## Commit & Pull Request Guidelines

History primarily follows Conventional Commit prefixes: `feat:`, `fix:`, `refactor:`, and `style:`. Write imperative, scoped summaries, e.g. `fix: prevent empty image uploads`. Keep commits focused. PRs should explain the user-visible change, link the relevant issue when available, state validation performed, and include screenshots or recordings for UI changes. Flag any environment-variable or migration requirement clearly.
