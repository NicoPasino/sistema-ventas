import { aTimestamp } from "./getDate";
import { totalVenta } from "./ventas";

function nombreCliente(cliente) {
  return String(cliente?.nombre ?? "").trim();
}

function sinDocumento(cliente) {
  const documento = cliente?.documento;
  return documento === undefined || documento === null;
}

// Identidad del cliente: documento si existe, si no nombre normalizado.
// Devuelve null cuando no hay ninguno de los dos, para que nunca se empareje.
export function claveCliente(cliente) {
  if (!sinDocumento(cliente)) return `doc:${cliente.documento}`;
  const nombre = nombreCliente(cliente);
  return nombre === "" ? null : `nom:${nombre}`;
}

function esDelCliente(venta, cliente) {
  const claveVenta = claveCliente(venta?.cliente);
  const claveBusqueda = claveCliente(cliente);

  // Sin documento ni nombre no hay identidad, no se puede emparejar.
  if (claveVenta === null || claveBusqueda === null) return false;
  if (claveVenta === claveBusqueda) return true;

  // Fallback: si la venta no trae documento (backend que no lo embebe) se matchea por nombre.
  return sinDocumento(venta?.cliente) && claveVenta === `nom:${nombreCliente(cliente)}`;
}

export function getEstadisticasCliente(cliente, ventas) {
  const listaVentas = Array.isArray(ventas) ? ventas : [];
  const suyas = listaVentas.filter((v) => esDelCliente(v, cliente));

  const totalGastado = suyas.reduce((acc, v) => acc + totalVenta(v), 0);
  const ultimaVenta = suyas.reduce((ultima, v) => (aTimestamp(v.fechaVenta) > aTimestamp(ultima?.fechaVenta) ? v : ultima), undefined);

  return {
    ventas: suyas,
    totalVentas: suyas.length,
    totalGastado,
    ultimaVenta,
    ultimaFecha: ultimaVenta?.fechaVenta,
  };
}

// Ranking por facturación total en una sola pasada sobre las ventas (O(clientes + ventas)).
// Las ventas sin cliente identificable se descartan: no se pueden atribuir a nadie.
export function getRankingClientesFacturacion(clientes, ventas) {
  const listaVentas = Array.isArray(ventas) ? ventas : [];
  const listaClientes = Array.isArray(clientes) ? clientes : [];

  const clientesPorClave = new Map();
  for (const cliente of listaClientes) {
    const clave = claveCliente(cliente);
    if (clave !== null) clientesPorClave.set(clave, cliente);
  }

  // Alias por nombre para las ventas que llegan sin documento. No pisa las claves primarias.
  for (const cliente of listaClientes) {
    const nombre = nombreCliente(cliente);
    if (nombre === "") continue;
    const alias = `nom:${nombre}`;
    if (!clientesPorClave.has(alias)) clientesPorClave.set(alias, cliente);
  }

  const acumulado = new Map();
  for (const venta of listaVentas) {
    const clave = claveCliente(venta?.cliente);
    if (clave === null) continue;

    const actual = acumulado.get(clave) ?? { totalGastado: 0, totalVentas: 0, ultimaVenta: undefined };
    actual.totalGastado += totalVenta(venta);
    actual.totalVentas += 1;
    if (aTimestamp(venta.fechaVenta) > aTimestamp(actual.ultimaVenta?.fechaVenta)) actual.ultimaVenta = venta;
    acumulado.set(clave, actual);
  }

  return [...acumulado.entries()]
    .map(([clave, datos]) => ({
      clave,
      cliente: clientesPorClave.get(clave),
      nombre: clientesPorClave.get(clave)?.nombre ?? datos.ultimaVenta?.cliente?.nombre ?? "(sin nombre)",
      ...datos,
    }))
    .sort((a, b) => b.totalGastado - a.totalGastado);
}
