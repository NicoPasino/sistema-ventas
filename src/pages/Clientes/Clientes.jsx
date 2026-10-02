import { useContext, useState } from "react";
import { FormSearch } from '../../components/pages/formSearch';
import { ModalEditarCliente } from "./modalEditarCliente";
import { ModalVerCliente } from "./ModalVerCliente";
import { TablaPaginada } from '../../components/pages/tablaPaginada';
import { Contenido } from './ContenidoTabla';
import { DataContext } from "../../context/dataContext";

export default function Clientes() {
  const { clientes } = useContext(DataContext);
  const { items } = clientes;
  const [idCliente, setIdCliente] = useState(); // editMode
  const [modalNew, setModalNew] = useState(false);
  const [clienteVer, setClienteVer] = useState();

  const tableHeaders = ["Nombre", "Correo", "Telefono", "Documento", "Registrado"];
  const ordenCampos = [
    { label: "Nombre", valor: (c) => c.nombre },
    { label: "Correo", valor: (c) => c.correo },
    { label: "Telefono", valor: (c) => c.telefono },
    { label: "Documento", valor: (c) => c.documento },
    { label: "Registrado", valor: (c) => c.fechaCreacion },
  ];

  function handleCloseModal() {
    setIdCliente();
    setModalNew(false);
  }

  return (
    <div>
      <FormSearch tipo={"Cliente"} itemsManage={clientes} newItemHandle={ () => setModalNew(true) } ordenCampos={ordenCampos} />
      <TablaPaginada
        items={items}
        itemsManage={clientes}
        headers={tableHeaders}
        editable
        clavePaginacion="clientes"
        renderFilas={(lista) => <Contenido lista={lista} setIdCliente={setIdCliente} setClienteVer={setClienteVer} />}
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
