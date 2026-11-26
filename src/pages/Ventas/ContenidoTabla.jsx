import { useState } from 'react';
import { GrayDisplay, MoneyDisplay, WhiteDisplay } from '../../utils/displayConvert';
import { ListaVaciaT } from '../../components/pages/textosComponent';
import { getDate } from '../../utils/getDate';
import { ViewIcon } from '../../assets/icons';
import { totalVenta } from '../../utils/ventas';

const MAX_PRODUCTOS = 4;

function FilaVenta({ item, setVenta }) {
  const { numero, cliente, fechaVenta, productos } = item;

  const { tiempoTranscurrido, fechaDinamica } = getDate(fechaVenta);
  const listaProductos = Array.isArray(productos) ? productos : [];
  const nombreCliente = cliente?.nombre;
  const [verTodos, setVerTodos] = useState(false);

  const totalProductos = listaProductos.length;
  const mostrarBoton = totalProductos > MAX_PRODUCTOS;
  const visibles = verTodos || !mostrarBoton ? listaProductos : listaProductos.slice(0, MAX_PRODUCTOS - 1);

  function renderProductos() {
    return (
      <div className="productosTabla">
        {visibles.map((p, j) => (
          <span key={j} title={`${p.producto} x${p.cantidad}`}> - {p.producto} {WhiteDisplay(`x${p.cantidad}`)}</span>
        ))}
        {mostrarBoton && (
          <button type="button" className="botonVerMas" onClick={() => setVerTodos(!verTodos)}>
            {verTodos ? "Ocultar" : `+${totalProductos - visibles.length} más`}
          </button>
        )}
      </div>
    )
  }

  return (
    <tr>
      <td className='tablaColID'>
        <button type="button" className='botonNombreTabla' onClick={() => setVenta(item)} title={`Ver detalle de la venta`}>{GrayDisplay(numero)}</button>
      </td>
      <td className='tablaColNombre'>
        {nombreCliente
          ? nombreCliente
          : GrayDisplay("(Sin cliente)")
        }
      </td>
      <td className='tablaColDetalles'>
        {listaProductos.length === 0
          ? GrayDisplay("(Sin productos)")
          : renderProductos()
        }
      </td>
      <td className='tablaColFecha' title={tiempoTranscurrido}>{fechaDinamica}</td>
      <td className='tablaColPrecio'>{MoneyDisplay(totalVenta(item))}</td>
      <td className='tablaColAccionesCelda'>
        <div className='tablaColAcciones'>
          <button type="button" className='botonAccion iconEdit svgView' onClick={() => setVenta(item)} title="Ver detalle" aria-label={`Ver detalle de la venta N° ${numero}`}><ViewIcon /></button>
        </div>
      </td>
    </tr>
  )
}

export function Contenido({ lista, setVenta }) {
  if (!lista || lista.length == 0) return <ListaVaciaT />;

  return lista.map((item) => (
    <FilaVenta key={item.numero} item={item} setVenta={setVenta} />
  ))
}
