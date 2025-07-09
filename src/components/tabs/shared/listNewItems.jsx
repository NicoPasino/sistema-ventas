import { useEffect, useRef, useState } from 'react';
import { productosDB as itemsDB } from '../../../database/db';
import { useItems } from "../../useItems";
import { NewIcon, CancelIcon } from '../../icons';

export function ListNewItems({newItemsState, tipo}) {
  const { newItems, setNewItems } = newItemsState;
  const { items } = useItems({itemsDB}); // productosDB as itemsDB
  const [total, setTotal] = useState(0);

  const inputIDRef = useRef();
  const inputProdRef = useRef();
  const inputCantRef = useRef();

  const getProducto = (id) => {
    return items.find(e => e.ID == id);
  }

  useEffect(() => { // Cambiar el Total al agregar Productos
    const cantTotal = newItems.reduce((acc, producto) => acc + producto.total, 0);
    setTotal(cantTotal);
  }, [newItems]);

  function handleChangeIdProducto() {
    // TODO:
    const resProducto = getProducto(inputIDRef.current.value);

    if (!resProducto) {
      inputProdRef.current.value = "";
      inputProdRef.current.placeholder = "Producto No encontrado!.";
      return 
    }

    inputProdRef.current.value = resProducto.Producto;
  }
  function handleNewItemForm() {
    const ref_idProducto = inputIDRef.current.value;
    const ref_cantidad = inputCantRef.current.value;
    const productoObj = getProducto(ref_idProducto);
    
    let mensajeError = "";
    if (!ref_idProducto || !ref_cantidad) {
      mensajeError = "Ingrese el ID y Cantidad del producto.";
    }
    else if (!productoObj) {
      mensajeError = `El Producto con id: ${ref_idProducto}, no se encontró.`;
    }
    if (mensajeError) return alert(mensajeError);
    
    const newData = {
      keyId: Date.now(),
      producto: productoObj,
      cantidad: ref_cantidad,
      total: productoObj.Precio * ref_cantidad,
    }
    setNewItems([...newItems, newData ]);
    
    inputIDRef.current.value = 0;
    inputProdRef.current.value = "";
    inputCantRef.current.value = 1;
  }
  function handleDelItem (id) {
    setNewItems(newItems.filter((e) => e.keyId !== id));
  }
    
  function NuevoItemForm ({producto, cantidad}) {
    return (
      <div className='group flexSeparados' style={{backgroundColor: "#222", width: "100%"}}>
        <span><b>ID</b>: {producto.ID}</span>
        <span className="w50"><b>Producto</b>: {producto.Producto}</span>
        <span><b>Cant</b>: x{cantidad}</span>
        {tipo === "Venta" && <span><b>Total</b>: ${producto.Precio * cantidad}</span>}
      </div>
    )
  }

  return (
    <fieldset>
      <legend>Productos</legend>
      <div>
        {newItems.map((element, i) => (
          <div className='flex' key={i}>
            <NuevoItemForm idProducto={element.idProducto} producto={element.producto} cantidad={element.cantidad}  handleDelete={handleDelItem}/>
            <i className='btnSvg btnRojo' onClick={() => handleDelItem(element.keyId)} > <CancelIcon /> </i>
          </div>
        ))}
      </div>
      
      <div className='flex'>
        <div className='group flexSeparados'>
          <div>
            <label htmlFor="idProducto">ID:</label>
            <input className='inputS' ref={inputIDRef} type="number" id="idProducto" defaultValue={0} step="1" onChange={handleChangeIdProducto}/>

            <label htmlFor="nombreProducto">Nombre:</label>
            <input ref={inputProdRef} type="text" id="nombreProducto" placeholder={"Nombre del Producto"} />
            
            <label htmlFor="cantidadProducto">Cantidad:</label>
            <input className='inputXS' ref={inputCantRef} type="number" id="cantidadProducto" defaultValue="1" min="1"/>
          </div>
        </div>
        <i className='btnSvg btnVerde' onClick={(e) => handleNewItemForm(e)} > <NewIcon /> </i>
      </div>
      
      {tipo === "Venta" && <span><b>Total</b>: $ {total}</span>}
    </fieldset>
  )
}