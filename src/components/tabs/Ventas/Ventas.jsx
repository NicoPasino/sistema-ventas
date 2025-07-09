import { ventasDB as itemsDB } from "../../../database/db";
import { TablaList } from "../shared/tablaList";
import { useItems } from "../../useItems";
import { FormSearch } from "../shared/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta";

export default function Ventas() {
  const { items, agregar, eliminar, recargarItems } = useItems({itemsDB}); // ventasDB as itemsDB

  return (
    <div className="ventas">
      <FormSearch tipo={"Venta"} props={{itemsDB, agregar, recargarItems}}/>
      <TablaList tipo={"ventas"} lista={items} acciones={{eliminar}}/>
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}