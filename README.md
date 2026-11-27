# 📌 Sistema de Ventas

Frontend de un sistema de ventas para gestionar productos, clientes y ventas desde una interfaz simple y funcional. Incluye dashboard con métricas, búsqueda, filtros, ordenamiento y paginación, y consume una API REST de .NET.

**Demo:** [https://sistema-ventas.nicopasino.space](https://sistema-ventas.nicopasino.space)

**Repo Backend API:** [https://github.com/NicoPasino/Sistema-Ventas-API](https://github.com/NicoPasino/Sistema-Ventas-API)

**Changelog:** [CHANGELOG.md](CHANGELOG.md)

![Versión](https://img.shields.io/badge/version-1.1.0-4B32C3)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)
![Licencia](https://img.shields.io/badge/Licencia-MIT-3DA639)

---

## 🚀 Funcionalidades

### Dashboard (Inicio)
- Bienvenida con la fecha actual y el nombre del usuario.
- KPIs: total de productos, ventas, clientes, categorías, unidades vendidas, facturación total, ticket promedio y valor del stock (sin productos inactivos).
- Gráfico de barras de ventas por día con rango 7/30/90 días, comparación con el período anterior y estados de carga/sin datos.
- Productos con bajo stock, top 5 de clientes y productos más vendidos, con toggle entre facturación y cantidad.
- Últimas ventas y tarjetas clickeables para acceder a cada sección.

### Productos
- CRUD completo con alta, edición, detalle y eliminación.
- Activación/desactivación lógica de productos (por defecto se listan solo los activos).
- Búsqueda local, filtro por estado (activos/inactivos/todos) y filtro por categoría.
- Ordenamiento desde los encabezados de la tabla y paginación configurable.
- Validación de datos y control de stock, con mínimo destacado en rojo.

### Clientes
- CRUD completo con alta, edición, detalle y eliminación.
- Búsqueda local, ordenamiento por columna y paginación.
- Vista de detalle compacta con estadísticas de compras, contactos en el header y botón "ver más".

### Ventas
- Historial de ventas con búsqueda, ordenamiento y paginación; hasta 4 productos por fila con tooltip para ver el resto.
- Registro de nuevas ventas rediseñado: selección de cliente, buscador de sugerencias reutilizable, modal selector de productos con búsqueda y paginación, atajo "Nuevo cliente", control de cantidades y cálculo de subtotales y total.
- Validación de stock en tiempo real (incluye lo ya agregado al carrito) antes de confirmar; el `Detalle` se envía en el POST.
- Detalle de venta compacto con productos, cantidades, totales y comprobante imprimible.

### Transversal
- Notificaciones y alertas para el resultado de las operaciones, mostrando el mensaje real de error de la API.
- Estados de carga, listas vacías y mensajes de error en todas las vistas.
- Tablas compactas y responsive con orden por encabezado, tooltips, nombres clickeables y botones de acción accesibles.
- Modales compactos con acciones compartidas (correo, teléfono e impresión).
- Diseño responsive con sidebar y header.
- Persistencia de la pestaña activa, el nombre de usuario y el tamaño de página en `localStorage`.

---

## 🛠️ Tecnologías

### Frontend
- **React 19** + **Vite 6** (plugin SWC)
- **JavaScript** (sin TypeScript)
- **Tailwind CSS v4** (vía `@tailwindcss/vite`) + CSS propio
- **pnpm** como gestor de paquetes
- **ESLint** (flat config)

### Backend (repositorio aparte)
- **.NET / C#**
- **MySQL** + **Entity Framework**
- API REST

---

## ⚙️ Instalación y ejecución

### Requisitos
- Node.js 22+
- pnpm
- Una instancia de la [API](https://github.com/NicoPasino/Sistema-Ventas-API) en ejecución

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/NicoPasino/sistema-ventas.git
cd sistema-ventas

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Ejecutar en desarrollo
pnpm dev
```

Editá `.env.local` con la URL base de la API:

```env
VITE_API_URL=https://localhost:7267/api/ventas
```

> Solo las variables con prefijo `VITE_` se exponen al cliente. Los archivos `.env` y `.env.local` están gitignoreados.

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo con HMR |
| `pnpm build` | Genera el build de producción en `dist/` |
| `pnpm preview` | Previsualiza el build de producción |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto |

---

## 📁 Estructura principal del proyecto

```text
sistema-ventas/
├── public/
│   ├── capturas/                 # Capturas usadas en el README
│   └── favicon.png
└── src/
    ├── components/
    │   ├── layout/               # Header y Sidebar
    │   ├── notification/         # Alert y Popup
    │   ├── pages/                # Tablas, paginación, tarjetas, toolbar y BuscadorSugerencias
    │   └── shared/               # Botones, modal y acciones reutilizables
    ├── context/
    │   ├── dataContext.jsx       # Estado global: productos, clientes, ventas
    │   ├── notificationContext.jsx
    │   └── userSettingsContext.jsx
    ├── Hooks/
    │   ├── useItems.js           # Datos + CRUD, filtros, búsqueda y orden
    │   ├── useCarritoVenta.js    # Carrito de Nueva Venta (duplicados, subtotales, validaciones)
    │   ├── usePaginacion.js      # Paginación client-side
    │   ├── useResumenDashboard.js # Agregaciones del dashboard
    │   └── userSettings.js       # Pestaña activa y usuario
    ├── layouts/
    │   └── MainLayout.jsx        # Sidebar + Header + contenido
    ├── pages/
    │   ├── Inicio/               # Hero, KPIs, serie, gráfico y tarjetas del dashboard
    │   ├── Productos/
    │   ├── Clientes/
    │   └── Ventas/               # Listado, detalle, comprobante y NuevaVenta/
    ├── services/
    │   └── api.js                # Capa de acceso a la API (CRUD)
    ├── utils/                    # Fechas, moneda, stock, estadísticas, ventas
    ├── validations/              # Validación de productos y clientes
    ├── App.jsx                   # Resolución de la vista según pestaña activa
    ├── index.css                 # Tailwind + clases globales
    └── main.jsx                  # Punto de entrada
```

---

## 🧱 Arquitectura

### Acceso a datos
Todas las llamadas a la API pasan por `src/services/api.js`, que expone `buildCollection(name)` con las operaciones:

```js
{ obtenerTodos, buscarPorCampo, obtenerPorId, agregar, eliminar, actualizar, cambiarActivo }
```

Las respuestas se normalizan a `{ ok, data }` o `{ ok, error, status }`, y se procesan con `CheckRes` (`src/utils/checkRes.js`) para mostrar notificaciones de forma consistente.

### Estado global
`DataProvider` (`src/context/dataContext.jsx`) expone `{ productos, clientes, ventas }`. Cada colección proviene de `useItems`, que centraliza:

- Carga de datos y manejo de `loading` / `error`.
- CRUD (`agregar`, `actualizar`, `eliminar`, `cambiarActivo`).
- Filtros locales por búsqueda y estado, ordenamiento y recarga.
- Conversión de fechas de UTC a hora local.

Las vistas con lógica propia usan hooks dedicados: `useResumenDashboard` centraliza las agregaciones del Inicio y `useCarritoVenta` gestiona el carrito de Nueva Venta.

### Navegación
No se usa react-router. `App.jsx` resuelve la vista a partir de la pestaña activa (`getTab`) contra un mapa de componentes. La pestaña y el usuario se persisten en `localStorage`.

### Tablas y paginación
Las vistas de listado usan `TablaPaginada`, que combina `TablaGenerica` + `Paginacion`. La paginación es 100 % client-side: recibe la lista filtrada completa y corta en tiempo de render. El tamaño de página (10/25/50/100, por defecto 25) se guarda en `localStorage` bajo `paginaSize_<clave>`.

### Impresión de comprobantes
El detalle de una venta permite imprimir su comprobante: `imprimirComprobanteVenta.jsx` renderiza `ComprobanteVenta` con `renderToStaticMarkup` (cargado bajo demanda) y `utils/imprimir.js` lo inyecta en un iframe oculto con CSS de impresión, sin alterar la vista actual.

### UI
Componentes reutilizables separados por área. Tailwind v4 se configura únicamente desde Vite (sin `tailwind.config.js` ni PostCSS), con clases globales en `src/index.css`.

---

## 🖼️ Capturas de pantalla

Capturas actualizadas a la v1.1.0.

### Dashboard

![Dashboard de inicio](public/capturas/Dashboard-Inicio.jpg)

### Productos

![Listado de productos](public/capturas/Productos.jpg)

### Nuevo producto

![Alta de producto](public/capturas/Producto-Nuevo.jpg)

### Clientes

![Listado de clientes](public/capturas/Clientes.jpg)

### Ventas

![Listado de ventas](public/capturas/Ventas.jpg)

### Detalle de venta

![Detalle de venta](public/capturas/Venta-Detalle.jpg)

### Nueva venta con validación de stock

![Error de stock al cargar una venta](public/capturas/Nueva-Venta-Error-Stock.jpg)

---

## 🗺️ Roadmap

- Gestión de cuentas y autenticación.
- Gráficos interactivos avanzados (biblioteca de charts).
- Base de datos local para modo offline (IndexedDB).
- Modal propio para confirmaciones (reemplazo de `confirm()`).

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

---

## 🧑‍💻 Autor

**Nicolás Pasino** — nico_pasino@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-nicolas--pasino-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolas-pasino/)
[![Portfolio](https://img.shields.io/badge/Portfolio-nicopasino.space-4B32C3?style=flat&logo=internet-explorer&logoColor=white)](https://nicopasino.space)
