import { useContext } from 'react';
import { HomeIcon, ClientesIcon, ProductosIcon, VentasIcon, NewIcon } from './icons';
import './nav.css'
import { UserSettingsContext } from '../context/userSettingsContext.jsx';

export function Nav() {
  const {getTab, handleTab} = useContext(UserSettingsContext)

  function handleTabClick(name, disabled){
    if (!disabled) handleTab(name);
  }
    
  function Tab ({name, customName, children, disabled = false}) {
    const styleCurrentTab = (getTab === name ? 'currentTab': '');
    const styleDisabled = (disabled ? 'disabled' : '');

    return (
      <li className={`${styleCurrentTab} ${styleDisabled}`} onClick={() => handleTabClick(name, disabled)}>
        {children}
        {customName || name}
      </li>
    )
  }

  return (
    <div className='nav'>
      <div className='navHead'>
        <h3>Menú</h3>
      </div>

      <dl>
        {/* Inicio */}
        <dt>
          <Tab name={"Inicio"}> <HomeIcon /> </Tab>
        </dt>

        {/* Productos */}
        <dt>
          <Tab name={"Productos"}> <ProductosIcon /> </Tab>
        </dt>
        <dd>
          {/* <Tab name={"Producto"}> <NewIcon /> </Tab> */}
          {/* <Tab name={"Proveedores"} disabled> <ProveedoresIcon /> </Tab> */}
        </dd>

        {/* Ventas */}
        <dt>
          <Tab name={"Ventas"}> <VentasIcon /> </Tab>
        </dt>
        <dd>
          <Tab customName={"Nueva Venta"} name={"Venta"}> <NewIcon /> </Tab>
        </dd>

        {/* Clientes */}
        <dt>
          <Tab name={"Clientes"}> <ClientesIcon /> </Tab>
        </dt>

        {/* Reportes */}
        {/* <dt>
          <Tab name={"Reportes"} disabled> <ReportesIcon /> </Tab>
        </dt> */}
      </dl>
    </div>
  )
}
