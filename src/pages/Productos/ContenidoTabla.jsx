import { EstadoDisplay, esActivo, GrayDisplay, MoneyDisplay, StockDisplay } from '../../utils/displayConvert';
import { DeleteIcon, EditIcon, RestoreIcon, ViewIcon } from '../../assets/icons';
import { ListaVaciaT } from '../../components/pages/textosComponent';

export function Contenido({ lista, setIdProducto, setProductoVer, cambiarActivo }) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item) => {
      const { idPublica, nombre, descripcion, categoria, cantidad, precio, activo, stockMinimo, stockMaximo } = item;
      const activoBool = esActivo(activo);
      const textoDescripcion = (descripcion || "").trim();

      return (
        <tr key={idPublica}>
          <td className='tablaColID'>{GrayDisplay(idPublica)}</td>
          <td className='tablaColProducto'>
            <button
              type="button"
              className='botonNombreTabla'
              onClick={() => setProductoVer(item)}
              title={`Ver detalle de ${nombre}`}
            >
              {nombre}
            </button>
            {textoDescripcion && <div className='tablaProductoDescripcion'>{textoDescripcion}</div>}
          </td>
          <td className='tablaColCategoria'>{categoria}</td>
          <td className='tablaColCantidad'>{StockDisplay(cantidad, stockMinimo, stockMaximo)}</td>
          <td className='tablaColPrecio'>{MoneyDisplay(precio)}</td>
          <td className='tablaColEstado'>{EstadoDisplay(activo)}</td>
          <td className='tablaColAccionesCelda'>
            <div className='tablaColAcciones'>
              <button type="button" className='botonAccion iconEdit svgView' onClick={() => setProductoVer(item)} title="Ver detalle" aria-label={`Ver detalle de ${nombre}`}><ViewIcon /></button>
              <button type="button" className='botonAccion iconEdit svgEdit' onClick={() => setIdProducto(idPublica)} title="Editar producto" aria-label={`Editar ${nombre}`}><EditIcon /></button>
              {activoBool
                ? <button type="button" className='botonAccion iconEdit svgDelete' onClick={() => cambiarActivo(idPublica, false)} title="Desactivar producto" aria-label={`Desactivar ${nombre}`}><DeleteIcon /></button>
                : <button type="button" className='botonAccion iconEdit svgRestore' onClick={() => cambiarActivo(idPublica, true)} title="Activar producto" aria-label={`Activar ${nombre}`}><RestoreIcon /></button>
              }
            </div>
          </td>
        </tr>
      )
    })
  )
}
