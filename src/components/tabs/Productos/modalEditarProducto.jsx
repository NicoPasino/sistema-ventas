import './modalProducto.css';
import { DataContext } from '../../../context/DataContext';
import { useContext, useState } from 'react';
import { NuevoProducto } from './nuevoProducto';
import ApiResponsePopup from '../../shared/ApiResponsePopup';
import { Button } from '../../shared/botones';
import { Modal } from '../../shared/Modal';


export function ModalEditarProducto({id, setIdProducto}) {
  const { productos } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = productos;
  const [apiResponse, setApiResponse] = useState(null);
  
  async function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));

    convertirTipos(nuevoItem);

    if (id) {
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
      let res = await agregar({nuevoItem});
      setApiResponse(res);

      if(res.message || res.error) {
        return;
      }
      if (res.ok) {
        setIdProducto();
        reloadItems();
        event.target.reset();
      }
    }
  }

  function handleClose() {
    if (setIdProducto) setIdProducto();
  }

  return (
    <Modal 
      title={id ? "Editar Producto" : "Nuevo Producto"} 
      onClose={handleClose}
    >
      <form onSubmit={submitHandler}>
        <div className="modal-body-layout">
          <div className="modal-image-section">
            <div className="image-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Agregar imagen del producto</span>
            </div>
          </div>
          
          <div className="modal-form-section">
            <NuevoProducto id={id} obtenerItem={obtenerItem} />
          </div>
        </div>
        
        <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />
          
        <div className="modal-footer">
          <Button type="button" variant="danger" onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="success">Confirmar</Button>
        </div>
      </form>
    </Modal>
  )
}

function convertirTipos(nuevoItem){  
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
