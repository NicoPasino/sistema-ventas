import { ListaVaciaT } from '../shared/textosComponent';

export function Contenido({lista}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { nombre, correo, documento } = item;

      return (
        <tr key={i}>
          <td className='tablaColID'>        {i} </td>
          <td className='tablaColNombre'>    {nombre} </td>
          <td className='tablaColDetalles'>  {correo} </td>
          <td className='tablaColPrecio'>    {documento} </td>
        </tr>
      )
    })
  )
}
