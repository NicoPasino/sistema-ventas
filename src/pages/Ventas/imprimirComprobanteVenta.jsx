import { imprimirContenido } from '../../utils/imprimir';
import { ComprobanteVenta } from './ComprobanteVenta.jsx';

const ESTILOS_COMPROBANTE = `
  .comprobante { max-width: 720px; margin: 0 auto; }
  .comprobanteEncabezado { border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 16px; }
  .comprobanteEncabezado h1 { margin: 0 0 6px; font-size: 18px; text-transform: uppercase; letter-spacing: 0.5px; }
  .comprobanteEncabezado p { margin: 2px 0; color: #444; }
  .comprobanteSeccion { margin-top: 16px; }
  .comprobanteSeccion h2 { margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #444; }
  .comprobanteDatos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 16px; margin: 0; }
  .comprobanteDatos div { display: flex; gap: 8px; }
  .comprobanteDatos dt { min-width: 56px; color: #555; }
  .comprobanteDatos dd { margin: 0; font-weight: 600; }
  .comprobanteConteo { padding: 1px 8px; border: 1px solid #bbb; border-radius: 999px; font-size: 10px; letter-spacing: 0; text-transform: none; }
  .comprobanteTabla { width: 100%; border-collapse: collapse; }
  .comprobanteTabla th, .comprobanteTabla td { border: 1px solid #bbb; padding: 5px 7px; }
  .comprobanteTabla th { background: #f2f2f2; font-size: 10px; text-transform: uppercase; }
  .comprobanteNumero { text-align: right; font-variant-numeric: tabular-nums; }
  .comprobantePie { display: flex; justify-content: flex-end; align-items: baseline; gap: 14px; margin-top: 14px; padding-top: 10px; border-top: 2px solid #222; }
  .comprobantePie strong { font-size: 16px; }
`;

export async function imprimirComprobanteVenta({ venta, cliente }) {
  if (!venta) return false;

  // react-dom/server se carga recién cuando se imprime: no pesa en el bundle inicial.
  const { renderToStaticMarkup } = await import('react-dom/server');

  return imprimirContenido({
    titulo: `Comprobante de venta N° ${venta.numero ?? "-"}`,
    contenido: renderToStaticMarkup(<ComprobanteVenta venta={venta} cliente={cliente} />),
    estilos: ESTILOS_COMPROBANTE,
  });
}
