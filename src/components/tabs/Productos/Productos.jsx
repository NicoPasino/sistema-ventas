import { productosDB as itemsDB } from "../../../database/db";
import { TablaList } from "../shared/tablaList";
import { useItems } from '../../useItems';
import { FormSearch } from '../shared/formSearch';
import { FormNuevoProducto } from "./formNuevoProducto";

export default function Productos() {
  const { items, agregar, eliminar, recargarItems } = useItems({itemsDB}); // productosDB as itemsDB
  
  return (
    <div className="productos">
      <FormSearch tipo={"Producto"} props={{itemsDB, agregar, recargarItems}}/>
      <TablaList tipo={"productos"} lista={items} acciones={{eliminar}}/>
    </div>
  )
}

export function Producto() {
  return <FormNuevoProducto />
}