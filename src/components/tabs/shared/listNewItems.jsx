import { useEffect, useRef, useState } from 'react';
import { productosAPI as itemsDB } from '../../../services/apiClient';
import { useItems } from '../../../Hooks/useItems';
import { NewIcon, CancelIcon } from '../../icons';

export function ListNewItems({newItemsState, tipo}) {
  const { newItems, setNewItems } = newItemsState;
  const { items, loading, error } = useItems({itemsDB}); // productosDB as itemsDB
  const [total, setTotal] = useState(0);

  const inputIDRef = useRef();
  const inputCantRef = useRef();

  const getProducto = (id) => {
    return items.find(e => e.idPublica == id);
  }

  useEffect(() => { // (Cambiar el Total al agregar Productos)
    const cantTotal = newItems.reduce((acc, producto) => acc + producto.total, 0);
    setTotal(cantTotal.toFixed(2));
  }, [newItems]);

  // (Al cambiar ID)
  function handleChangeIdProducto(evento) {
    inputIDRef.current = evento.target.value;
  }

  function handleNewItemForm() {
    const ref_idProducto = inputIDRef.current;
    const ref_cantidad = inputCantRef.current.value;
    const productoObj = getProducto(ref_idProducto);
    
    let mensajeError = "";
    if (!ref_idProducto || !ref_cantidad) {
      mensajeError = "Seleccione un producto antes de agregar a la lista.";
    }
    else if (!productoObj) {
      mensajeError = `El Producto con id: ${ref_idProducto}, no se encontró.`;
    }
    if (mensajeError) return alert(mensajeError);
    
    const newData = {
      keyId: Date.now(),
      producto: productoObj,
      cantidad: ref_cantidad,
      total: productoObj.precio * ref_cantidad,
    }
    setNewItems([...newItems, newData ]);
    
    inputIDRef.current = "";
    inputCantRef.current.value = 1;
  }
  function handleDelItem (id) {
    setNewItems(newItems.filter((e) => e.keyId !== id));
  }

  function ListaProductos() {
    if (!items) return <input value={"(La lista está vacia)"} disabled/>
    return (
      <select id="ListaProductos" disabled={loading} onChange={handleChangeIdProducto}>
        <option value="">Seleccione un Producto</option>
        {items.map((e, i) => ( <option key={i} value={e.idPublica}>{e.nombre}</option> ))}
      </select>
    )
  }
  
  return (
    <fieldset>
      <legend>Productos</legend>
      {/* Buscar Producto */}
      <div className='flex'>
        <div className='group flexSeparados'>
          <div>            
            <label htmlFor="ListaProductos">Producto:</label>
            {
              (loading) ? <input value={"Cargando Productos..."} disabled/>
                : (error) 
                  ? <input value={"Error al cargar Productos."} disabled/>
                  : <ListaProductos/>
            }

            <label htmlFor="cantidadProducto">Cantidad:</label>
            <input className='inputXS' ref={inputCantRef} type="number" id="cantidadProducto" defaultValue={1} min={1}/>
          </div>
        </div>
        <i className='btnSvg btnVerde' onClick={(e) => handleNewItemForm(e)} > <NewIcon /> </i>
      </div>
      
      {/* Productos Agregados */}
      <div>
        {newItems.map((element, i) => (
          <div className='flex' key={i}>
            <NuevoItemForm idProducto={element.idProducto} producto={element.producto} cantidad={element.cantidad}  handleDelete={handleDelItem}/>
            <i className='btnSvg btnRojo' onClick={() => handleDelItem(element.keyId)} > <CancelIcon /> </i>
          </div>
        ))}
      </div>
      
      {tipo === "Venta" && <span><b>Total</b>: $ {total}</span>}
    </fieldset>
  )
}

// componente
function NuevoItemForm ({producto, cantidad}) {
  return (
    <div className='group flexSeparados' style={{backgroundColor: "#222", width: "100%"}}>
      <span><b>ID</b>: {producto.idPublica}</span>
      <span className="w50"><b>Producto</b>: {producto.nombre}</span>
      <span><b>Cant</b>: x{cantidad}</span>
      <span><b>Total</b>: ${producto.precio * cantidad}</span>
    </div>
  )
}