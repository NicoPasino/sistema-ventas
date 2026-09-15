# 📌 Sistema de Ventas

Sistema de ventas web (frontend) que permite gestionar productos, clientes y ventas con una interfaz simple y funcional. Consume una API REST de .NET como backend.

**Demo:** [sistema-ventas.nicopasino.space](https://sistema-ventas.nicopasino.space)

**Backend API:** [Sistema-Ventas-API](https://github.com/NicoPasino/Sistema-Ventas-API)

---

## 🚀 Funcionalidades

- **Dashboard (Inicio):** bienvenida, productos con bajo stock y top clientes.
- **Productos:** CRUD completo con búsqueda y filtros por categoría.
- **Clientes:** CRUD completo con búsqueda y filtros.
- **Ventas:** Historial de ventas y registro de nuevas ventas con selección de productos y cantidades.

---

## 🛠️ Tecnologías

### Frontend
- **React 19** + **Vite 6**
- **Tailwind CSS** (`@tailwindcss/vite`)
- **JavaScript**
- **pnpm**

### Backend (repositorio aparte)
- **.NET / C#**
- **MySQL** + **Entity Framework**

---
<!-- 
## ⚙️ Instalación y ejecución

```bash
# Requisitos: Node.js y pnpm instalados

# 1. Clonar el repositorio
git clone https://github.com/NicoPasino/sistema-ventas.git
cd sistema-ventas

# 2. Instalar dependencias
pnpm install

# 3. Ejecutar en desarrollo
pnpm dev
```

### Scripts disponibles

- `pnpm dev`    → Inicia el servidor de desarrollo.
- `pnpm build`  → Genera el build de producción.
- `pnpm preview`→ Previsualiza el build de producción.
- `pnpm lint`   → Ejecuta ESLint.

> La API base se selecciona automáticamente según el entorno: `localhost:7267` en desarrollo y `nicopasino.space` en producción (`src/config.js`).

---
-->
## 📁 Estructura del proyecto

```bash
sistema-ventas/
└── src/
    ├── main.jsx                    # Punto de entrada
    ├── App.jsx                     # Componente principal (Header, Nav, Main)
    ├── config.js                   # Flag isDev según MODO
    ├── context/
    │   ├── dataContext.jsx         # Estado global: productos, clientes, ventas
    │   └── userSettingsContext.jsx # Configuración de usuario y tab activa
    ├── services/
    │   └── apiClient.js            # Conexion con el servidor (API Layer)
    ├── Hooks/
    │   └── useItems.js             # Hook reusable de datos (CRUD + búsqueda)
    ├── components/
    │   ├── header.jsx, nav.jsx     # Layout
    │   ├── tabs/main.jsx           # Router de tabs
    │   ├── tabs/Inicio.jsx         # Dashboard
    │   ├── tabs/Productos/         # Gestión de productos
    │   ├── tabs/Clientes/          # Gestión de clientes
    │   ├── tabs/Ventas/            # Nueva venta + historial
    │   ├── tabs/Reportes.jsx       # (En desarrollo)
    │   ├── tabs/Proveedores.jsx    # (En desarrollo)
    │   └── tabs/shared/            # Componentes reutilizables (tablas, modales)
    └── utils/
        └── time/                   # Helpers de fechas
```

---

## 🧱 Arquitectura

- **API:** todas las llamadas pasan por `src/services/apiClient.js`, que expone la función `buildCollection(name)` para las operaciones CRUD: `obtenerTodos`, `buscarPorCampo`, `obtenerPorId`, `agregar`, `eliminar`, `actualizar`.
- **Estado global:** `DataProvider` (en `dataContext.jsx`) expone `{ productos, clientes, ventas }`, cada uno con el resultado del hook `useItems`.
- **UI:** componente `TablaGenerica` y elementos reutilizables en `components/tabs/shared/` para mantener las vistas consistentes.

---

## 🗺️ Roadmap

- Gestión de proveedores.
- Reportes y exportación (PDF/Excel).
- Dashboard con gráficos interactivos.
- Base de datos local (offline).
- Gestión de cuentas y autenticación.

---

## 🖼️ Capturas de pantalla

### Inicio

![Inicio](/capturas/index.png)

### Productos

![Productos](/capturas/productos.png)

### Crear Producto

![Crear producto](/capturas/crear-producto.png)

### Ventas

![Ventas](/capturas/ventas.png)

### Crear venta

![Crear venta](/capturas/crear-venta.png)

---

## 🧑‍💻 Autor

**Nicolás Pasino** — nico_pasino@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-nicolas--pasino-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolas-pasino/)
[![Portfolio](https://img.shields.io/badge/Portfolio-nicopasino.space-4B32C3?style=flat&logo=internet-explorer&logoColor=white)](https://nicopasino.space)
