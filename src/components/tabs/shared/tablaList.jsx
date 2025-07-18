import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import './tablas.css'

const tablas = {
  productos: ["ID", "Producto", "Descripcion", "Cantidad", "Precio"],
  ventas: ["ID", "Cliente", "Productos", "Cantidad", "Precio"],
  none: [""],
}

export function TablaList ({tipo="none", itemsManage, setIdProducto}) {
  const {items, eliminar} = itemsManage;
  const [error, setError] = useState();

  useEffect(() => {
    if (!tipo || tipo === "none") setError("ERROR DE CÓDIGO: Tipo de tabla no definido.")
    if (!items) setError("ERROR DE CÓDIGO: Sin lista!.")
  }, [tipo, items]);

  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr>
            { tablas[tipo].map((e) => <th key={tipo+e}>{e}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            //! SIN USO
            // TODO: REF: unir productos y ventas
            // TODO: REF: unir productos y ventas
            // TODO: REF: unir productos y ventas
            // TODO: REF: unir productos y ventas

            /* items.length === 0 
            ? <tr><td colSpan={20} className='colorGris'>La lista está vacía!.</td></tr>
            : items.map((item) =>
                <tr key={item.ID}>
                  {tablas[tipo].map((e) =>
                    <td key={item.ID+e}>
                      {e=="Precio" && "$ "} {item[e]}
                    </td>
                  )}
                  <td>
                    <i className='iconEdit svgView' onClick={()=> console.log(item.ID)}> <ViewIcon /> </i>
                    {tipo == "productos" && <i className='iconEdit svgEdit' onClick={()=> setIdProducto(item.ID)}> <EditIcon /> </i>}
                    <i className='iconEdit svgDelete' onClick={()=> eliminar(item.ID)}> <DeleteIcon /> </i>
                  </td>
                </tr>
              ) */
          }
        </tbody>
      </table>
    )
  }
  
  return <> { error ? <p className='colorRojoClaro'>{error}</p> : <Tabla />} </>
}
