import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '../../icons';
import { CargandoT, ListaVaciaT, ErrorMensaje } from '../shared/textosComponent';
import '../shared/tablas.css'

const thVentas = ["Código", "Cliente", "Productos", "Fecha", "Total"]; // GUI

export function TablaVentas ({itemsManage}) {
  const {items/* , eliminar */} = itemsManage;
  const [error, setError] = useState();

  useEffect(() => {
    if (items.error){
      setError(items.error);
    }
  }, [items]);

  function Contenido(){
    return (
      items.map((item, i) => {
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
  
  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr>{thVentas.map((e, i) => <th key={i}>{e}</th>)}</tr>
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



// TODO: 
//* REF: combinar productos + ventas, exportando solo <tbody>
//* Feat: ver info completa

