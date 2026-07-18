# AGENTS.md - Sistema de Ventas

## Quick Reference
- **Stack**: React 19 + Vite + pnpm + Tailwind CSS v4 + ESLint (flat config)
- **Package Manager**: pnpm (see `pnpm-workspace.yaml` — only disables SWC/esbuild builds, not a monorepo)
- **API**: .NET backend at `https://nicopasino.space/api/ventas` (prod) / `localhost:7267` (dev)

## Commands
```bash
pnpm dev       # Start dev server
pnpm build     # Production build (outputs to dist/)
pnpm lint      # Run ESLint on all .js/.jsx files
pnpm preview   # Preview production build
```
Run `pnpm lint` before committing.

## Project Structure
```
src/
├── main.jsx              # Entry point, wraps App in providers
├── App.jsx               # Root component (Header, Nav, Main)
├── config.js             # isDev flag via import.meta.env.MODE
├── context/
│   ├── dataContext.jsx   # Provides productos, clientes, ventas via useItems hook
│   └── userSettingsContext.jsx
├── services/
│   └── apiClient.js      # API client with buildCollection() factory
├── Hooks/
│   └── useItems.js       # Reusable data fetching hook (CRUD + search)
├── components/
│   ├── header.jsx, nav.jsx
│   ├── tabs/
│   │   ├── main.jsx      # Tab router (Inicio, Productos, Ventas, Clientes, Proveedores, Reportes)
│   │   ├── Productos/, Ventas/, Clientes/  # Feature tabs
│   │   └── shared/       # Generic table, modals, popups
│   ├── modal.jsx, icons.jsx
│   └── shared/ApiResponsePopup.jsx
└── utils/
    └── time/             # Date helpers
```

## Key Conventions
- **API calls**: All through `apiClient.js` using `buildCollection(name)` → returns `{obtenerTodos, buscarPorCampo, obtenerPorId, agregar, eliminar, actualizar}`
- **Data fetching**: Use `useItems({itemsDB, categoriasDB?})` hook → returns `{items, agregar, actualizar, eliminar, obtenerItem, reloadItems, buscarItems, filtrarItemsLocal, loading, error, mensaje, categorias}`
- **Context**: `DataProvider` exposes `{productos, clientes, ventas}` each with the `useItems` return value
- **Environment**: `isDev` from `config.js` switches API base URL
- **Lint rule**: `no-unused-vars` ignores `^[A-Z_]` (allows unused uppercase constants)
- **Import style**: Relative paths with `.js`/`.jsx` extensions

## Framework & Toolchain
- **Tailwind CSS v4**: Integrated via `@tailwindcss/vite` plugin (see `vite.config.js`). Use `@import "tailwindcss"` in CSS files (see `src/index.css`). Do not use PostCSS-based Tailwind v3 setup.
- **ESLint**: Flat config in `eslint.config.js`. Ignores `dist/`. Run with `pnpm lint`.

## Gotchas
- Backend is separate (.NET/C#/MySQL) — this repo is **frontend only**
- `apiClient.js:3` imports `ApiResponsePopup` but it's unused (TODO comment)
- `useItems.js:68` uses `confirm()` for delete — marked TODO for modal replacement
- No test suite configured
- No TypeScript (uses JSDoc-style type hints via eslint globals)
- `react-router-dom` is in devDependencies but not used in code (check if needed)
- `bootstrap` and `idb` are in `dependencies` but not imported anywhere — likely leftover from earlier iterations

## CI / Pre-commit
- No CI workflows or Husky hooks configured
- Only `pnpm lint` validates code locally