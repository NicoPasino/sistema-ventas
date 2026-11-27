# 📝 Changelog — Sistema de Ventas

## 🚀 v1.1.0 — 2026-11-26

Nueva versión centrada en el rediseño de la interfaz, un dashboard con más métricas, mejoras en el registro de ventas y correcciones de experiencia de uso.

### ✨ Novedades

- **Dashboard renovado**: hero de bienvenida, KPIs con ticket promedio y comparación entre períodos, gráfico de barras de ventas con rango 7/30/90 días y estados de carga y sin datos.
- **Rankings con toggle**: "Top productos" y "Top clientes" alternan entre facturación y cantidad; el resumen de stock excluye los productos inactivos.
- **Ordenamiento interactivo en tablas**: clic en los encabezados para ordenar, con el estado compartido con el toolbar y mensaje "Sin resultados para estos filtros".
- **Nueva Venta rediseñada**: layout en tres bloques, carrito centralizado en `useCarritoVenta` (duplicados, subtotales y validaciones), modal selector de productos con búsqueda y paginación, datos del cliente con acceso a su detalle, atajo "Nuevo cliente" y envío del `Detalle` en el POST.
- **Comprobante imprimible**: botón "Imprimir" en el detalle de la venta; genera el comprobante desde los datos y lo imprime con estilos propios sin afectar la vista.
- **Buscador reutilizable**: `BuscadorSugerencias` busca por nombre o DNI, muestra hasta 10 resultados con "ver todos / ver menos", incluye botón de limpiar y abre la lista recién al escribir.

### ♻️ Cambios y mejoras

- Modales más compactos: ver cliente (contactos en el header y "ver más" +10), ver producto (código y estado en el header, auditoría en una línea) y ver venta (secciones ordenadas, total y acciones de contacto compartidas).
- Listados compactos y responsive: columnas reducidas, descripción debajo del nombre, sin columnas "Detalles" ni "Teléfono", detalle abriendo el nombre y botones de acción accesibles con tooltip.
- El listado de ventas muestra hasta 4 productos por fila (o 3 y "+x más" con tooltip).
- Toolbar de búsqueda simplificado: el orden vive solo en los encabezados, "Nuevo" junto a "Limpiar filtros" y una "x" para limpiar solo la búsqueda.
- Ajustes visuales: fondos en las tarjetas del dashboard, medidas responsive en tablas y divs, barra de stock con el mínimo en rojo y escala hasta el stock máximo, y reset del scroll al cambiar de página o pestaña.

### 🐛 Correcciones

- Los errores de la API muestran el mensaje real del cuerpo de la respuesta (issue #27).
- El modal ya no se cierra al soltar el mouse sobre el contenido después de arrastrar desde el overlay (issue #22).
- El buscador evita resuscripciones y la captura global de teclas (issue #21).
- Correcciones de márgenes y altura en Nueva Venta y en las tarjetas del dashboard.

---

## v1.0.0 — 2026-11-10

Primera versión estable del frontend del **Sistema de Ventas**: una interfaz completa para administrar productos, clientes y ventas, con dashboard de métricas, búsqueda, filtros, ordenamiento y paginación, consumiendo una **API REST** de **.NET/MySQL**.

### ✨ Incluye

#### Dashboard
- Métricas de productos, ventas, clientes, categorías y unidades vendidas.
- Facturación total, ventas de los últimos 30 días y valor del stock.
- Top 5 de clientes por facturación, productos más vendidos y productos con bajo stock.

#### Productos
- CRUD completo con alta, edición, detalle y eliminación.
- Activación/desactivación lógica; por defecto se listan solo los activos.
- Búsqueda, filtro por estado y categoría, ordenamiento por columna y paginación configurable.
- Validaciones y control de stock mínimo/máximo.

#### Clientes
- CRUD completo con alta, edición, detalle y eliminación.
- Búsqueda, ordenamiento y paginación.
- Detalle con estadísticas de compras, última compra y accesos de contacto.

#### Ventas
- Historial con búsqueda, ordenamiento, paginación y detalle.
- Registro de ventas con carrito: cliente, productos, cantidades, subtotales y total.
- Validación de stock en tiempo real, incluyendo lo ya agregado al carrito.
- Actualización de stock al confirmar la venta.

#### Experiencia de uso
- Notificaciones y alertas para éxito, error y advertencia.
- Estados de carga, listas vacías y mensajes de error en todas las vistas.
- Sidebar colapsable y diseño responsive.
- Persistencia de pestaña activa, usuario y filas por página en `localStorage`.
- Versión de la app visible al pie del sidebar y del Inicio.

### 🔗 Enlaces

- **Demo Web:** [sistema-ventas.nicopasino.space](https://sistema-ventas.nicopasino.space/)
- **Repositorio:** [github.com/NicoPasino/sistema-ventas](https://github.com/NicoPasino/sistema-ventas)

---

**Gracias por usar 'Sistema de Ventas'.** Si encontrás algún problema, reportalo en [el repositorio](https://github.com/NicoPasino/sistema-ventas/issues).
