import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/botones';
import { EstadoDisplay, GrayDisplay, MoneyDisplay, StockDisplay } from '../../utils/displayConvert';
import { stockEstado, nivelStockCSS } from '../../utils/stock';
import { getDate } from '../../utils/getDate';
import '../../components/pages/modals.css';

export function ModalVerProducto({ producto, onClose, onEditar }) {
  if (!producto) return null;

  const { idPublica, nombre, descripcion, categoria, proveedor, cantidad, precio, activo, stockMinimo, stockMaximo, fechaCreacion, fechaModificacion } = producto;
  const { min, max, nivel } = stockEstado(producto);
  const creado = getDate(fechaCreacion);
  const modificado = getDate(fechaModificacion);

  return (
    <Modal
      title={nombre || `Producto ${idPublica ?? "-"}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="danger" onClick={onClose}>Cerrar</Button>
          <Button variant="primary" onClick={onEditar}>Editar</Button>
        </>
      }
    >
      <div className="modalDatos">
        <div className="modalDato">
          <span className="modalLabel">Código</span>
          <span className="modalValor">{GrayDisplay(idPublica)}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Categoría</span>
          <span className="modalValor">{categoria || GrayDisplay("(Sin categoría)")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Descripción</span>
          <span className="modalValor">{descripcion || GrayDisplay("(Sin descripción)")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Proveedor</span>
          <span className="modalValor">{proveedor || GrayDisplay("(Sin proveedor)")}</span>
        </div>
      </div>

      <h3 className="modalSeccion">Inventario</h3>
      <div className="modalDatos">
        <div className="modalDato">
          <span className="modalLabel">Precio</span>
          <span className="modalValor">{MoneyDisplay(precio)}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Stock</span>
          <span className="modalValor modalStock">
            {StockDisplay(cantidad, stockMinimo, stockMaximo)}
          </span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Rango</span>
          <span className="modalValor">
            Mín. {min} · Máx. {max} {GrayDisplay("·")} <span className={nivelStockCSS(nivel)}>{nivel}</span>
          </span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Estado</span>
          <span className="modalValor">{EstadoDisplay(activo)}</span>
        </div>
      </div>

      <h3 className="modalSeccion">Auditoría</h3>
      <div className="modalDatos">
        <div className="modalDato">
          <span className="modalLabel">Creado</span>
          <span className="modalValor">
            {creado.fechaConHora} {GrayDisplay(`(hace ${creado.tiempoTranscurrido})`)}
          </span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Modificado</span>
          <span className="modalValor">
            {modificado.fechaConHora} {GrayDisplay(`(hace ${modificado.tiempoTranscurrido})`)}
          </span>
        </div>
      </div>
    </Modal>
  );
}
