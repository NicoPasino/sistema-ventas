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
      <div className="modalVentaDatos">
        <div className="modalVentaDato">
          <span className="modalVentaLabel">Cliente</span>
          <span className="modalVentaValor">{cliente.nombre}</span>
        </div>
        <div className="modalVentaDato">
          <span className="modalVentaLabel">Email</span>
          <span className="modalVentaValor">{GrayDisplay(cliente.correo || "(Sin correo)")}</span>
        </div>
        <div className="modalVentaDato">
          <span className="modalVentaLabel">Fecha</span>
          <span className="modalVentaValor">{fechaLarga} - {hora} {GrayDisplay(`(hace ${tiempoTranscurrido})`)}</span>
        </div>
        <div className="modalVentaDato">
          <span className="modalVentaLabel">Detalle</span>
          <span className="modalVentaValor">{detalle || GrayDisplay("(Sin detalle)")}</span>
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

      <div className="modalVentaTotal flexSeparados">
        <span>Total</span>
        <span>{MoneyDisplay(total)}</span>
      </div>
    </Modal>
  );
}