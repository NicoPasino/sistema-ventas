export function MoneyDisplay(amount) {
  // 1. Formatear el número a moneda local
  const formatted = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(amount);

  // 2. Separamos la parte entera de los decimales
  const parts = formatted.split(',');

  return (
    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
      {parts[0]}
      <span style={{ fontSize: '0.6em', verticalAlign: 'super', marginLeft: '2px' }}>
        ,{parts[1]}
      </span>
    </span>
  );
};

export function StockDisplay(cant) {
  return <span className={(cant>15) ? "" : "colorRojoClaro"}>{cant}</span>
}

export function GrayDisplay(txt) {
  return <span className="colorGrisClaro">{txt}</span>
}