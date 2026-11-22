import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/botones';
import { EstadoDisplay, GrayDisplay, StockDisplay, formatearMoneda } from '../../utils/displayConvert';
import { stockEstado, nivelStockCSS } from '../../utils/stock';
import { aTimestamp, getDate } from '../../utils/getDate';
import '../../components/pages/modals.css';

export function ModalVerProducto({ producto, onClose, onEditar }) {
  if (!producto) return null;

  const { idPublica, nombre, descripcion, categoria, proveedor, cantidad, precio, activo, stockMinimo, stockMaximo, fechaCreacion, fechaModificacion } = producto;
  const { nivel } = stockEstado(producto);
  const creado = getDate(fechaCreacion);
  const modificado = getDate(fechaModificacion);

  const tsCreacion = aTimestamp(fechaCreacion);
  const tsModificacion = aTimestamp(fechaModificacion);
  const sinModificaciones = tsCreacion > 0 && tsModificacion > 0 && tsCreacion === tsModificacion;

  const partesAuditoria = [];
  if (tsCreacion > 0) partesAuditoria.push(`Creado hace ${creado.tiempoTranscurrido}`);
  if (tsModificacion > 0 && !sinModificaciones) partesAuditoria.push(`Modificado hace ${modificado.tiempoTranscurrido}`);

  const auditoria = sinModificaciones
    ? `Sin modificaciones desde su creación${creado.tiempoTranscurrido ? ` (hace ${creado.tiempoTranscurrido})` : ""}`
    : partesAuditoria.join(" · ");

  return (
    <Modal
      title={nombre || `Producto ${idPublica ?? "-"}`}
      onClose={onClose}
      className="modalProducto"
      headerAcciones={
        <>
          <span className="modalProductoCodigo">{GrayDisplay(`#${idPublica ?? "-"}`)}</span>
          {EstadoDisplay(activo)}
        </>
      }
      footer={
        <>
          <Button variant="danger" onClick={onClose}>Cerrar</Button>
          <Button variant="primary" onClick={onEditar}>Editar</Button>
        </>
      }
    >
      <h3 className="modalSeccion">Detalle</h3>
      <div className="modalProductoDatos">
        <div className="modalDato">
          <span className="modalLabel">Categoría</span>
          <span className="modalValor">{categoria || GrayDisplay("(Sin categoría)")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Proveedor</span>
          <span className="modalValor">{proveedor || GrayDisplay("(Sin proveedor)")}</span>
        </div>
        <div className="modalDato modalProductoDatoAncho">
          <span className="modalLabel">Descripción</span>
          <span className="modalValor">{GrayDisplay(descripcion || "(Sin descripción)")}</span>
        </div>
      </div>

      <h3 className="modalSeccion">Inventario</h3>
      <div className="modalProductoDatos">
        <div className="modalDato">
          <span className="modalLabel">Precio</span>
          <span className="modalValor modalProductoPrecio">{formatearMoneda(precio, { compacto: true })}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Stock</span>
          <div className="modalValor modalStock modalProductoStock">
            {StockDisplay(cantidad, stockMinimo, stockMaximo)}
            <span className={`modalProductoNivel ${nivelStockCSS(nivel)}`}>{nivel}</span>
          </div>
        </div>
      </div>

      {auditoria && <p className="modalProductoAuditoria">{auditoria}</p>}
    </Modal>
  );
}
