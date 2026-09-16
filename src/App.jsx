import { useContext, useState } from 'react';
import { UserSettingsContext } from './context/userSettingsContext';
import { Header } from './components/header';
import { Nav } from './components/nav';
import Inicio from './components/tabs/Inicio/Inicio';
import NotFound from './components/tabs/Inicio/NotFound';
import Clientes from './components/tabs/Clientes/Clientes';
import Productos from './components/tabs/Productos/Productos';
import Ventas, {Venta} from './components/tabs/Ventas/Ventas';

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
  const [statusMenu, setStatusMenu] = useState(true)
  
  return (
    <div className='view'>
      <Nav isOpen={statusMenu}/>
      <div className="body">
        <Header menu={{statusMenu, setStatusMenu}}/>
        <main>{componentes[getTab] || componentes.NotFound }</main>
      </div>
    </div>
  )
}
