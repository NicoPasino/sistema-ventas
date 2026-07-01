import { GrayDisplay, MoneyDisplay, StockDisplay } from '../../../utils/displayConvert';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { ListaVaciaT } from '../shared/textosComponent';

export function Contenido({lista, setIdProducto, eliminar}) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return (
    lista.map((item, i) => {
      const { idPublica, nombre, descripcion, categoria, cantidad, precio } = item;

      return (
        <tr key={i}>
          <td className='tablaColID'>        {GrayDisplay(idPublica)} </td>
          <td className='tablaColNombre'>    {nombre} </td>
          <td className='tablaColDetalles'>  {descripcion} </td>
          <td className='tablaCol'>          {categoria} </td>
          <td className='tablaColCantidad'>  {StockDisplay(cantidad)} </td>
          <td className='tablaColPrecio'>    {MoneyDisplay(precio)} </td>
          <td>
            <div className='tablaColAcciones'>
              {/* <i className='iconEdit svgView svgDisabled' onClick={()=> {}}> <ViewIcon /> </i> */}
              <i className='iconEdit svgEdit' onClick={()=> setIdProducto(idPublica)}> <EditIcon /> </i>
              <i className='iconEdit svgDelete' onClick={()=> eliminar(idPublica)}> <DeleteIcon /> </i>
            </div>
          </td>
        </tr>
      )
    })
  )
}
