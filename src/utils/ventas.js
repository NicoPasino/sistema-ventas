import { aNumero } from "./stock";

function productosDe(venta) {
  return Array.isArray(venta?.productos) ? venta.productos : [];
}

// Number() porque MySQL puede devolver DECIMAL como string y "0" + "abc" concatenaría.
// Devuelve null (no 0) cuando el campo no existe, para poder distinguir "0 real" de "ausente".
function numeroVenta(valor) {
  return aNumero(valor, null);
}

// La API no siempre manda subTotal en el detalle de venta: si no llega, se calcula
// desde el precio unitario. Por eso no alcanza con usar subTotal y ya.
function totalLinea(linea) {
  const subTotal = numeroVenta(linea?.subTotal);
  if (subTotal !== null) return subTotal;

  const precio = numeroVenta(linea?.precioUnitario ?? linea?.precio);
  const cantidad = numeroVenta(linea?.cantidad);
  if (precio !== null && cantidad !== null) return precio * cantidad;

  return 0;
}

export function totalVenta(venta) {
  return productosDe(venta).reduce((acc, linea) => acc + totalLinea(linea), 0);
}

export function unidadesVenta(venta) {
  return productosDe(venta).reduce((acc, linea) => acc + (numeroVenta(linea?.cantidad) ?? 0), 0);
}
