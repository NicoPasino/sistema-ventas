import './modalProducto.css';
import { DataContext } from '../../../context/DataContext';
import { useContext, useRef } from 'react';
import { NuevoProducto } from './nuevoProducto';
import { usePopup } from '../../../context/PopupContext';
import { Button } from '../../shared/botones';
import { Modal } from '../../shared/Modal';
import { ImageIcon } from '../../icons';
import { CheckRes } from '../../../utils/checkRes';
import { Alert } from '../../shared/Alert';
import { useAlert } from '../../../context/AlertContext';

export function ModalEditarProducto({id, setIdProducto}) {
  const { productos } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = productos;
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

    const nuevoItem = nuevoProductoRef.current?.getData();
    const nuevoDato = { ...nuevoItem, IdPublica: id };
    const res = id ? await actualizar({ nuevoDato }) : await agregar({ nuevoItem });

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
          <NuevoProducto id={id} obtenerItem={obtenerItem} ref={nuevoProductoRef}/>
        </div>
      </div>
        
      <div className="modal-footer">
        <Button type="button" variant="danger" onClick={handleClose}>Cancelar</Button>
        <Button type="button" variant="success" onClick={handleSubmit}>Confirmar</Button>
      </div>
    </Modal>
  )
}
