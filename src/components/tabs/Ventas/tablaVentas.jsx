import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { CargandoT, ListaVaciaT, ErrorMensajeT } from '../shared/textosComponent';
import '../shared/tablas.css'

const thVentas = ["Código", "Cliente", "Productos", "Fecha", "Total"]; // GUI

export function TablaVentas ({itemsManage}) {
  const {items, loading, error/* , eliminar */} = itemsManage;

  function Contenido({lista}){
    if (!lista || lista.length === 0) return <ListaVaciaT />;
    return (
      lista.map((item, i) => {
        const { numero, cliente, detalle, fechaVenta, productos } = item;

        const fechaV = String(fechaVenta).slice(0, 10);
        // if (new Date().toISOString().slice(0, 10) == fechaV) fechaV = String(fechaVenta).slice(11, 19);
        
        const listaProductos = Array.isArray(productos) ? productos : [];
        const productosCantidad = listaProductos.map(p => `${p.producto} (x${p.cantidad})`).join(", ");
        const totalCalculado = listaProductos.reduce((total, p) => total + (p.subTotal || 0), 0);
        return (
          <tr key={i}>
            <td className='tablaColID'>        {numero} </td>
            <td className='tablaColNombre'>    {cliente} </td>
            <td className='tablaColDetalles' title={detalle}>  {productosCantidad} </td>
            <td className='tablaColDetalles'>  {fechaV} </td>
            <td className='tablaColPrecio'>  $ {totalCalculado.toFixed ? totalCalculado.toFixed(2) : totalCalculado} </td>
          </tr>
        )
      })
    )
  }
  
  return (
    <table className="tablaList">
      <thead>
        <tr>{thVentas.map((e, i) => <th key={i}>{e}</th>)}</tr>
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



// TODO: 
//* REF: combinar productos + ventas, exportando solo <tbody> (reutilizar código)
//* Feat: ver info completa

