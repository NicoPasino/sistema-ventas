import Inicio from "./Inicio";
import Clientes from "./Clientes";
import Productos from "./Productos";
import Ventas from "./Ventas";
import Reportes from "./Reportes";

const componentes = {
  Inicio: <Inicio />,
  Clientes: <Clientes />,
  Productos: <Productos />,
  Ventas: <Ventas />,
  Reportes: <Reportes />,
  NotFound: <h1>Vista no encontrada</h1>
};

export function Main ({vista}) {
  return (
    <main>
      {componentes[vista] || componentes["NotFound"] }
    </main>
  );
}