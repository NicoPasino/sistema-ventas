import { getRangoStock, estadoStock, nivelStockCSS } from "./stock";

const FORMATO_MONEDA = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
});

const FORMATO_MONEDA_COMPACTA = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function opcionesMoneda(compacto) {
  return compacto ? FORMATO_MONEDA_COMPACTA : FORMATO_MONEDA;
}

export function formatearMoneda(amount, { compacto = false } = {}) {
  const valor = Number(amount) || 0;
  return opcionesMoneda(compacto).format(valor);
}

function claseParteMoneda(tipo) {
  if (tipo === 'currency' || tipo === 'literal') return 'moneySimbolo';
  if (tipo === 'fraction') return 'moneyDecimal';
  if (tipo === 'compact') return 'moneyCompacto';
  return 'moneyNumero';
}

export function formatearNumero(valor) {
  return new Intl.NumberFormat('es-AR').format(Number(valor) || 0);
}

// Devuelve la variación lista para pintar: dirección para el color y texto corto.
// null cuando no hay base de comparación.
export function tendencia(pct) {
  if (pct === null || pct === undefined || !Number.isFinite(pct)) return null;

  const direccion = pct > 0 ? 'sube' : pct < 0 ? 'baja' : 'neutra';
  const flecha = pct > 0 ? '↑' : pct < 0 ? '↓' : '→';
  const valor = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(Math.abs(pct));

  return { direccion, texto: `${flecha} ${valor}%` };
}

// Acepta el valor posicional (MoneyDisplay(100)) y también por prop
// (MoneyDisplay amount={100}). Sin esto, el segundo caso pasaba el objeto de
// props entero a Number() -> NaN -> $ 0.
export function MoneyDisplay(valor, opciones = {}) {
  const esObjeto = valor && typeof valor === 'object';
  const amount = esObjeto && 'amount' in valor ? valor.amount : valor;
  const compacto = esObjeto && 'compacto' in valor ? valor.compacto : opciones.compacto;
  const numero = Number(amount) || 0;
  const partes = opcionesMoneda(Boolean(compacto)).formatToParts(numero);

  return (
    <span className="moneyDisplay">
      {partes.map((parte, i) => (
        <span key={`${parte.type}-${i}`} className={claseParteMoneda(parte.type)}>
          {parte.value}
        </span>
      ))}
    </span>
  );
}

export function StockDisplay(cant, stockMinimo, stockMaximo) {
  const { min, max } = getRangoStock(stockMinimo, stockMaximo);
  const { pct, nivel } = estadoStock(cant, min, max);
  const color = nivelStockCSS(nivel);
  const ancho = pct > 0 ? Math.max(2, Math.round(pct * 100)) : 0; // porción mínima visual

  return (
    <div className="stockCelda" title={`Stock: ${cant} (mín. ${min} · máx. ${max})`}>
      <div className="stockNumero">
        <span className={color}>{cant}</span>
        <span className="stockMaximo">/{max}</span>
      </div>
      <div className="stockBarra">
        <div className={`stockBarraFill ${color}`} style={{ width: `${ancho}%` }} />
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