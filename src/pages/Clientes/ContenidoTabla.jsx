import { ListaVaciaT } from '../../components/pages/textosComponent';
import { EstadoDisplay, esActivo, GrayDisplay, CorreoDisplay } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';
import { DeleteIcon, EditIcon, RestoreIcon, ViewIcon } from '../../assets/icons';

export function Contenido({lista, setIdCliente, setClienteVer, cambiarActivo}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { documento, nombre, correo, fechaCreacion, telefono, activo } = item;
      const { fecha, tiempoTranscurrido } = getDate(fechaCreacion);
      const activoBool = esActivo(activo);

      return (
        <tr key={i}>
          <td className='tablaColNombre'>    {nombre} </td>
          <td className='tablaColNombre'>    {CorreoDisplay(correo)} </td>
          <td className='tablaColNombre'>    {telefono || GrayDisplay("-")} </td>
          <td className='tablaColID'>    {documento} </td>
          <td className='tablaColID' title={tiempoTranscurrido}> {GrayDisplay(fecha)} </td>
          <td className='tablaColEstado'>    {EstadoDisplay(activo)} </td>
          <td>
            <div className='tablaColAcciones'>
              <i className='iconEdit svgView' onClick={()=> setClienteVer(item)} title="Ver detalle"> <ViewIcon /> </i>
              <i className='iconEdit svgEdit' onClick={()=> setIdCliente(documento)}> <EditIcon /> </i>
              {activoBool
                ? <i className='iconEdit svgDelete' onClick={()=> cambiarActivo(documento, false)}> <DeleteIcon /> </i>
                : <i className='iconEdit svgRestore' onClick={()=> cambiarActivo(documento, true)}> <RestoreIcon /> </i>
              }
            </div>
          </td>
        </tr>
      )
    })
  )
}
