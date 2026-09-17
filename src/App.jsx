import { useContext } from 'react';
import { UserSettingsContext } from './context/userSettingsContext';
import MainLayout from './layouts/MainLayout';
import Inicio from './pages/Inicio/Inicio';
import NotFound from './pages/Inicio/NotFound';
import Clientes from './pages/Clientes/Clientes';
import Productos from './pages/Productos/Productos';
import Ventas, {Venta} from './pages/Ventas/Ventas';

const componentes = {
  Inicio: <Inicio />,
  Clientes: <Clientes />,
  Productos: <Productos />,
  Venta: <Venta />,
  Ventas: <Ventas />,
  NotFound: <NotFound />
};

export default function App() {
  const {getTab} = useContext(UserSettingsContext)
  
  return (
    <div className='view'>
      <MainLayout>
        {componentes[getTab] || componentes.NotFound }
      </MainLayout>
    </div>
  )
}
