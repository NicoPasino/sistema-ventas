import { productosDB as itemsDB } from "../../../database/db";
import { TablaList } from "../shared/tablaList";
import { useItems } from '../../useItems';
import { FormSearch } from '../shared/formSearch';
import { FormNuevoProducto } from "./formNuevoProducto";

export default function Productos() {
  const itemsManage = useItems({itemsDB}); // productosDB as itemsDB
  
  return (
    <div className="productos">
      <FormSearch tipo={"Producto"} itemsManage={itemsManage} itemsDB={itemsDB}/>
      <TablaList tipo={"productos"} lista={itemsManage.items} acciones={{itemsManage}}/>
    </div>
  )
}

export function Producto() {
  return <FormNuevoProducto />
}