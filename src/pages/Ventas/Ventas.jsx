import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { UserSettingsContext } from "../../context/userSettingsContext.jsx";
import { FormSearch } from "../../components/pages/formSearch";
import { FormNuevaVenta } from "./formNuevaVenta.jsx";
import { TablaPaginada } from '../../components/pages/tablaPaginada';
import { Contenido } from './ContenidoTabla.jsx';
import { ModalVerVenta } from './ModalVerVenta.jsx';

export default function Ventas() {
  const { ventas } = useContext(DataContext);
  const { items } = ventas;
  const { handleTab } = useContext(UserSettingsContext);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const tableHeaders = ["Número", "Cliente", "Productos", "Detalles", "Fecha", "Total"];
  const ordenCampos = [
    { label: "Número", valor: (v) => v.numero },
    { label: "Cliente", valor: (v) => v.cliente?.nombre ?? "" },
    { label: "Productos", valor: (v) => (v.productos || []).reduce((t, p) => t + (p.cantidad || 0), 0) },
    { label: "Detalles", valor: (v) => v.detalle },
    { label: "Fecha", valor: (v) => v.fechaVenta },
    { label: "Total", valor: (v) => (v.productos || []).reduce((t, p) => t + (p.subTotal || 0), 0) },
  ];

  return (
    <div>
      <FormSearch tipo={"Venta"} itemsManage={ventas} newItemHandle={() => handleTab("Venta")} ordenCampos={ordenCampos} />
      <TablaPaginada
        items={items}
        itemsManage={ventas}
        headers={tableHeaders}
        editable
        clavePaginacion="ventas"
        renderFilas={(lista) => <Contenido lista={lista} setVenta={setVentaSeleccionada} />}
      />
      {ventaSeleccionada && (
        <ModalVerVenta venta={ventaSeleccionada} onClose={() => setVentaSeleccionada(null)} />
      )}
    </div>
  )
}

export function Venta() {
  return <FormNuevaVenta />
}
