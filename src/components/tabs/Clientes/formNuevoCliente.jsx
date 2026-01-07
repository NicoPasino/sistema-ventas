import ApiResponsePopup from '../../shared/ApiResponsePopup';
import { useItems } from '../../useItems';
import { useState } from 'react';
import { clientesAPI as itemsDB } from "../../../services/apiClient";
import { NuevoCliente } from './nuevoCliente';
import '../shared/formNueva.css';


// SIN USO
// SIN USO
// SIN USO
// SIN USO


export function FormNuevoCliente({id, setIdProducto, reload}) {
  const { agregar, actualizar, obtenerItem } = useItems({itemsDB});
  const [apiResponse, setApiResponse] = useState(null);
  
  async function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));

    if (id) {
      // Update
      const nuevoDato = {...nuevoItem, IdPublica: id}
      let res = await actualizar({nuevoDato});
      
      setApiResponse(res)

      if(res.message || res.error) {
        return;
      }
      else if(res.ok){
        reload(itemsDB);
        event.target.reset();
      }
    }
    else {
      // Crear
      let res = await agregar({nuevoItem});
      setApiResponse(res);
      if (res.ok) {
        event.target.reset();
      }
    }
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <h1>Nueva Venta:</h1>

      <NuevoCliente id={id} obtenerItem={obtenerItem} />

      <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />

      <div className='submitBtns'>
        <button type="reset" onClick={() => setIdProducto && setIdProducto()}>Borrar</button>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  )
}


// SIN USO
// SIN USO
// SIN USO
// SIN USO

