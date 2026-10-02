import { ListaVaciaT } from '../../components/pages/textosComponent';
import { GrayDisplay, CorreoDisplay } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';
import { EditIcon, ViewIcon } from '../../assets/icons';

export function Contenido({lista, setIdCliente, setClienteVer}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { documento, nombre, correo, fechaCreacion, telefono } = item;
      const { fecha, tiempoTranscurrido } = getDate(fechaCreacion);

      return (
        <tr key={i}>
          <td className='tablaColNombre'>    {nombre} </td>
          <td className='tablaColNombre'>    {CorreoDisplay(correo)} </td>
          <td className='tablaColNombre'>    {telefono || GrayDisplay("-")} </td>
          <td className='tablaColID'>    {documento} </td>
          <td className='tablaColID' title={tiempoTranscurrido}> {GrayDisplay(fecha)} </td>
          <td>
            <div className='tablaColAcciones'>
              <i className='iconEdit svgView' onClick={()=> setClienteVer(item)} title="Ver detalle"> <ViewIcon /> </i>
              <i className='iconEdit svgEdit' onClick={()=> setIdCliente(documento)}> <EditIcon /> </i>
            </div>
          </td>
        </tr>
      )
    })
  )
}
