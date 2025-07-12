import { ventasDB as itemsDB } from "../../../database/db";
import { TablaList } from "../shared/tablaList";
import { useItems } from "../../useItems";
import { FormSearch } from "../shared/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta";

export default function Ventas() {
  const itemsManage = useItems({itemsDB}); // ventasDB as itemsDB

  return (
    <div className="ventas">
      <FormSearch tipo={"Venta"} itemsManage={itemsManage} itemsDB={itemsDB} />
      <TablaList tipo={"ventas"} itemsManage={itemsManage}/>
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}
