import { ListaVaciaT } from '../../components/pages/textosComponent';
import { EstadoDisplay, esActivo, GrayDisplay, CorreoDisplay } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';
import { DeleteIcon, EditIcon, RestoreIcon, ViewIcon } from '../../assets/icons';

export function Contenido({ lista, setIdCliente, setClienteVer, cambiarActivo }) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item) => {
      const { documento, nombre, correo, fechaCreacion, activo } = item;
      const { fecha, tiempoTranscurrido } = getDate(fechaCreacion);
      const activoBool = esActivo(activo);

      return (
        <tr key={documento}>
          <td className='tablaColNombre'>
            <button
              type="button"
              className='botonNombreTabla'
              onClick={() => setClienteVer(item)}
              title={`Ver detalle de ${nombre}`}
            >
              {nombre}
            </button>
          </td>
          <td className='tablaColNombre'>{CorreoDisplay(correo)}</td>
          <td className='tablaColID'>{documento}</td>
          <td className='tablaColFecha' title={tiempoTranscurrido}>{GrayDisplay(fecha)}</td>
          <td className='tablaColEstado'>{EstadoDisplay(activo)}</td>
          <td className='tablaColAccionesCelda'>
            <div className='tablaColAcciones'>
              <button type="button" className='botonAccion iconEdit svgView' onClick={() => setClienteVer(item)} title="Ver detalle" aria-label={`Ver detalle de ${nombre}`}><ViewIcon /></button>
              <button type="button" className='botonAccion iconEdit svgEdit' onClick={() => setIdCliente(documento)} title="Editar cliente" aria-label={`Editar ${nombre}`}><EditIcon /></button>
              {activoBool
                ? <button type="button" className='botonAccion iconEdit svgDelete' onClick={() => cambiarActivo(documento, false)} title="Desactivar cliente" aria-label={`Desactivar ${nombre}`}><DeleteIcon /></button>
                : <button type="button" className='botonAccion iconEdit svgRestore' onClick={() => cambiarActivo(documento, true)} title="Activar cliente" aria-label={`Activar ${nombre}`}><RestoreIcon /></button>
              }
            </div>
          </td>
        </tr>
      )
    })
  )
}
