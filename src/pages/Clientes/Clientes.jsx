import { useContext, useState } from "react";
import { FormSearch } from '../../components/pages/formSearch';
import { ModalEditarCliente } from "./modalEditarCliente";
import { ModalVerCliente } from "./ModalVerCliente";
import { TablaPaginada } from '../../components/pages/tablaPaginada';
import { Contenido } from './ContenidoTabla';
import { DataContext } from "../../context/dataContext";
import { usePopup } from '../../context/notificationContext.jsx';
import { CheckRes } from '../../utils/checkRes.js';
import { esActivo } from '../../utils/displayConvert.jsx';

export default function Clientes() {
  const { clientes } = useContext(DataContext);
  const { items, cambiarActivo, reloadItems } = clientes;
  const [idCliente, setIdCliente] = useState(); // editMode
  const [modalNew, setModalNew] = useState(false);
  const [clienteVer, setClienteVer] = useState();
  const { showPopup } = usePopup();

  const tableHeaders = ["Nombre", "Correo", "Telefono", "Documento", "Registrado", "Estado"];
  const ordenCampos = [
    { label: "Nombre", valor: (c) => c.nombre },
    { label: "Correo", valor: (c) => c.correo },
    { label: "Telefono", valor: (c) => c.telefono },
    { label: "Documento", valor: (c) => c.documento },
    { label: "Registrado", valor: (c) => c.fechaCreacion },
    { label: "Estado", valor: (c) => (esActivo(c.activo) ? 1 : 0) },
  ];

  function handleCloseModal() {
    setIdCliente();
    setModalNew(false);
  }

  async function handleCambiarActivo(documento, activo) {
    const res = await cambiarActivo(documento, activo);
    if (!res) return;
    CheckRes(res, { onSuccess: reloadItems, showPopup });
  }

  return (
    <div>
      <FormSearch tipo={"Cliente"} itemsManage={clientes} newItemHandle={ () => setModalNew(true) } ordenCampos={ordenCampos} mostrarEstado />
      <TablaPaginada
        items={items}
        itemsManage={clientes}
        headers={tableHeaders}
        editable
        clavePaginacion="clientes"
        renderFilas={(lista) => <Contenido lista={lista} setIdCliente={setIdCliente} setClienteVer={setClienteVer} cambiarActivo={handleCambiarActivo} />}
      />
      {clienteVer && (
        <ModalVerCliente
          cliente={clienteVer}
          onClose={() => setClienteVer()}
          onEditar={() => { setIdCliente(clienteVer.documento); setClienteVer(); }}
        />
      )}
      {(modalNew || idCliente) && (
        <ModalEditarCliente 
          id={idCliente}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
