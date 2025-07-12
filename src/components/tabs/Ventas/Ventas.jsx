import { ventasDB as itemsDB } from "../../../database/db";
import { useItems } from "../../useItems";
import { FormSearch } from "../shared/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta";
import { TablaVentas } from "./tablaVentas";

export default function Ventas() {
  const itemsManage = useItems({itemsDB}); // ventasDB as itemsDB

  return (
    <div className="ventas">
      <FormSearch tipo={"Venta"} itemsManage={itemsManage} itemsDB={itemsDB} />
      <TablaVentas itemsManage={itemsManage}/>
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}
