import { useContext } from 'react'
import './tarjetas.css'
import { UserSettingsContext } from '../../context/userSettingsContext'

const TONOS = {
  primary: 'var(--colorPrimary)',
  success: 'var(--colorSuccess)',
  info: 'var(--colorInfo)',
  warning: 'var(--colorWarning)',
  danger: 'var(--colorDanger)',
  secondary: 'var(--colorSecondary)',
};

const INTERACTIVO = 'button, a, input, select, textarea, [role="button"], [role="link"]';

export function TarjetaBlanca({ title, children, tab, acciones }) {
  const { handleTab } = useContext(UserSettingsContext)
  const navegable = Boolean(tab);

  const irATab = () => {
    if (navegable) handleTab(tab);
  };

  const handleClick = (e) => {
    if (!navegable) return;
    const interactivo = e.target.closest(INTERACTIVO);
    if (interactivo && interactivo !== e.currentTarget) return;
    irATab();
  };

  const handleKeyDown = (e) => {
    if (!navegable) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      irATab();
    }
  };

  return (
    <div
      className={`tarjetaBlanca${navegable ? ' tarjetaBlancaNavegable' : ''}`}
      onClick={navegable ? handleClick : undefined}
      onKeyDown={navegable ? handleKeyDown : undefined}
      role={navegable ? 'link' : undefined}
      tabIndex={navegable ? 0 : undefined}
    >
      <div className="tarjetaBlancaTop">
        <h2 className='tarjetaBlancaHeader'>{title}</h2>
        {acciones && <div className="tarjetaBlancaAcciones">{acciones}</div>}
      </div>
      <div className="tarjetaBlancaBody">
        {children}
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
