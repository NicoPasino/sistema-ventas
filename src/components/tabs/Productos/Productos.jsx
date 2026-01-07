import { useItems } from '../../useItems';
import { FormSearch } from '../shared/formSearch';
import { useState } from "react";

import { productosAPI as itemsDB } from "../../../services/apiClient";
import { FormNuevoProducto } from "./formNuevoProducto";
import { TablaProductos } from "./tablaProductos";

export default function Productos() {
  const itemsManage = useItems({itemsDB}); // productosDB as itemsDB
  const [idProducto, setIdProducto] = useState(); // editMode
  
  return (
    !idProducto ? 
      <div>
        <FormSearch tipo={"Producto"} itemsManage={itemsManage} itemsDB={itemsDB}/>
        <TablaProductos itemsManage={itemsManage} setIdProducto={setIdProducto}/>
      </div>
    : <FormNuevoProducto id={idProducto} setIdProducto={setIdProducto} reload={itemsManage.recargarItems}/>
  )
}

export function Producto() {
  return <FormNuevoProducto />
}
