import { useContext } from 'react'
import './tarjetas.css'
import { UserSettingsContext } from '../../../userSettingsContext'
import { GoToIcon } from '../../icons';

export function TarjetaBlanca ({title, text, children, footer}) {
  const {handleTab} = useContext(UserSettingsContext)

  return (
    <div className="tarjetaBlanca">
      <h2 className='tarjetaBlancaHeader'>{title}</h2>
      <p>{text}</p>
      {children}
      { footer && 
        <p className='tarjetaBlancaFooter'>
          <i className='iconEdit svgView' onClick={() => handleTab(footer)} title={"ir a " + footer}> <GoToIcon/> </i>
        </p>
      }
    </div>
  )
}