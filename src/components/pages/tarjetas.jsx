import { useContext } from 'react'
import './tarjetas.css'
import { UserSettingsContext } from '../../context/userSettingsContext'
import { GoToIcon } from '../../assets/icons';

export function TarjetaBlanca ({title, children, footer}) {
  const {handleTab} = useContext(UserSettingsContext)

  return (
    <div className="tarjetaBlanca">
      <h2 className='tarjetaBlancaHeader'>{title}</h2>
      <div className="tarjetaBlancaBody">
        {children}
        {footer &&
          <p className='tarjetaBlancaFooter'>
            <i className='iconEdit svgView' onClick={() => handleTab(footer)} title={"ir a " + footer}> <GoToIcon/> </i>
          </p>
        }
      </div>
    </div>
  )
}

export function HeaderCard ({title, subtitle}) {
  return (
    <div className="headerCard">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export function TarjetaInfo ({text, number, color, svg, onClick}) {
  return (
    <div className={"tarjetaInfo" + (onClick ? " pointer" : "")} onClick={onClick}>
      <div className="tarjetaInfoIcon" style={{ backgroundColor: color }}>
        {svg}
      </div>
      <div className="tarjetaInfoContent">
        <div className="tarjetaInfoNumber">{number}</div>
        <div className="tarjetaInfoText">{text}</div>
      </div>
    </div>
  )
}

