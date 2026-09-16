import { useContext } from 'react';
import { HomeIcon, ClientesIcon, ProductosIcon, VentasIcon, NewIcon } from '../assets/icons.jsx';
import './nav.css'
import { UserSettingsContext } from '../context/userSettingsContext.jsx';

export function Nav({ isOpen }) {
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
    <div className={`${isOpen ? 'nav' : 'navDisabled'}`}>
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
      </dl>
    </div>
  )
}
