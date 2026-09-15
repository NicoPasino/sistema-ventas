import { DataContext } from '../../../context/DataContext';
import { useContext, useRef } from 'react';
import { usePopup } from '../../../context/PopupContext';
import { Button } from '../../shared/botones';
import { Modal } from '../../shared/Modal';
import '../Productos/modalProducto.css';
import { CheckRes } from '../../../utils/checkRes';
import { NuevoCliente } from './nuevoCliente';
import { useAlert } from '../../../context/AlertContext';
import { Alert } from '../../shared/Alert';

export function ModalEditarCliente({ id, onClose }) {
  const { clientes } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = clientes;
  const { showPopup } = usePopup();
  const nuevoClienteRef = useRef(null);
  const { showAlert, hideAlert } = useAlert();

  const handleClose = () => { onClose?.(); hideAlert();};
  const onSuccess = () => { reloadItems(); handleClose(); hideAlert() };
  const onShowAlert = (type, message) => showAlert({ type, message });

  async function handleSubmit() {
    if (!nuevoClienteRef.current?.validate()) {
      return showPopup?.({ type: 'warning', message: 'Verificar los datos antes de continuar.' });
    }

    const nuevoItem = nuevoClienteRef.current?.getData();
    const nuevoDato = { ...nuevoItem, IdPublica: id };
    const res = id ? await actualizar({ nuevoDato }) : await agregar({ nuevoItem });

    CheckRes(res, { onSuccess, showPopup, onMessage: onShowAlert });
  }

  return (
    <Modal
      title={id ? "Editar Cliente" : "Nuevo Cliente"}
      onClose={handleClose}
    >
      <Alert />
      <NuevoCliente id={id} obtenerItem={obtenerItem} ref={nuevoClienteRef}/>

      <div className="modal-footer">
        <Button type="button" variant="danger" onClick={handleClose}>Cancelar</Button>
        <Button type="button" variant="success" onClick={handleSubmit}>Confirmar</Button>
      </div>
    </Modal>
  );
}
