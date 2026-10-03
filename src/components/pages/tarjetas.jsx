import { useContext } from 'react'
import './tarjetas.css'
import { UserSettingsContext } from '../../context/userSettingsContext'
import { GoToIcon } from '../../assets/icons';
import { IconButton } from '../shared/botones';

export function TarjetaBlanca ({title, children, tab}) {
  const {handleTab} = useContext(UserSettingsContext)

  return (
    <div className="tarjetaBlanca">
      <h2 className='tarjetaBlancaHeader'>{title}</h2>
      <div className="tarjetaBlancaBody">
        {children}
        {tab &&
          <p className='tarjetaBlancaFooter'>
            <IconButton variant="secondary" size="md" title={"Ir a " + tab} onClick={() => handleTab(tab)}> <GoToIcon/> </IconButton>
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

export function TarjetaInfo ({text, number, detalle, color, svg, onClick}) {
  const contenido = (
    <>
      <div className="tarjetaInfoIcon" style={{ backgroundColor: color }}>
        {svg}
      </div>
      <div className="tarjetaInfoContent">
        <div className="tarjetaInfoNumber">
          {number}
          {detalle && <span className="tarjetaInfoDetalle">{detalle}</span>}
        </div>
        <div className="tarjetaInfoText">{text}</div>
      </div>
    </>
  );

  if (!onClick) return <div className="tarjetaInfo">{contenido}</div>;

  return (
    <button type="button" className="tarjetaInfo pointer" onClick={onClick}>
      {contenido}
    </button>
  )
}

