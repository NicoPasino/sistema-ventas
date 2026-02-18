import '../shared/formNueva.css';
import { useContext, useState } from 'react';
import { NuevaVenta } from './nuevaVenta';
import ApiResponsePopup from '../../shared/ApiResponsePopup';
import { DataContext } from '../../../context/DataContext';

export function FormNuevaVenta() {
  const { ventas } = useContext(DataContext);
  const { agregar } = ventas;
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

// TODO: Agregar solo un botón "+" para agregar el primer item?
