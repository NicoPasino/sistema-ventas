import { useContext, useState } from 'react';
import { HomeIcon, ClientesIcon, ProductosIcon, VentasIcon, NewIcon, MenuIcon } from '../../assets/icons.jsx';
import './sidebar.css'
import { UserSettingsContext } from '../../context/userSettingsContext.jsx';

export function Sidebar() {
  const {getTab, handleTab} = useContext(UserSettingsContext)
  const [isOpen, setIsOpen] = useState(true)

  function handleTabClick(name, disabled){
    if (!disabled) handleTab(name);
  }
    
  function Tab ({name, customName, children, disabled = false}) {
    const styleCurrentTab = (getTab === name ? 'currentTab': '');
    const styleDisabled = (disabled ? 'disabled' : '');

    return (
      <li className={`${styleCurrentTab} ${styleDisabled}`} onClick={() => handleTabClick(name, disabled)}>
        {children}
        <span>{customName || name}</span>
      </li>
    )
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button type="button" className="sidebarToggle" onClick={() => setIsOpen(!isOpen)} title={isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'}>
        {isOpen && <h3 className="sidebarHead">Menu</h3>}
        <MenuIcon isOpen={isOpen} />
      </button>
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