import { useCallback, useMemo, useState } from "react";

// crypto.randomUUID sólo existe en contexto seguro (https/localhost). Si se abre
// la app desde otra máquina por IP de LAN, hay que caer a un id manual.
function nuevoKeyId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function precioDe(producto) {
  const precio = Number(producto?.precio);
  return Number.isNaN(precio) ? 0 : precio;
}

function cantidadDe(item) {
  const cantidad = Number(item?.cantidad);
  return Number.isNaN(cantidad) ? 0 : cantidad;
}

function stockDe(producto) {
  const stock = Number(producto?.cantidad);
  return Number.isNaN(stock) ? 0 : stock;
}

// El carrito guarda sólo { keyId, producto, cantidad }. El subtotal y el total
// se derivan siempre del precio y la cantidad, así nunca quedan desactualizados.
export function useCarritoVenta() {
  const [items, setItems] = useState([]);

  const agregar = useCallback((producto, cant = 1) => {
    if (!producto) return;
    const cantidad = Math.max(1, parseInt(cant, 10) || 1);

    setItems((prev) => {
      const existente = prev.find((item) => item.producto?.idPublica === producto.idPublica);
      if (existente) {
        return prev.map((item) => (
          item.producto?.idPublica === producto.idPublica
            ? { ...item, cantidad: cantidadDe(item) + cantidad }
            : item
        ));
      }
      return [...prev, { keyId: nuevoKeyId(), producto, cantidad }];
    });
  }, []);

  const sumar = useCallback((keyId) => {
    setItems((prev) => prev.map((item) => (
      item.keyId === keyId ? { ...item, cantidad: cantidadDe(item) + 1 } : item
    )));
  }, []);

  const restar = useCallback((keyId) => {
    setItems((prev) => prev.map((item) => {
      if (item.keyId !== keyId || cantidadDe(item) <= 1) return item;
      return { ...item, cantidad: cantidadDe(item) - 1 };
    }));
  }, []);

  const quitar = useCallback((keyId) => {
    setItems((prev) => prev.filter((item) => item.keyId !== keyId));
  }, []);

  const limpiar = useCallback(() => setItems([]), []);

  const cantidadEnCarrito = useCallback((idPublica) => (
    items
      .filter((item) => item.producto?.idPublica === idPublica)
      .reduce((acc, item) => acc + cantidadDe(item), 0)
  ), [items]);

  const disponible = useCallback((producto) => (
    stockDe(producto) - cantidadEnCarrito(producto?.idPublica)
  ), [cantidadEnCarrito]);

  const subtotalDe = useCallback((item) => (
    precioDe(item?.producto) * cantidadDe(item)
  ), []);

  const total = useMemo(() => (
    items.reduce((acc, item) => acc + subtotalDe(item), 0)
  ), [items, subtotalDe]);

  const unidades = useMemo(() => (
    items.reduce((acc, item) => acc + cantidadDe(item), 0)
  ), [items]);

  const lineasSinStock = useMemo(() => {
    const pedidoPorProducto = new Map();
    for (const item of items) {
      const id = item.producto?.idPublica;
      pedidoPorProducto.set(id, (pedidoPorProducto.get(id) ?? 0) + cantidadDe(item));
    }

    return [...pedidoPorProducto.entries()]
      .map(([id, pedido]) => {
        const producto = items.find((item) => item.producto?.idPublica === id)?.producto;
        return { producto, pedido, disponible: stockDe(producto) - pedido };
      })
      .filter((linea) => linea.disponible < 0);
  }, [items]);

  return useMemo(() => ({
    items,
    agregar,
    sumar,
    restar,
    quitar,
    limpiar,
    subtotalDe,
    total,
    unidades,
    cantidadProductos: items.length,
    cantidadEnCarrito,
    disponible,
    lineasSinStock,
  }), [
    items,
    agregar,
    sumar,
    restar,
    quitar,
    limpiar,
    subtotalDe,
    total,
    unidades,
    cantidadEnCarrito,
    disponible,
    lineasSinStock,
  ]);
}
