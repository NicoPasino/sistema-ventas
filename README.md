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
    ├── components/                 # Componentes reutilizables
    |
    ├── pages/                      # Páginas principales
    │   ├── Inicio/
    │   ├── Productos/
    │   ├── Clientes/
    │   └── Ventas/
    |
    ├── layouts/
    │   └── MainLayout.jsx          # Layout principal
    |
    ├── context/
    │   └── dataContext.jsx         # Estado global: productos, clientes, ventas
    │
    ├── Hooks/
    │   └── useItems.js             # Hook reusable de datos (CRUD + búsqueda)
    │
    ├── services/
    │   └── api.js                  # Conexion con el servidor (API Layer)
    │
    ├── App.jsx                     # Componente principal (Header, Nav, Tab)
    └── main.jsx                    # Punto de entrada de la app

```

---

## 🧱 Arquitectura

- **API:** todas las llamadas pasan por `src/services/api.js`, que expone la función `buildCollection(name)` para las operaciones CRUD: `obtenerTodos`, `buscarPorCampo`, `obtenerPorId`, `agregar`, `eliminar`, `actualizar`.
- **Estado global:** `DataProvider` (en `dataContext.jsx`) expone `{ productos, clientes, ventas }` con useMemo, cada uno con el resultado del hook `useItems`.

- **UI:** componentes reutilizables en `components/` separadas segun el area.
- **Filtros y busquedas** en "Productos" y "Clientes" se realizan mediante un input que filtra los items de forma local.
- **Fechas** se guardan en formato UTC y se muestran en formato local, esto se realiza en el hook `useItems`.

---

## 🗺️ Roadmap

- Gestión de cuentas y autenticación.
- Dashboard con gráficos interactivos.
- Base de datos local (offline).

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

<!-- 
### Scripts

- `pnpm dev`    → Inicia el servidor de desarrollo.
- `pnpm build`  → Genera el build de producción.
- `pnpm preview`→ Previsualiza el build de producción.
- `pnpm lint`   → Ejecuta ESLint.
-->