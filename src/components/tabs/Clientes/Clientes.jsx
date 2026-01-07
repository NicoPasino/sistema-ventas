import { useItems } from '../../useItems';
// import { FormSearch } from '../shared/formSearch';
import { useState } from "react";

import { clientesAPI as itemsDB } from "../../../services/apiClient";
import { FormNuevoCliente } from "./formNuevoCliente";
import { TablaClientes } from "./tablaClientes";

export default function Clientes() {
  const itemsManage = useItems({itemsDB}); // clientesAPI as itemsDB
  const [idCliente, setIdCliente] = useState(); // editMode
  
  return (
    !idCliente ? 
      <div>
        {/* <FormSearch tipo={"Cliente"} itemsManage={itemsManage} itemsDB={itemsDB}/> */}
        <TablaClientes itemsManage={itemsManage} setIdCliente={setIdCliente}/>
      </div>
    : <FormNuevoCliente id={idCliente} setIdCliente={setIdCliente} reload={itemsManage.recargarItems}/>
  )
}

export function Cliente() {
  return <FormNuevoCliente />
}
