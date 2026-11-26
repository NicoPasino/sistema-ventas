import { useContext } from 'react';
import { ClientesContext } from '../../context/dataContext';
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/botones';
import { AccionesContacto, BotonImprimir } from '../../components/shared/accionesModal';
import { imprimirComprobanteVenta } from './imprimirComprobanteVenta.jsx';
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { CorreoDisplay, GrayDisplay, MoneyDisplay, formatearMoneda, formatearNumero } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';
import { claveCliente } from '../../utils/estadisticasCliente';
import { totalVenta } from '../../utils/ventas';
import '../../components/pages/modals.css';

function clienteDeLaVenta(clienteVenta, clientes) {
  const clave = claveCliente(clienteVenta);
  const encontrado = clave ? (clientes ?? []).find((c) => claveCliente(c) === clave) : null;
  return { ...(clienteVenta ?? {}), ...(encontrado ?? {}) };
}

export function ModalVerVenta({ venta, onClose }) {
  const { items: clientes } = useContext(ClientesContext);

  if (!venta) return null;

  const { numero, detalle, fechaVenta, productos } = venta;
  const cliente = clienteDeLaVenta(venta.cliente, clientes);
  const { fechaLarga, hora, tiempoTranscurrido } = getDate(fechaVenta);
  const listaProductos = Array.isArray(productos) ? productos : [];
  const total = totalVenta(venta);

  return (
    <Modal
      title={`Venta N° ${numero ?? "-"}`}
      onClose={onClose}
      className="modalVenta"
      headerAcciones={
        <>
          <AccionesContacto correo={cliente.correo} telefono={cliente.telefono} />
          <BotonImprimir onClick={() => imprimirComprobanteVenta({ venta, cliente })} />
        </>
      }
      footer={<Button variant="danger" onClick={onClose}>Cerrar</Button>}
    >
      <h3 className="modalSeccion">Información de la Venta</h3>
      <div className="modalVentaDatos">
        <div className="modalDato">
          <span className="modalLabel">Cliente</span>
          <span className="modalValor">{cliente.nombre || GrayDisplay("(Sin cliente)")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Correo</span>
          <span className="modalValor">{CorreoDisplay(cliente.correo)}</span>
        </div>
      </div>

      {/* <h3 className="modalSeccion">Detalle</h3> */}
      <div className="modalVentaDatos">
        <div className="modalDato modalVentaDatoAncho">
          <span className="modalLabel">Detalle</span>
          <span className="modalValor">{GrayDisplay(detalle || "(Sin detalle)")}</span>
        </div>
      </div>

      {/* <h3 className="modalSeccion">Fecha</h3> */}
      <div className="modalVentaDatos">
        <div className="modalDato modalVentaDatoAncho">
          <span className="modalLabel">Fecha</span>
          <span className="modalValor">
            {fechaLarga} - {hora} {tiempoTranscurrido && GrayDisplay(`(hace ${tiempoTranscurrido})`)}
          </span>
        </div>
      </div>

      <h3 className="modalSeccion modalConteoTitulo">
        Productos
        <span className="modalConteo">{formatearNumero(listaProductos.length)} productos</span>
      </h3>
      <div className="modalVentaTabla">
        <TablaGenerica
          itemsManage={{ loading: false, error: null }}
          headers={["Producto", "Precio", "Cantidad", "Subtotal"]}
        >
          {listaProductos.length === 0 ? (
            <tr><td colSpan={4} className="sinItems">No hay productos cargados</td></tr>
          ) : (
            listaProductos.map((p, i) => (
              <tr key={i}>
                <td className="tablaColProducto">{p.producto}</td>
                <td className="tablaCol">{MoneyDisplay(p.precioUnitario ?? p.subTotal / p.cantidad)}</td>
                <td className="tablaColID">{p.cantidad}</td>
                <td className="tablaCol">{MoneyDisplay(p.subTotal)}</td>
              </tr>
            ))
          )}
        </TablaGenerica>
      </div>

      <div className="modalVentaPie">
        <div className="modalVentaTotal">
          <span>Total</span>
          <strong>{formatearMoneda(total, { compacto: true })}</strong>
        </div>
      </div>
    </Modal>
  );
}
