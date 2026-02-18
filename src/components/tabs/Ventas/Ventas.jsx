import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { FormSearch } from "../shared/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';

export default function Ventas() {
  const { ventas } = useContext(DataContext);
  const { items } = ventas;

  const tableHeaders = ["Código", "Cliente", "Productos", "Fecha", "Total"];

  return (
    <div className="ventas">
      <FormSearch tipo={"Venta"} itemsManage={ventas} />
      <TablaGenerica 
        itemsManage={ventas} 
        headers={tableHeaders}
        Contenido={<Contenido lista={items} />}
      />
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}
