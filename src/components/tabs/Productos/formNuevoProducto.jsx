import '../shared/formNueva.css';
import { DataContext } from '../../../context/DataContext';
import { useContext, useState } from 'react';
import { NuevoProducto } from './nuevoProducto';
import ApiResponsePopup from '../../shared/ApiResponsePopup';

export function FormNuevoProducto({id, setIdProducto}) {
  const { productos } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = productos;
  const [apiResponse, setApiResponse] = useState(null);
  
  async function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));

    convertirTipos(nuevoItem);

    // TODO: 
    if (id) {
      // Update
      const nuevoDato = {...nuevoItem, IdPublica: id}
      let res = await actualizar({nuevoDato});

      if(res.message || res.error) {
        return;
      }
      else if(res.ok){
        setIdProducto();
        reloadItems();
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
    const parsed = Number(nuevoItem.IdCategoria);
    nuevoItem.IdCategoria = Number.isNaN(parsed) ? nuevoItem.IdCategoria : parsed;
  }
}