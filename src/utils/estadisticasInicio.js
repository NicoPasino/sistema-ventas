import { aTimestamp } from "./getDate";
import { aNumero, stockEstado } from "./stock";
import { esActivo } from "./displayConvert";
import { productosDeVenta, totalLineaVenta, totalVenta, unidadesVenta } from "./ventas";

const DIAS_7 = 7;
const DIAS_30 = 30;
const MS_DIA = 86400000;

function inicioDia(date) {
  const copia = new Date(date);
  copia.setHours(0, 0, 0, 0);
  return copia.getTime();
}

function ventana(dias, ahora) {
  const hoy = inicioDia(ahora);
  return { desde: hoy - (dias - 1) * MS_DIA, hasta: hoy + MS_DIA };
}

function vacio() {
  return { ventas: 0, facturacion: 0 };
}

function sumarVenta(acumulado, venta, total) {
  acumulado.ventas += 1;
  acumulado.facturacion += total;
  return acumulado;
}

function sumarVentanas(ventas, ahora) {
  const hoy = ventana(1, ahora);
  const ultimos7 = ventana(DIAS_7, ahora);
  const ultimos30 = ventana(DIAS_30, ahora);

  const resumen = { hoy: vacio(), ultimos7: vacio(), ultimos30: vacio() };

  for (const venta of ventas) {
    const total = totalVenta(venta);
    const ts = aTimestamp(venta.fechaVenta);
    if (!ts) continue;

    if (ts >= hoy.desde && ts < hoy.hasta) sumarVenta(resumen.hoy, venta, total);
    if (ts >= ultimos7.desde && ts < ultimos7.hasta) sumarVenta(resumen.ultimos7, venta, total);
    if (ts >= ultimos30.desde && ts < ultimos30.hasta) sumarVenta(resumen.ultimos30, venta, total);
  }

  return resumen;
}

function etiquetaDia(timestamp) {
  return new Date(timestamp).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
}

// Variación porcentual contra el período previo. null cuando no hay base
// (evita Infinity / NaN y permite decidir no mostrar la tendencia).
function variacion(actual, previo) {
  if (!previo) return null;
  return ((actual - previo) / previo) * 100;
}

export function getResumenVentas(ventas, ahora = new Date()) {
  const listaVentas = Array.isArray(ventas) ? ventas : [];

  const facturacion = listaVentas.reduce((acc, v) => acc + totalVenta(v), 0);
  const unidades = listaVentas.reduce((acc, v) => acc + unidadesVenta(v), 0);
  const cantidadVentas = listaVentas.length;

  const ultimaVenta = listaVentas.reduce(
    (ultima, v) => (aTimestamp(v.fechaVenta) > aTimestamp(ultima?.fechaVenta) ? v : ultima),
    undefined
  );

  return {
    cantidadVentas,
    facturacion,
    unidades,
    ticketPromedio: cantidadVentas ? facturacion / cantidadVentas : 0,
    ultimaVenta,
    ...sumarVentanas(listaVentas, ahora),
  };
}

// Últimas ventas ordenadas por fecha, ya normalizadas para el panel del dashboard.
export function getUltimasVentas(ventas, top = 5) {
  return (Array.isArray(ventas) ? ventas : [])
    .filter((venta) => aTimestamp(venta?.fechaVenta) > 0)
    .sort((a, b) => aTimestamp(b.fechaVenta) - aTimestamp(a.fechaVenta))
    .slice(0, top)
    .map((venta) => ({
      id: venta.idPublica ?? venta.numero ?? `${venta.fechaVenta}-${venta.cliente?.nombre ?? ""}`,
      numero: venta.numero,
      cliente: venta.cliente?.nombre || "(Sin cliente)",
      fechaVenta: venta.fechaVenta,
      total: totalVenta(venta),
    }));
}

