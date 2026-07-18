import { DataContext } from '../../../context/DataContext';
import { useContext, useRef } from 'react';
import { usePopup } from '../../../context/PopupContext';
import { Button } from '../../shared/botones';
import { Modal } from '../../shared/Modal';
import '../Productos/modalProducto.css';
import { CheckRes } from '../../../utils/checkRes';
import { NuevoCliente } from './nuevoCliente';

export function ModalEditarCliente({ id, onClose }) {
  const { clientes } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = clientes;
  const { showPopup } = usePopup();
  const nuevoClienteRef = useRef(null);

  const handleClose = () => onClose?.();
  const handleDone = () => {
    reloadItems();
    handleClose();
  }
  
  async function handleSubmit() {
    const nuevoItem = nuevoClienteRef.current?.getData();

    // Modificar
    if (id) {
      const nuevoDato = { ...nuevoItem, IdPublica: id };
      let res = await actualizar({ nuevoDato });
      CheckRes(res, { onSuccess: handleDone, showPopup })
    } 
    // Agregar
    else {
      let res = await agregar({ nuevoItem });
      CheckRes(res, { onSuccess: handleDone, showPopup })
    }
  }

  return (
    <Modal
      title={id ? "Editar Cliente" : "Nuevo Cliente"}
      onClose={handleClose}
    >
      <NuevoCliente id={id} obtenerItem={obtenerItem} ref={nuevoClienteRef}/>

      <div className="modal-footer">
        <Button type="button" variant="danger" onClick={handleClose}>Cancelar</Button>
        <Button type="button" variant="success" onClick={handleSubmit}>Confirmar</Button>
      </div>
    </Modal>
  );
}
