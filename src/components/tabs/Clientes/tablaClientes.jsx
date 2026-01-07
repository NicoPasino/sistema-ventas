import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import '../shared/tablas.css'

export function TablaClientes ({itemsManage, setIdProducto}) {
  const {items, eliminar} = itemsManage;
  const [error, setError] = useState();

  useEffect(() => {
    if (items.error){
      setError(items.error);
    }
  }, [items]);

  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr><th></th><th>Nombre</th><th>Correo</th><th>Documento</th></tr>
        </thead>
        <tbody>
          {
            (items.error || items.length === 0 )
            ? <tr><td colSpan={20} className='colorGris'>La lista está vacía!.</td></tr>
            : items.map((item, i) => {
              const { nombre, correo, documento } = item;

              return (
                <tr key={i}>
                  <td className='tablaColID'>        {i} </td>
                  <td className='tablaColNombre'>    {nombre} </td>
                  <td className='tablaColDetalles'>  {correo} </td>
                  <td className='tablaColPrecio'>    {documento} </td>
                  {/* <td className='tablaColAcciones'>
                    <i className='iconEdit svgView svgDisabled' onClick={()=> console.log("click: " + documento)}> <ViewIcon /> </i>
                    <i className='iconEdit svgEdit' onClick={()=> setIdProducto(documento)}> <EditIcon /> </i>
                    <i className='iconEdit svgDelete' onClick={()=> eliminar(documento)}> <DeleteIcon /> </i>
                  </td> */}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
  
  return <> { error ? <p className='colorRojoClaro'>{error}</p> : <Tabla />} </>
}
