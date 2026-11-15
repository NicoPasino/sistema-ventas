export const STOCK_MIN_DEFECTO = 20;
export const STOCK_MAX_DEFECTO = 150;

const COLOR_POR_NIVEL = {
  bajo: "colorRojoClaro",
  medio: "colorAmarilloClaro",
  alto: "colorVerdeClaro",
  exceso: "colorCianClaro",
};

export function aNumero(valor, porDefecto) {
  if (valor === null || valor === undefined || valor === "") return porDefecto;
  const n = Number(valor);
  return Number.isNaN(n) ? porDefecto : n;
}

export function getRangoStock(stockMinimo, stockMaximo) {
  return {
    min: aNumero(stockMinimo, STOCK_MIN_DEFECTO),
    max: aNumero(stockMaximo, STOCK_MAX_DEFECTO),
  };
}

export function nivelStockCSS(nivel) {
  return COLOR_POR_NIVEL[nivel] ?? "";
}

export function estadoStock(cantidad, min, max) {
  const cant = aNumero(cantidad, 0);
  const rango = max - min;

  // La barra mide el stock actual sobre el máximo (0 → max).
  const pct = max > 0 ? Math.min(Math.max(cant / max, 0), 1) : (cant > 0 ? 1 : 0);

  if (rango <= 0) {
    const nivel = cant >= max ? "exceso" : "bajo";
    return { pct, nivel };
  }

  if (cant < min) return { pct, nivel: "bajo" };
  if (cant >= max) return { pct: 1, nivel: "exceso" };

  const pctRango = (cant - min) / rango;
  return { pct, nivel: pctRango < 0.5 ? "medio" : "alto" };
}

export function stockEstado(producto) {
  const { min, max } = getRangoStock(producto?.stockMinimo, producto?.stockMaximo);
  return { min, max, ...estadoStock(producto?.cantidad, min, max) };
}
