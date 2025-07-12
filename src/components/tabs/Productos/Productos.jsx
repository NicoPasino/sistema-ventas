import { productosDB as itemsDB } from "../../../database/db";
import { TablaList } from "../shared/tablaList";
import { useItems } from '../../useItems';
import { FormSearch } from '../shared/formSearch';
import { FormNuevoProducto } from "./formNuevoProducto";
import { useState } from "react";

export default function Productos() {
  const itemsManage = useItems({itemsDB}); // productosDB as itemsDB
  const [idProducto, setIdProducto] = useState(); // editMode
  
  return (
    !idProducto ? 
      <div>
        <FormSearch tipo={"Producto"} itemsManage={itemsManage} itemsDB={itemsDB}/>
        <TablaList tipo={"productos"} itemsManage={itemsManage} setIdProducto={setIdProducto}/>
      </div>
      : <FormNuevoProducto id={idProducto} setIdProducto={setIdProducto} reload={itemsManage.recargarItems}/>
  )
}

export function Producto() {
  return <FormNuevoProducto />
}