import { getRangoStock, estadoStock, nivelStockCSS } from "./stock";

export function formatearMoneda(amount, { compacto = false } = {}) {
  const valor = Number(amount) || 0;

  if (compacto) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(valor);
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(valor);
}

// Acepta el valor posicional (MoneyDisplay(100)) y también por prop
// (MoneyDisplay amount={100}). Sin esto, el segundo caso pasaba el objeto de
// props entero a Number() -> NaN -> $ 0.
export function MoneyDisplay(valor) {
  // 1. Formatear el número a moneda local
  const amount = valor && typeof valor === "object" && "amount" in valor ? valor.amount : valor;
  const formatted = formatearMoneda(amount);

  // 2. Separamos la parte entera de los decimales
  const parts = formatted.split(',');

  return (
    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
      {parts[0]}
      <span style={{ fontSize: '0.6em', verticalAlign: 'super', marginLeft: '2px' }}>
        {parts[1]}
      </span>
    </span>
  );
};

export function StockDisplay(cant, stockMinimo, stockMaximo) {
  const { min, max } = getRangoStock(stockMinimo, stockMaximo);
  const { pct, nivel } = estadoStock(cant, min, max);
  const color = nivelStockCSS(nivel);

  return (
    <div className="stockCelda" title={`Stock: ${cant} (mín. ${min} · máx. ${max})`}>
      <div className="stockNumero">
        <span className={color}>{cant}</span>
        <span className="stockMaximo">/{max}</span>
      </div>
      <div className="stockBarra">
        <div className={`stockBarraFill ${color}`} style={{ width: `${Math.round(pct * 100)}%` }} />
      </div>
    </div>
  );
}

export function esActivo(activo) {
  return activo === true || String(activo).trim().toLowerCase() === "true";
}

export function EstadoDisplay(activo) {
  const activoBool = esActivo(activo);
  return (
    <span className={`estadoBadge ${activoBool ? "estadoBadgeActivo" : "estadoBadgeInactivo"}`}>
      {activoBool ? "Activo" : "Inactivo"}
    </span>
  );
}

export function GrayDisplay(children = "-", claro = true) {
  return <span className={claro ? "colorGrisClaro" : "colorGris"}>{children}</span>
}

export function WhiteDisplay(children = "-") {
  return <span className="colorBlancoClaro">{children}</span>
}

export function CorreoDisplay(correo) {
  if (!correo) return GrayDisplay("-");
  const [nombre, dominio] = correo.split("@");
  if (!nombre || !dominio) return GrayDisplay(correo);

  return <a href={`mailto:${correo}`}>
    {GrayDisplay(nombre)}
    {GrayDisplay("@", false)}
    {GrayDisplay(dominio)}
  </a>
}