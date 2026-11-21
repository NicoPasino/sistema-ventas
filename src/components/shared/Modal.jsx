import { useRef } from 'react';
import './modal.css';

const TOLERANCIA_CLIC_PX = 4;

export function Modal({ title, onClose, children, footer, className = '', headerAcciones = null }) {
  const inicioClicOverlay = useRef(null);

  return (
    <div 
      className="modal-overlay" 
      onMouseDown={(e) => {
        inicioClicOverlay.current = e.target === e.currentTarget
          ? { x: e.clientX, y: e.clientY }
          : null;
      }}
      onClick={(e) => {
        const inicio = inicioClicOverlay.current;
        inicioClicOverlay.current = null;

        if (!inicio || e.target !== e.currentTarget) return;

        const mismoPunto =
          Math.abs(inicio.x - e.clientX) < TOLERANCIA_CLIC_PX &&
          Math.abs(inicio.y - e.clientY) < TOLERANCIA_CLIC_PX;

        if (mismoPunto) onClose();
      }}
    >
      <div className={`modal-content ${className}`.trim()} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">
          &times;
        </button>
        
        <div className={`modal-header ${headerAcciones ? "conAcciones" : ""}`.trim()}>
          <h2>{title}</h2>
          {headerAcciones && <div className="modal-header-acciones">{headerAcciones}</div>}
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
