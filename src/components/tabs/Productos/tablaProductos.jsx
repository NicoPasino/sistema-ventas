import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { CargandoT, ListaVaciaT, ErrorMensajeT } from '../shared/textosComponent';
import '../shared/tablas.css'

const thProductos = ["Código", "Producto", "Descripción", "Categoría", "Stock", "Precio"]; // GUI

export function TablaProductos ({itemsManage, setIdProducto}) {
  const {items, loading, error, eliminar} = itemsManage;

  function Contenido({lista}) {
    if (!lista || lista.length == 0) return <ListaVaciaT />;

    return (
      lista.map((item, i) => {
        const { idPublica, nombre, descripcion, categoria, cantidad, precio } = item;

        return (
          <tr key={i}>
            <td className='tablaColID'>        {idPublica} </td>
            <td className='tablaColNombre'>    {nombre} </td>
            <td className='tablaColDetalles'>  {descripcion} </td>
            <td className='tablaCol'>          {categoria} </td>
            <td className='tablaColCantidad'>  {<span className={(cantidad>15) ? "" : "colorRojoClaro"}>{cantidad}</span>} </td>
            <td className='tablaColPrecio'>  $ {precio} </td>
            <td className='tablaColAcciones'>
              <i className='iconEdit svgView svgDisabled' onClick={()=> {}}> <ViewIcon /> </i>
              <i className='iconEdit svgEdit' onClick={()=> setIdProducto(idPublica)}> <EditIcon /> </i>
              <i className='iconEdit svgDelete' onClick={()=> eliminar(idPublica)}> <DeleteIcon /> </i>
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <table className="tablaList">
      <thead>
        <tr>{thProductos.map((e, i) => <th key={i}>{e}</th>)}<th>Acciones</th></tr>
      </thead>
      <tbody>
        {
          loading 
            ? <CargandoT />
            : ( error ) 
              ? <ErrorMensajeT msg={error} />
              : <Contenido lista={items} setIdProducto={setIdProducto} eliminar={eliminar} />
        }
      </tbody>
    </table>
  )
}

// TODO: ver info completa