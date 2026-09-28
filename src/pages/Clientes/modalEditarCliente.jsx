import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../context/dataContext';
import { usePopup } from '../../context/notificationContext';
import { Button } from '../../components/shared/botones';
import { Modal } from '../../components/shared/Modal';
import '../../components/pages/modals.css';
import { CheckRes } from '../../utils/checkRes';
import { NuevoCliente } from './nuevoCliente';
import { useAlert } from '../../context/notificationContext';
import { Alert } from '../../components/notification/Alert';

export function ModalEditarCliente({ id, onClose }) {
  const { clientes } = useContext(DataContext);
  const { agregar, actualizar, reloadItems } = clientes;
  const { showPopup } = usePopup();
  const nuevoClienteRef = useRef(null);
  const { showAlert, hideAlert } = useAlert();
  const [enviando, setEnviando] = useState(false);

  const handleClose = () => { onClose?.(); hideAlert();};
  const handleModalClose = () => { if (!enviando) handleClose(); };
  const onSuccess = () => { reloadItems(); handleClose(); hideAlert() };
  const onShowAlert = (type, message) => showAlert({ type, message });

  async function handleSubmit() {
    if (enviando) return;
    if (!nuevoClienteRef.current?.validate()) {
      return showPopup?.({ type: 'warning', message: 'Verificar los datos antes de continuar.' });
    }

    setEnviando(true);
    try {
      const nuevoItem = nuevoClienteRef.current?.getData();
      const nuevoDato = { ...nuevoItem, IdPublica: id };
      const res = id ? await actualizar({ nuevoDato }) : await agregar({ nuevoItem });

      CheckRes(res, { onSuccess, showPopup, onMessage: onShowAlert });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Modal
      title={id ? "Editar Cliente" : "Nuevo Cliente"}
      onClose={handleModalClose}
    >
      <Alert />
      <NuevoCliente id={id} ref={nuevoClienteRef}/>

      <div className="modal-footer">
        <Button type="button" variant="danger" disabled={enviando} onClick={handleClose}>Cancelar</Button>
        <Button type="button" variant="success" loading={enviando} loadingText="Enviando..." onClick={handleSubmit}>Confirmar</Button>
      </div>
    </Modal>
  );
}
