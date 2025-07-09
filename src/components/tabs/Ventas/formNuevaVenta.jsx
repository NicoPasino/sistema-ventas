import '../shared/formNueva.css';
import { useState } from 'react';
import { NuevaVenta } from './nuevaVenta';
import { useItems } from '../../useItems';
import { ventasDB as itemsDB } from "../../../database/db";

export function FormNuevaVenta() {
  const { agregar } = useItems({itemsDB}); // ventasDB
  const [newItems, setNewItems] = useState([]);  

  function submitHandler(event) {
    event.preventDefault();
    const query = Object.fromEntries(new window.FormData(event.target));
    if (!newItems[0]) return alert("se requiere al menos un producto.");

    const Productos = newItems.map(item => item.producto.ID).join(", "); // split(", ")
    const Cantidad = newItems.map(item => item.cantidad).join(", ");
    const Total = newItems.map(item => item.total).join(", ");

    const nuevoItem = {...query, Productos, Cantidad, Total };
    agregar({nuevoItem});

    console.log("VENTA CREADA ✅");
    // TODO: Modal + clear
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <h1>Nueva Venta:</h1>

      <NuevaVenta NItems={{newItems, setNewItems}}/>

      <div className='submitBtns'>
        <button type="reset" onClick={() => setNewItems([])}>Borrar</button>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  )
}


// TODO:
//* Restar de Productos...
//* manejo de error...

/* let nuevoItem = {
  Cliente: 'Nombre no válido.',
  Productos: 'Productos no válidos.',
  ProductosCant: 'Cantidad Productos no válidos.',
  Cantidad: 1,
  Precio: 1, // TODO: Cambiar por Total.
  
  // TipoDoc: "",
  // TipoR: "",
  // CuentaC: "",
  // CUIT: "",
  Descripcion: '-',
  Fecha: Date.now(),
}; */