import { ListaVaciaT } from '../../components/pages/textosComponent';
import { GrayDisplay, CorreoDisplay } from '../../utils/displayConvert';
import { getDate } from '../../utils/getDate';

export function Contenido({lista}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { nombre, correo, documento, fechaCreacion } = item;
      const { fecha, tiempoTranscurrido } = getDate(fechaCreacion);

      return (
        <tr key={i}>
          <td className='tablaColNombre'>    {nombre} </td>
          <td className='tablaColDetalles'>  {CorreoDisplay(correo)} </td>
          <td className='tablaColID'>    {documento} </td>
          <td className='tablaColID' title={tiempoTranscurrido}> {GrayDisplay(fecha)} </td>
        </tr>
      )
    })
  )
}
