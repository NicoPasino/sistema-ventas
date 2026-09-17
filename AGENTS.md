# AGENTS.md

## Stack
React 19 + Vite 6, plain JavaScript (no TypeScript), Tailwind CSS v4 via the `@tailwindcss/vite` plugin, pnpm. **Frontend only** — the backend is a separate .NET/MySQL repo (Sistema-Ventas-API).

## Commands
- `pnpm dev` — Vite dev server
- `pnpm build` — production build to `dist/`
- `pnpm preview` — preview the build
- `pnpm lint` — ESLint (flat config); run before committing. No test suite or typecheck exists.

## Environment
- One env var: `VITE_API_URL`, the API base URL, read in `src/services/api.js:1` via `import.meta.env`. Requests are built as `${VITE_API_URL}/${collection}` (productos, ventas, clientes, categorias).
- `.env` / `.env.local` are gitignored; copy `.env.example` to `.env.local` to develop locally. Only `VITE_`-prefixed vars reach the client.

## Architecture
- Navigation is **not** react-router. `App.jsx` looks up `UserSettingsContext.getTab` in a `componentes` map to render pages. Active tab + username persist to localStorage key `usuario` via `src/Hooks/userSettings.js`. Extend the tab map for new pages; do not introduce routing (react-router-dom is installed but unused).
- All API calls go through `buildCollection(name)` in `src/services/api.js`, returning `{obtenerTodos, buscarPorCampo, obtenerPorId, agregar, eliminar, actualizar}`.
- Global state: `DataProvider` (`src/context/dataContext.jsx`) exposes `{productos, clientes, ventas}`, each from `useItems({itemsDB, categoriasDB?})` in `src/Hooks/useItems.js` (items + CRUD + `filtrarItemsLocal` for client-side filter, `buscarItems` for server search, plus loading/error/mensaje/categorias).
- Feedback pattern: `NotificationProvider` (`src/context/notificationContext.jsx`) exposes `showAlert`/`showPopup`, reachable via `useAlert()` / `usePopup()` / `useNotifications()` (all aliases of the same context). Standard flow is `CheckRes(res, { onSuccess, onMessage, showPopup })` from `src/utils/checkRes.js`.

## Conventions
- The codebase is Spanish (es-AR): identifiers, UI copy, and commit messages. Follow existing naming.
- Feature views live in `src/pages/{Inicio,Productos,Clientes,Ventas}/`; shared UI in `src/components/{layout,pages,notification}/`; also `src/Hooks/` (capital H), `src/context/`, `src/services/`, `src/utils/`, `src/validations/`.
- Tailwind v4 is configured via Vite only — no `tailwind.config.js` or PostCSS. `src/index.css` has `@import "tailwindcss"` plus global classes (`.colorRojoClaro`, `.flexSeparados`, etc.); reuse them before adding new CSS.
- ESLint (`eslint.config.js`) ignores `dist/`; `no-unused-vars` ignores `^[A-Z_]`.

## Gotchas
- `bootstrap` and `idb` are dependencies but unimported — use Tailwind + custom CSS, not bootstrap.
- `privado/` and `.env*` are gitignored; never commit anything from `privado/` (private notes that may reference stale import paths).
- Delete confirmation uses the native `confirm()` in `useItems.js` (TODO'd for a modal).
- No CI or pre-commit hooks; `pnpm lint` is the only gate.