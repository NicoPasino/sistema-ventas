import { aTimestamp } from "./getDate";
import { aNumero, stockEstado } from "./stock";
import { totalVenta, unidadesVenta } from "./ventas";

const DIAS_7 = 7;
const DIAS_30 = 30;

function inicioDia(date) {
  const copia = new Date(date);
  copia.setHours(0, 0, 0, 0);
  return copia.getTime();
}

function ventana(dias, ahora) {
  const hoy = inicioDia(ahora);
  return { desde: hoy - (dias - 1) * 86400000, hasta: hoy + 86400000 };
}

function vacio() {
  return { ventas: 0, facturacion: 0 };
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

    if (ts >= hoy.desde && ts < hoy.hasta) resumen.hoy = sumarVenta(resumen.hoy, venta, total);
    if (ts >= ultimos7.desde && ts < ultimos7.hasta) resumen.ultimos7 = sumarVenta(resumen.ultimos7, venta, total);
    if (ts >= ultimos30.desde && ts < ultimos30.hasta) resumen.ultimos30 = sumarVenta(resumen.ultimos30, venta, total);
  }

  return resumen;
}

function sumarVenta(acumulado, venta, total) {
  acumulado.ventas += 1;
  acumulado.facturacion += total;
  return acumulado;
}

export function getResumenVentas(ventas, ahora = new Date()) {
  const listaVentas = Array.isArray(ventas) ? ventas : [];

  const facturacion = listaVentas.reduce((acc, v) => acc + totalVenta(v), 0);
  const unidades = listaVentas.reduce((acc, v) => acc + unidadesVenta(v), 0);

  const ultimaVenta = listaVentas.reduce(
    (ultima, v) => (aTimestamp(v.fechaVenta) > aTimestamp(ultima?.fechaVenta) ? v : ultima),
    undefined
  );

  return {
    cantidadVentas: listaVentas.length,
    facturacion,
    unidades,
    ultimaVenta,
    ...sumarVentanas(listaVentas, ahora),
  };
}

export function getResumenStock(productos) {
  const listaProductos = Array.isArray(productos) ? productos : [];

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
    unidades: conEstado.reduce((acc, p) => acc + p.cantidad, 0),
    valor: conEstado.reduce((acc, p) => acc + p.cantidad * aNumero(p.precio, 0), 0),
    bajoStock,
    agotados,
    exceso,
    alertas,
  };
}
