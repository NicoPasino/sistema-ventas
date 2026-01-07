import '../shared/formNueva.css';
import { useItems } from '../../useItems';
import { productosAPI } from "../../../services/apiClient";
import { NuevoProducto } from './nuevoProducto';
import { useState } from 'react';
import ApiResponsePopup from '../../shared/ApiResponsePopup';

export function FormNuevoProducto({id, setIdProducto, reload}) {
  const { agregar, actualizar, obtenerItem } = useItems({itemsDB: productosAPI});
  const [apiResponse, setApiResponse] = useState(null);
  
  async function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));

    convertirTipos(nuevoItem);

    if (id) {
      // Update
      const nuevoDato = {...nuevoItem, IdPublica: id}
      let res = await actualizar({nuevoDato});

      if(res.message || res.error) {
        return;
      }
      else if(res.ok){
        setIdProducto();
        reload(productosAPI);
        event.target.reset();
      }
      
    }
    else {
      // Crear
      let res = await agregar({nuevoItem});
      setApiResponse(res);

      if(res.message || res.error) {
        return;
      }
      if (res.ok) {
        event.target.reset();
      }
    }
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <h1>{id ? "Editar" : "Crear"} Producto: {/* <span className="colorRojoClaro">{id}</span> */}</h1>

      <NuevoProducto id={id} obtenerItem={obtenerItem} />

      <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />

      <div className='submitBtns'>
        <button type="reset" onClick={() => setIdProducto && setIdProducto()}>Cancelar</button>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  )
}

function convertirTipos(nuevoItem){  
  // Nota: Convertir tipos porque el FormData devuelve strings.

  // TODO: validaciones

  if (nuevoItem.activo !== undefined) {
    nuevoItem.activo = nuevoItem.activo === 'true';
  }
  if (nuevoItem.Cantidad !== undefined) {
    nuevoItem.Cantidad = Number(nuevoItem.Cantidad) || 0;
  }
  if (nuevoItem.Precio !== undefined) {
    nuevoItem.Precio =  nuevoItem.Precio || 0;
  }
  if (nuevoItem.IdCategoria !== undefined) {
    nuevoItem.IdCategoria = Number(nuevoItem.IdCategoria) || 1;
  }
}