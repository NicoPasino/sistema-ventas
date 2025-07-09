import { useContext } from 'react'
import { UserSettingsContext } from '../userSettingsContext.jsx'
import './header.css'
import { MenuIcon } from './icons'

export function Header({ menu }) {
  const {getUser, getTab} = useContext(UserSettingsContext)

  return (
    <div className='header'>
      <div className='headerLeft'>
        <MenuIcon menu={menu} />
        <p>SISTEMA DE VENTAS - <span className='tabName'>{getTab}</span></p>
      </div>
      <p> Hola, <span className="userName">{getUser} 😃</span> </p>
    </div>
  )
}