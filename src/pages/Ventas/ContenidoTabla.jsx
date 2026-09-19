import { GrayDisplay, MoneyDisplay } from '../../utils/displayConvert';
import { ListaVaciaT } from '../../components/pages/textosComponent';
import { getDate } from '../../utils/getDate';

export function Contenido({lista}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { numero, cliente, detalle, fechaVenta, productos } = item;

      const {tiempoTranscurrido, fechaDinamica} = getDate(fechaVenta);
      
      const listaProductos = Array.isArray(productos) ? productos : [];
      const productosCantidad = listaProductos.map(p => `${p.producto} (x${p.cantidad})`).join(", ");
      const totalCalculado = listaProductos.reduce((total, p) => total + (p.subTotal || 0), 0);
      return (
        <tr key={i}>
          <td className='tablaColID'>        {GrayDisplay(numero)} </td>
          <td className='tablaColNombre'>    {cliente} </td>
          <td className='tablaColDetalles'   title={detalle}> {productosCantidad} </td>
          <td className='tablaColFecha'      title={tiempoTranscurrido}> {fechaDinamica} </td>
          <td className='tablaColPrecio'>    {MoneyDisplay(totalCalculado)} </td>
        </tr>
      )
    })
  )
}
