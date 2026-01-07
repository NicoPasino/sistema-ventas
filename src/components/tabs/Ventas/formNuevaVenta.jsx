import '../shared/formNueva.css';
import { useState } from 'react';
import { NuevaVenta } from './nuevaVenta';
import { useItems } from '../../useItems';
import { ventasAPI as itemsDB } from "../../../services/apiClient";
import ApiResponsePopup from '../../shared/ApiResponsePopup';

export function FormNuevaVenta() {
  const { agregar } = useItems({itemsDB}); // ventasDB
  const [newItems, setNewItems] = useState([]);  
  const [apiResponse, setApiResponse] = useState(null);
  
  async function submitHandler(event) {
    event.preventDefault();
    const query = Object.fromEntries(new window.FormData(event.target));
    if (!newItems[0]) return alert("se requiere al menos un producto."); // TODO: modal

    var ItemsId = newItems.map(i => i.producto.idPublica);
    var ItemsCant = newItems.map(i => parseInt(i.cantidad));

    const nuevoItem = {...query, ItemsId, ItemsCant };
    var res = await agregar({nuevoItem});
    
    setApiResponse(res)
    if(res.message || res.error) {
      return;
    }
    else if (res.ok) {
      event.target.reset();
      setNewItems([]);
    }
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <h1>Nueva Venta:</h1>

      <NuevaVenta NItems={{newItems, setNewItems}}/>

      <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />

      <div className='submitBtns'>
        <button type="reset" onClick={() => setNewItems([])}>Borrar</button>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  )
}


// TODO:

//* GuardarLocalmente Lista de productos + al sumar +1 que sea el ID primero de la lista (1001)
//* Agregar solo un botón + para agregar el primer item?
//* Avisar (si el item para agregar no fue agregado)
