import { useContext } from 'react'
import './tarjetas.css'
import { UserSettingsContext } from '../../../userSettingsContext'

export function TarjetaBlanca ({title, text, children, footer}) {
  const {handleTab} = useContext(UserSettingsContext)

  return (
    <div className="tarjetaBlanca">
      <h2 className='tarjetaBlancaHeader'>{title}</h2>
      <p>{text}</p>
      {children}
      {footer && <p className='tarjetaBlancaFooter' onClick={() => handleTab(footer)}>ir a {footer}</p>}
    </div>
  )
}