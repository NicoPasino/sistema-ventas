import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { CargandoT, ListaVaciaT, ErrorMensaje } from '../shared/textosComponent';
import '../shared/tablas.css'

const thProductos = ["Código", "Producto", "Descripción", "Categoría", "Stock", "Precio"]; // GUI

export function TablaProductos ({itemsManage, setIdProducto}) {
  const {items, eliminar} = itemsManage;
  const [error, setError] = useState();

  useEffect(() => {
    if (items.error){
      setError(items.error);
    }
  }, [items]);

  function Contenido() {
    return (
      items.map((item, i) => {
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

  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr>{thProductos.map((e, i) => <th key={i}>{e}</th>)}<th>Acciones</th></tr>
        </thead>
        <tbody>
          {
            itemsManage.loading 
              ? <CargandoT />
              : ( error || items.length === 0 ) ? <ListaVaciaT /> : <Contenido />
          }
        </tbody>
      </table>
    )
  }

  
  return <> { error ? <ErrorMensaje msg={"Error al conectar con la base de datos."} /> : <Tabla />} </>
}

// TODO: ver info completa