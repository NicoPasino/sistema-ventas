import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import '../shared/tablas.css'

const productos = ["ID", "Producto", "Descripcion", "Cantidad", "Precio"];

export function TablaProductos ({itemsManage, setIdProducto}) {
  const {items, eliminar} = itemsManage;
  const [error, setError] = useState();

  useEffect(() => {
    if (!items) setError("ERROR DE CÓDIGO: Sin lista!.")
  }, [items]);

  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr>{productos.map((e, i) => <th key={i}>{e}</th>)}<th>Acciones</th></tr>
        </thead>
        <tbody>
          {
            items.length === 0 
            ? <tr><td colSpan={20} className='colorGris'>La lista está vacía!.</td></tr>
            : items.map((item, i) =>
              <tr key={i}>
                <td className='tablaColID'>        {item[productos[0]]} </td>
                <td className='tablaColNombre'>    {item[productos[1]]} </td>
                <td className='tablaColDetalles'>  {item[productos[2]]} </td>
                <td className='tablaColCantidad'>  {item[productos[3]]} </td>
                <td className='tablaColPrecio'>  $ {item[productos[4]]} </td>
                <td className='tablaColAcciones'>
                  <i className='iconEdit svgView svgDisabled' onClick={()=> console.log(item.ID)}> <ViewIcon /> </i>
                  <i className='iconEdit svgEdit' onClick={()=> setIdProducto(item.ID)}> <EditIcon /> </i>
                  <i className='iconEdit svgDelete' onClick={()=> eliminar(item.ID)}> <DeleteIcon /> </i>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
  
  return <> { error ? <p className='colorRojoClaro'>{error}</p> : <Tabla />} </>
}

// TODO: 
//* REF: combinar productos + ventas, exportando solo <tbody>
//* Feat: ver info completa
