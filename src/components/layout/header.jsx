import { useContext } from 'react'
import { UserSettingsContext } from '../../context/userSettingsContext.jsx'
import './header.css'

export function Header() {
  const {getUser, getTab} = useContext(UserSettingsContext)

  return (
    <div className='header'>
      <div className='headerLeft'>
        <p>SISTEMA DE VENTAS - <span className='tabName'>{getTab}</span></p>
      </div>
      <p> Hola, <span className="userName">{getUser} 😃</span> </p>
    </div>
  )
}