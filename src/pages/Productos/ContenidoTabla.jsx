import { EstadoDisplay, esActivo, GrayDisplay, MoneyDisplay, StockDisplay } from '../../utils/displayConvert';
import { DeleteIcon, EditIcon, RestoreIcon, ViewIcon } from '../../assets/icons';
import { ListaVaciaT } from '../../components/pages/textosComponent';

export function Contenido({lista, setIdProducto, setProductoVer, eliminar}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { idPublica, nombre, descripcion, categoria, cantidad, precio, activo, stockMinimo, stockMaximo } = item;
      const activoBool = esActivo(activo);

      return (
        <tr key={i}>
          <td className='tablaColID'>        {GrayDisplay(idPublica)} </td>
          <td className='tablaColNombre'>    {nombre} </td>
          <td className='tablaColDetalles'>  {descripcion} </td>
          <td className='tablaCol'>          {categoria} </td>
          <td className='tablaColCantidad'>  {StockDisplay(cantidad, stockMinimo, stockMaximo)} </td>
          <td className='tablaColPrecio'>    {MoneyDisplay(precio)} </td>
          <td className='tablaColEstado'>    {EstadoDisplay(activo)} </td>
          <td>
            <div className='tablaColAcciones'>
              <i className='iconEdit svgView' onClick={()=> setProductoVer(item)} title="Ver detalle"> <ViewIcon /> </i>
              <i className='iconEdit svgEdit' onClick={()=> setIdProducto(idPublica)}> <EditIcon /> </i>
              {activoBool
                ? <i className='iconEdit svgDelete' onClick={()=> eliminar(idPublica)}> <DeleteIcon /> </i>
                : <i className='iconEdit svgRestore' onClick={()=> eliminar(idPublica)}> <RestoreIcon /> </i>
              }
            </div>
          </td>
        </tr>
      )
    })
  )
}
