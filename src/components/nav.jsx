import { HomeIcon, ClientesIcon, ProductosIcon, VentasIcon, ReportesIcon } from './icons';
import './nav.css'

export function Nav({ tab }) {
  const {currentTab, handleTab} = tab
    
  function Li ({name, children}) {
    return (
      <li className={currentTab === name ? 'currentTab': ''} onClick={() => handleTab(name)}>
        {children}
        {name}
      </li>
    )
  }

  return (
    <div className='nav'>
      <div>
        <h3>Menú</h3>
      </div>
      <ul>
        <Li name={"Inicio"}> <HomeIcon /> </Li>
        {/* <Li name={"Clientes"}> <ClientesIcon /> </Li> */}
        <Li name={"Productos"}> <ProductosIcon /> </Li>
        {/* <Li name={"Ventas"}> <VentasIcon /> </Li> */}
        <Li name={"Reportes"}> <ReportesIcon /> </Li>
        {/* <Li name={"Reportes"}> <ReportesIcon /> </Li> */}
      </ul>
    </div>
  )
}
