import { aTimestamp } from "./getDate";

function esDelCliente(venta, cliente) {
  const documentoVenta = venta?.cliente?.documento;
  if (documentoVenta !== undefined && documentoVenta !== null) {
    return String(documentoVenta) === String(cliente?.documento);
  }

  // Fallback: si el backend no embebe el documento en la venta, se matchea por nombre.
  return String(venta?.cliente?.nombre ?? "").trim() === String(cliente?.nombre ?? "").trim();
}

function totalVenta(venta) {
  const productos = Array.isArray(venta?.productos) ? venta.productos : [];
  return productos.reduce((acc, p) => acc + (p.subTotal || 0), 0);
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
