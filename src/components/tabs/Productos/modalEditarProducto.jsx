import './modalProducto.css';
import { DataContext } from '../../../context/DataContext';
import { useContext } from 'react';
import { NuevoProducto } from './nuevoProducto';
import { usePopup } from '../../../context/PopupContext';
import { Button } from '../../shared/botones';
import { Modal } from '../../shared/Modal';
import { ImageIcon } from '../../icons';
import { CheckRes } from '../../../utils/checkRes';

export function ModalEditarProducto({id, setIdProducto}) {
  const { productos } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = productos;
  const { showPopup } = usePopup();

  const handleClose = () => setIdProducto?.();

  async function submitHandler(event) {
    event.preventDefault();
    let nuevoItem = Object.fromEntries(new window.FormData(event.target));

    convertirTipos(nuevoItem);

    const handleEnd = () => {
      reloadItems();
      event.target.reset();
      setIdProducto?.();
    }

    // Modificar
    if (id) {
      const nuevoDato = {...nuevoItem, IdPublica: id}
      const res = await actualizar({nuevoDato});
      CheckRes(res, { onSuccess: handleEnd, showPopup });
    }
    // Agregar
    else {
      const res = await agregar({nuevoItem});
      CheckRes(res, { onSuccess: handleEnd, showPopup });
    }
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
              <ImageIcon />
              <span>Agregar imagen del producto</span>
            </div>
          </div>
          
          <div className="modal-form-section">
            <NuevoProducto id={id} obtenerItem={obtenerItem} />
          </div>
        </div>
          
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
