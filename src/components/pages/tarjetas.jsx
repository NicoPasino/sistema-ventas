import { useContext } from 'react'
import './tarjetas.css'
import { UserSettingsContext } from '../../context/userSettingsContext'
import { GoToIcon } from '../../assets/icons';
import { IconButton } from '../shared/botones';

const TONOS = {
  primary: 'var(--colorPrimary)',
  success: 'var(--colorSuccess)',
  info: 'var(--colorInfo)',
  warning: 'var(--colorWarning)',
  danger: 'var(--colorDanger)',
  secondary: 'var(--colorSecondary)',
};

export function TarjetaBlanca({ title, children, tab, acciones }) {
  const { handleTab } = useContext(UserSettingsContext)

  return (
    <div className="tarjetaBlanca">
      <div className="tarjetaBlancaTop">
        <h2 className='tarjetaBlancaHeader'>{title}</h2>
        {acciones && <div className="tarjetaBlancaAcciones">{acciones}</div>}
      </div>
      <div className="tarjetaBlancaBody">
        {children}
        {tab &&
          <div className='tarjetaBlancaFooter'>
            <IconButton variant="secondary" size="md" title={"Ir a " + tab} onClick={() => handleTab(tab)}> <GoToIcon /> </IconButton>
          </div>
        }
      </div>
    </div>
  )
}

export function TarjetaInfo({ text, number, detalle, tono = 'primary', svg, onClick, tendencia, primaria = false }) {
  const contenido = (
    <>
      <div className="tarjetaInfoIcon" style={{ backgroundColor: TONOS[tono] ?? TONOS.primary }}>
        {svg}
      </div>
      <div className="tarjetaInfoContent">
        <div className="tarjetaInfoNumber">
          <span className="tarjetaInfoValor">{number}</span>
          {detalle && <span className="tarjetaInfoDetalle">{detalle}</span>}
        </div>
        <div className="tarjetaInfoText">{text}</div>
        {tendencia && (
          <span className={`tarjetaInfoTendencia ${tendencia.direccion}`} title={tendencia.titulo}>
            {tendencia.texto}
          </span>
        )}
      </div>
    </>
  );

  const clase = ['tarjetaInfo', primaria && 'tarjetaInfoPrimaria', onClick && 'pointer'].filter(Boolean).join(' ');

  if (!onClick) return <div className={clase}>{contenido}</div>;

  return (
    <button type="button" className={clase} onClick={onClick} aria-label={`${text}: ${number}`}>
      {contenido}
    </button>
  )
}
