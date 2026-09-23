import { useState } from 'react';
import { GrayDisplay, MoneyDisplay, WhiteDisplay } from '../../utils/displayConvert';
import { ListaVaciaT } from '../../components/pages/textosComponent';
import { getDate } from '../../utils/getDate';
import { ViewIcon } from '../../assets/icons';

const PRODUCTOS_VISIBLES = 2;

function FilaVenta({ item, setVenta }) {
  const { numero, cliente, fechaVenta, productos, detalle } = item;

  const { tiempoTranscurrido, fechaDinamica } = getDate(fechaVenta);
  const listaProductos = Array.isArray(productos) ? productos : [];
  const totalCalculado = listaProductos.reduce((total, p) => total + (p.subTotal || 0), 0);
  const [verTodos, setVerTodos] = useState(false);

  const visibles = verTodos ? listaProductos : listaProductos.slice(0, PRODUCTOS_VISIBLES);

  function renderProductos() {
    return (
      <>
        {visibles.map((p, j) => (
          <div key={j}>{p.producto} {WhiteDisplay(`x${p.cantidad}`)}</div>
        ))}
        {listaProductos.length > PRODUCTOS_VISIBLES && <button className="botonVerMas" onClick={() => setVerTodos(!verTodos)}>
          {verTodos ? "Ocultar" : `+${listaProductos.length - PRODUCTOS_VISIBLES} más`}
        </button>
        }
      </>
    )
  }

  return (
    <tr>
      <td className='tablaColID'>        {GrayDisplay(numero)} </td>
      <td className='tablaColNombre'>    {cliente.nombre} </td>
      <td className='tablaColDetalles'>  {renderProductos()} </td>
      <td className='tablaColDetalles'>  {detalle ? GrayDisplay(detalle) : GrayDisplay("(Sin detalle)", false)} </td>
      <td className='tablaColFecha'      title={tiempoTranscurrido}> {fechaDinamica} </td>
      <td className='tablaColPrecio'>    {MoneyDisplay(totalCalculado)} </td>
      <td>
        <div className='tablaColAcciones'>
          <i className='iconEdit svgView' onClick={() => { setVenta(item) }}> <ViewIcon /> </i>
          {/* <i className='iconEdit svgEdit' onClick={()=> setIdProducto(idPublica)}> <EditIcon /> </i> */}
          {/* <i className='iconEdit svgDelete' onClick={()=> eliminar(idPublica)}> <DeleteIcon /> </i> */}
        </div>
      </td>
    </tr>
  )
}

export function Contenido({ lista, setVenta }) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return lista.map((item, i) => (
    <FilaVenta key={i} item={item} setVenta={setVenta} />
  ))
}