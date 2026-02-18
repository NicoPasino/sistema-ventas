import { useContext, useState } from "react";
import { FormSearch } from '../shared/formSearch';
import { FormNuevoCliente } from "./formNuevoCliente";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';
import { DataContext } from "../../../context/DataContext";


export default function Clientes() {
  const { clientes } = useContext(DataContext);
  const { items } = clientes;
  const [idCliente, setIdCliente] = useState(); // editMode
  
  const tableHeaders = ["Documento", "Nombre", "Correo"];

  return (
    !idCliente ? 
      <div>
        <FormSearch tipo={"Cliente"} itemsManage={clientes} />
        <TablaGenerica 
          itemsManage={clientes} 
          headers={tableHeaders}
          Contenido={<Contenido lista={items} />}
        />
      </div>
    : <FormNuevoCliente id={idCliente} setIdCliente={setIdCliente} reload={clientes.recargarItems}/> // sin uso
  )
}

export function Cliente() {
  return <FormNuevoCliente />
}
