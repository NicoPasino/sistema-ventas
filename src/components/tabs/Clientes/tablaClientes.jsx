import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { CargandoT, ListaVaciaT, ErrorMensajeT } from '../shared/textosComponent';
import '../shared/tablas.css'

export function TablaClientes ({itemsManage, setIdProducto}) {
  const {items, loading, error, eliminar} = itemsManage;

  function Contenido({lista}) {
    if (!lista || lista.length === 0) return <ListaVaciaT />;
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
  
  return (
    <table className="tablaList">
      <thead>
        <tr><th></th><th>Nombre</th><th>Correo</th><th>Documento</th></tr>
      </thead>
      <tbody>
        {
          loading 
            ? <CargandoT />
            : ( error ) 
              ? <ErrorMensajeT msg={error} />
              : <Contenido lista={items} />
        }
      </tbody>
    </table>
  )
}
