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
- **CSS, Tailwind CSS**
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

---
-->
## 📁 Estructura principal del proyecto

```bash
sistema-ventas/
└── src/
    ├── components/
    │   ├── tabs/
    │   │   ├── Productos/         # Gestión de productos
    │   │   ├── Clientes/          # Gestión de clientes
    │   │   ├── Ventas/            # Nueva venta + historial
    │   │   ├── shared/            # Componentes reutilizables (tablas, modales)
    │   │   │
    │   │   ├── Inicio.jsx         # Dashboard
    │   │   └── main.jsx           # Router de tabs
    │   │
    │   ├── header.jsx             # Header de la app
    │   └── nav.jsx                # Nav de la app
    │
    ├── context/
    │   ├── dataContext.jsx         # Estado global: productos, clientes, ventas
    │   └── userSettingsContext.jsx # Configuración de usuario y tab activa
    │
    ├── Hooks/
    │   └── useItems.js             # Hook reusable de datos (CRUD + búsqueda)
    │
    ├── services/
    │   └── api.js                  # Conexion con el servidor (API Layer)
    │
    ├── App.jsx                     # Componente principal (Header, Nav, Main(router de tabs))
    └── main.jsx                    # Punto de entrada

```

---

## 🧱 Arquitectura

- **API:** todas las llamadas pasan por `src/services/api.js`, que expone la función `buildCollection(name)` para las operaciones CRUD: `obtenerTodos`, `buscarPorCampo`, `obtenerPorId`, `agregar`, `eliminar`, `actualizar`.
- **Estado global:** `DataProvider` (en `dataContext.jsx`) expone `{ productos, clientes, ventas }`, cada uno con el resultado del hook `useItems`.
- **UI:** componente `TablaGenerica` y elementos reutilizables en `components/tabs/shared/` para mantener las vistas consistentes.
<!-- - **Estilos**: `tailwind` co-location (cada .css junto a su componente):. -->

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

![Inicio](/public/capturas/index.png)

### Productos

![Productos](/public/capturas/productos.png)

### Crear Producto

![Crear producto](/public/capturas/crear-producto.png)

### Ventas

![Ventas](/public/capturas/ventas.png)

### Crear venta

![Crear venta](/public/capturas/crear-venta.png)

---

## 🧑‍💻 Autor

**Nicolás Pasino** — nico_pasino@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-nicolas--pasino-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolas-pasino/)
[![Portfolio](https://img.shields.io/badge/Portfolio-nicopasino.space-4B32C3?style=flat&logo=internet-explorer&logoColor=white)](https://nicopasino.space)

