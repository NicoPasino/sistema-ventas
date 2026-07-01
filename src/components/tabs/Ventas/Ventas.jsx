import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { UserSettingsContext } from "../../../context/userSettingsContext.jsx";
import { FormSearch } from "../shared/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';

export default function Ventas() {
  const { ventas } = useContext(DataContext);
  const { items } = ventas;
  const { handleTab } = useContext(UserSettingsContext);

  const tableHeaders = ["Código", "Cliente", "Productos", "Fecha", "Total"];

  return (
    <div className="ventas">
      <FormSearch tipo={"Venta"} itemsManage={ventas} newItemHandle={() => handleTab("Venta")} />
      <TablaGenerica
        itemsManage={ventas}
        headers={tableHeaders}
      >
        <Contenido lista={items} />
      </TablaGenerica>
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}
