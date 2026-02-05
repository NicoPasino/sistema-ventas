import { clientesAPI as itemsDB } from "../../../services/apiClient";
import { useItems } from '../../../Hooks/useItems';
import { useState } from "react";
import { FormSearch } from '../shared/formSearch';
import { FormNuevoCliente } from "./formNuevoCliente";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';


export default function Clientes() {
  const itemsManage = useItems({itemsDB}); // clientesAPI as itemsDB
  const {items} = itemsManage;
  const [idCliente, setIdCliente] = useState(); // editMode
  
  const tableHeaders = ["", "Nombre", "Correo", "Documento"];

  return (
    !idCliente ? 
      <div>
        <FormSearch tipo={"Cliente"} itemsManage={itemsManage} itemsDB={itemsDB}/>
        <TablaGenerica 
          itemsManage={itemsManage} 
          headers={tableHeaders}
          Contenido={<Contenido lista={items} />}
        />
      </div>
    : <FormNuevoCliente id={idCliente} setIdCliente={setIdCliente} reload={itemsManage.recargarItems}/>
  )
}

export function Cliente() {
  return <FormNuevoCliente />
}
