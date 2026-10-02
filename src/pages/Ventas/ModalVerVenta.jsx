import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/botones';
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { MoneyDisplay, GrayDisplay } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';
import '../../components/pages/modals.css';

export function ModalVerVenta({ venta, onClose }) {
  if (!venta) return null;

  const { numero, cliente, detalle, fechaVenta, productos } = venta;
  const { fechaLarga, hora, tiempoTranscurrido } = getDate(fechaVenta);
  const listaProductos = Array.isArray(productos) ? productos : [];
  const total = listaProductos.reduce((acc, p) => acc + (p.subTotal || 0), 0);

  return (
    <Modal
      title={`Venta N° ${numero ?? "-"}`}
      onClose={onClose}
      footer={<Button variant="danger" onClick={onClose}>Cerrar</Button>}
    >
      <div className="modalDatos">
        <div className="modalDato">
          <span className="modalLabel">Cliente</span>
          <span className="modalValor">{cliente.nombre}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Email</span>
          <span className="modalValor">{GrayDisplay(cliente.correo || "(Sin correo)")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Fecha</span>
          <span className="modalValor">{fechaLarga} - {hora} {GrayDisplay(`(hace ${tiempoTranscurrido})`)}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Detalle</span>
          <span className="modalValor">{detalle || GrayDisplay("(Sin detalle)")}</span>
        </div>
      </div>

      <TablaGenerica
        itemsManage={{ loading: false, error: null }}
        headers={["Producto", "Cantidad", "Precio", "Subtotal"]}
      >
        {listaProductos.length === 0 ? (
          <tr><td colSpan={4} className="sinItems">No hay productos cargados</td></tr>
        ) : (
          listaProductos.map((p, i) => (
            <tr key={i}>
              <td className="tablaColNombre">{p.producto}</td>
              <td className="tablaColCantidad">{p.cantidad}</td>
              <td className="tablaColPrecio">{MoneyDisplay(p.precioUnitario ?? p.subTotal / p.cantidad)}</td>
              <td className="tablaColPrecio">{MoneyDisplay(p.subTotal)}</td>
            </tr>
          ))
        )}
      </TablaGenerica>

      <div className="modalTotal flexSeparados">
        <span>Total</span>
        <span>{MoneyDisplay(total)}</span>
      </div>
    </Modal>
  );
}