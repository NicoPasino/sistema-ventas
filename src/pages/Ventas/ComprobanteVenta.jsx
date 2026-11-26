import { formatearMoneda, formatearNumero } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';
import { totalVenta } from '../../utils/ventas';

export function ComprobanteVenta({ venta, cliente }) {
  const { numero, detalle, fechaVenta, productos } = venta;
  const { fechaLarga, hora } = getDate(fechaVenta);
  const listaProductos = Array.isArray(productos) ? productos : [];
  const nombreCliente = cliente?.nombre;
  const correoCliente = cliente?.correo;

  return (
    <main className="comprobante">
      <header className="comprobanteEncabezado">
        <h1>Comprobante de venta</h1>
        <p>Venta N° {numero ?? "-"}</p>
        <p>{fechaLarga} - {hora}</p>
      </header>

      <section className="comprobanteSeccion">
        <h2>Cliente</h2>
        <dl className="comprobanteDatos">
          <div>
            <dt>Nombre</dt>
            <dd>{nombreCliente || "(Sin cliente)"}</dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd>{correoCliente || "(Sin correo)"}</dd>
          </div>
        </dl>
      </section>

      {detalle && (
        <section className="comprobanteSeccion">
          <h2>Detalle</h2>
          <p>{detalle}</p>
        </section>
      )}

      <section className="comprobanteSeccion">
        <h2>
          Productos
          <span className="comprobanteConteo">{formatearNumero(listaProductos.length)} productos</span>
        </h2>
        <table className="comprobanteTabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.length === 0 ? (
              <tr><td colSpan={4}>(Sin productos)</td></tr>
            ) : (
              listaProductos.map((producto, i) => {
                const precioUnitario = producto.precioUnitario
                  ?? (producto.cantidad ? producto.subTotal / producto.cantidad : 0);

                return (
                  <tr key={`${producto.producto ?? "producto"}-${i}`}>
                    <td>{producto.producto ?? "-"}</td>
                    <td className="comprobanteNumero">{formatearMoneda(precioUnitario)}</td>
                    <td className="comprobanteNumero">{formatearNumero(producto.cantidad)}</td>
                    <td className="comprobanteNumero">{formatearMoneda(producto.subTotal)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      <footer className="comprobantePie">
        <span>Total</span>
        <strong>{formatearMoneda(totalVenta(venta))}</strong>
      </footer>
    </main>
  );
}
