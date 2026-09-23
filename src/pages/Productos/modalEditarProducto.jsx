import '../../components/pages/modals.css';
import { DataContext } from '../../context/dataContext';
import { useContext, useRef } from 'react';
import { NuevoProducto } from './nuevoProducto';
import { usePopup } from '../../context/notificationContext';
import { Button } from '../../components/shared/botones';
import { Modal } from '../../components/shared/Modal';
import { ImageIcon } from '../../assets/icons';
import { CheckRes } from '../../utils/checkRes';
import { Alert } from '../../components/notification/Alert';
import { useAlert } from '../../context/notificationContext';

export function ModalEditarProducto({id, setIdProducto}) {
  const { productos } = useContext(DataContext);
  const { agregar, actualizar, reloadItems } = productos;
  const { showPopup } = usePopup();
  const nuevoProductoRef = useRef(null);
  const { showAlert, hideAlert } = useAlert();

  const handleClose = () => { setIdProducto?.(); hideAlert();}
  const onShowAlert = (type, message) => showAlert({ type, message });
  const onSuccess = () => { reloadItems(); handleClose(); }

  async function handleSubmit() {
    if (!nuevoProductoRef.current?.validate()) {
      return showPopup?.({ type: 'warning', message: 'Verificar los datos antes de continuar.' });
    }

    if (id) {
      const cambios = nuevoProductoRef.current?.getCambios();
      if (!cambios || Object.keys(cambios).length === 0) {
        return showPopup?.({ type: 'info', message: 'No se detectaron cambios.' });
      }
      const res = await actualizar({ nuevoDato: { ...cambios, IdPublica: id } });
      return CheckRes(res, { onSuccess, showPopup, onMessage: onShowAlert });
    }

    const nuevoItem = nuevoProductoRef.current?.getData();
    const res = await agregar({ nuevoItem });

    CheckRes(res, { onSuccess, showPopup, onMessage: onShowAlert });
  }

  return (
    <Modal 
      title={id ? "Editar Producto" : "Nuevo Producto"} 
      onClose={handleClose}
    >
      <Alert />
      <div className="modal-body-layout">
        {/* <div className="modal-image-section">
          <div className="image-placeholder">
            <ImageIcon />
            <span>Agregar imagen del producto</span>
          </div>
        </div> */}
        
        <div className="modal-form-section">
          <NuevoProducto id={id} ref={nuevoProductoRef}/>
        </div>
      </div>
        
      <div className="modal-footer">
        <Button type="button" variant="danger" onClick={handleClose}>Cancelar</Button>
        <Button type="button" variant="success" onClick={handleSubmit}>Confirmar</Button>
      </div>
    </Modal>
  )
}
