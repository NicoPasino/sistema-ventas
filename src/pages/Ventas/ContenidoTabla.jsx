import { GrayDisplay, MoneyDisplay } from '../../utils/displayConvert';
import { ListaVaciaT } from '../../components/pages/textosComponent';
import { getDate } from '../../utils/getDate';
import { ViewIcon } from '../../assets/icons';

export function Contenido({lista, setVenta}) {
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
          <td className='tablaColNombre'>    {cliente.nombre} </td>
          <td className='tablaColDetalles'   title={detalle}> {productosCantidad} </td>
          <td className='tablaColFecha'      title={tiempoTranscurrido}> {fechaDinamica} </td>
          <td className='tablaColPrecio'>    {MoneyDisplay(totalCalculado)} </td>
          <td>
            <div className='tablaColAcciones'>
              <i className='iconEdit svgView' onClick={()=> {setVenta(item)}}> <ViewIcon /> </i>
              {/* <i className='iconEdit svgEdit' onClick={()=> setIdProducto(idPublica)}> <EditIcon /> </i> */}
              {/* <i className='iconEdit svgDelete' onClick={()=> eliminar(idPublica)}> <DeleteIcon /> </i> */}
            </div>
          </td>
        </tr>
      )
    })
  )
}