// Serie diaria continua (incluye días sin ventas en 0) para graficar sin
// huecos. Se arma con setDate para no romper con cambios de horario.
export function getSerieDiariaVentas(ventas, dias = DIAS_30, ahora = new Date()) {
  const cantidad = Math.max(1, Math.floor(dias));
  const base = new Date(ahora);
  base.setHours(0, 0, 0, 0);

  const serie = [];
  const indice = new Map();

  for (let i = cantidad - 1; i >= 0; i--) {
    const fecha = new Date(base);
    fecha.setDate(fecha.getDate() - i);
    const timestamp = fecha.getTime();
    const fila = { timestamp, etiqueta: etiquetaDia(timestamp), ventas: 0, facturacion: 0 };
    serie.push(fila);
    indice.set(timestamp, fila);
  }

  for (const venta of Array.isArray(ventas) ? ventas : []) {
    const ts = aTimestamp(venta?.fechaVenta);
    if (!ts) continue;

    const fila = indice.get(inicioDia(ts));
    if (!fila) continue;

    fila.ventas += 1;
    fila.facturacion += totalVenta(venta);
  }

  return serie;
}

// Compara los últimos `dias` contra los `dias` inmediatamente anteriores.
export function getComparacionPeriodos(ventas, dias = DIAS_30, ahora = new Date()) {
  const cantidad = Math.max(1, Math.floor(dias));
  const hoy = inicioDia(ahora);
  const actualDesde = hoy - (cantidad - 1) * MS_DIA;
  const previoHasta = actualDesde;
  const previoDesde = previoHasta - cantidad * MS_DIA;

  const actual = vacio();
  const previo = vacio();

  for (const venta of Array.isArray(ventas) ? ventas : []) {
    const ts = aTimestamp(venta?.fechaVenta);
    if (!ts) continue;

    const total = totalVenta(venta);
    if (ts >= actualDesde && ts < hoy + MS_DIA) sumarVenta(actual, venta, total);
    else if (ts >= previoDesde && ts < previoHasta) sumarVenta(previo, venta, total);
  }

  const ticketActual = actual.ventas ? actual.facturacion / actual.ventas : 0;
  const ticketPrevio = previo.ventas ? previo.facturacion / previo.ventas : 0;

  return {
    dias: cantidad,
    actual,
    previo,
    facturacionPct: variacion(actual.facturacion, previo.facturacion),
    ventasPct: variacion(actual.ventas, previo.ventas),
    ticketPromedioPct: variacion(ticketActual, ticketPrevio),
  };
}

// Ranking de productos por facturación (por defecto) o por unidades.
export function getTopProductosVendidos(ventas, { orden = "facturacion", top = 5 } = {}) {
  const acumulado = new Map();

  for (const venta of Array.isArray(ventas) ? ventas : []) {
    for (const linea of productosDeVenta(venta)) {
      const nombre = linea?.producto;
      if (!nombre) continue;

      const fila = acumulado.get(nombre) ?? { nombre, cantidad: 0, facturacion: 0 };
      fila.cantidad += aNumero(linea?.cantidad, 0);
      fila.facturacion += totalLineaVenta(linea);
      acumulado.set(nombre, fila);
    }
  }

  const criterio = orden === "unidades" ? "cantidad" : "facturacion";

  return [...acumulado.values()]
    .sort((a, b) => b[criterio] - a[criterio])
    .slice(0, top);
}

// `activo` puede no venir en respuestas viejas: en ese caso se considera activo.
function productoActivo(producto) {
  const activo = producto?.activo;
  if (activo === undefined || activo === null) return true;
  return esActivo(activo);
}

export function getResumenStock(productos) {
  const listaCompleta = Array.isArray(productos) ? productos : [];
  const listaProductos = listaCompleta.filter(productoActivo);

  const conEstado = listaProductos.map((producto) => ({
    ...producto,
    ...stockEstado(producto),
    cantidad: aNumero(producto?.cantidad, 0),
  }));

  const bajoStock = conEstado
    .filter((p) => p.cantidad <= p.min)
    .sort((a, b) => a.cantidad - b.cantidad);

  const agotados = conEstado.filter((p) => p.cantidad <= 0);
  const exceso = conEstado.filter((p) => p.cantidad >= p.max);

  // min >= 0 siempre, asi que todo agotado ya esta en bajoStock: se cuenta la union
  // para no alertar dos veces por el mismo producto.
  const alertas = new Set([...agotados, ...bajoStock]).size;

  return {
    totalProductos: listaProductos.length,
    inactivos: listaCompleta.length - listaProductos.length,
    unidades: conEstado.reduce((acc, p) => acc + p.cantidad, 0),
    valor: conEstado.reduce((acc, p) => acc + p.cantidad * aNumero(p.precio, 0), 0),
    bajoStock,
    agotados,
    exceso,
    alertas,
  };
}
