import { ventasAPI as itemsDB } from "../../../services/apiClient";
import { useItems } from '../../../Hooks/useItems';
import { FormSearch } from "../shared/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';

export default function Ventas() {
  const itemsManage = useItems({itemsDB}); // ventasDB as itemsDB
  const {items} = itemsManage;

  const tableHeaders = ["Código", "Cliente", "Productos", "Fecha", "Total"];

  return (
    <div className="ventas">
      <FormSearch tipo={"Venta"} itemsManage={itemsManage} itemsDB={itemsDB} />
      <TablaGenerica 
        itemsManage={itemsManage} 
        headers={tableHeaders}
        Contenido={<Contenido lista={items} />}
      />
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}
