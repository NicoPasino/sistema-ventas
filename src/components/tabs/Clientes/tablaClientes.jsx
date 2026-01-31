import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { CargandoT, ListaVaciaT, ErrorMensaje } from '../shared/textosComponent';
import '../shared/tablas.css'

export function TablaClientes ({itemsManage, setIdProducto}) {
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
  
  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr><th></th><th>Nombre</th><th>Correo</th><th>Documento</th></tr>
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
