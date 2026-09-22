import { useContext, useState } from "react";
import { FormSearch } from '../../components/pages/formSearch';
import { ModalEditarCliente } from "./modalEditarCliente";
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { Contenido } from './ContenidoTabla';
import { DataContext } from "../../context/dataContext";

export default function Clientes() {
  const { clientes } = useContext(DataContext);
  const { items } = clientes;
  const [idCliente, setIdCliente] = useState(); // editMode
  const [modalNew, setModalNew] = useState(false);

  const tableHeaders = ["Nombre", "Correo", "Documento", "Registrado"];
  const ordenCampos = [
    { label: "Nombre", valor: (c) => c.nombre },
    { label: "Correo", valor: (c) => c.correo },
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
      <TablaGenerica itemsManage={clientes} headers={tableHeaders} >
        <Contenido lista={items} />
      </TablaGenerica>
      {(modalNew || idCliente) && (
        <ModalEditarCliente 
          id={idCliente}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
