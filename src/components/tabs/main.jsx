import Inicio from "./Inicio";
import Clientes from "./Clientes";
import Productos, { Producto } from "./Productos/Productos.jsx";
import Ventas, { Venta } from "./Ventas/Ventas.jsx";
import Reportes from "./Reportes";
import { useContext } from "react";
import { UserSettingsContext } from "../../userSettingsContext.jsx";
import Proveedores from "./Proveedores.jsx";

const componentes = {
  Inicio: <Inicio />,
  Clientes: <Clientes />,
  Productos: <Productos />,
  Producto: <Producto />,
  Ventas: <Ventas />,
  Venta: <Venta />,
  Proveedores: <Proveedores />,
  Reportes: <Reportes />,
  NotFound: <h1>Vista no encontrada</h1>
};

export function Main () {
  const {getTab} = useContext(UserSettingsContext)
  return (
    <main>
      {componentes[getTab] || componentes["NotFound"] }
    </main>
  );
}