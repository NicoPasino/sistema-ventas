import './header.css'
import { MenuIcon } from './icons'

export function Header({tabName, usuario, menu}) {  
  return (
    <div className='header'>
      <div className='headerLeft'>
        <MenuIcon menu={menu} />
        <p>SISTEMA DE VENTAS - <span className='tabName'>{tabName}</span></p>
      </div>
      <p> Hola, <span className="userName">{usuario} 😃</span> </p>
    </div>
  )
}