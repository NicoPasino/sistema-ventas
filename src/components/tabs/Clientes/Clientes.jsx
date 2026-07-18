import { useContext, useState } from "react";
import { FormSearch } from '../shared/formSearch';
import { ModalEditarCliente } from "./modalEditarCliente";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';
import { DataContext } from "../../../context/DataContext";

export default function Clientes() {
  const { clientes } = useContext(DataContext);
  const { items } = clientes;
  const [idCliente, setIdCliente] = useState(); // editMode
  const [modalNew, setModalNew] = useState(false);
  
  const tableHeaders = ["Documento", "Nombre", "Correo"];

  function handleCloseModal() {
    setIdCliente();
    setModalNew(false);
  }

  return (
    <div>
      <FormSearch tipo={"Cliente"} itemsManage={clientes} newItemHandle={ () => setModalNew(true) } />
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
