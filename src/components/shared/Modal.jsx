import { useRef } from 'react';
import './modal.css';

export function Modal({ title, onClose, children, footer }) {
  const isMouseDownOnOverlay = useRef(false);

  return (
    <div 
      className="modal-overlay" 
      onMouseDown={(e) => {
        isMouseDownOnOverlay.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (isMouseDownOnOverlay.current && e.target === e.currentTarget) {
          onClose();
        }
        isMouseDownOnOverlay.current = false;
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">
          &times;
        </button>
        
        <div className="modal-header">
          <h2>{title}</h2>
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
