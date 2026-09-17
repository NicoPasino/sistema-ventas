import { useContext } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import { UserSettingsContext } from "../../context/userSettingsContext.jsx";
import { FormSearch } from "../../components/pages/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta.jsx";
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { Contenido } from './ContenidoTabla.jsx';

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
