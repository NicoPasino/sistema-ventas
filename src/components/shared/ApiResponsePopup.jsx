import React, { useEffect } from 'react';
import './apiResponsePopup.css';

// hecho con IA

export function ApiResponsePopup({ response, onClose }) {
  useEffect(() => {
    if (!response) return;
    // Auto-close on success after 3s
    if (response.ok) {
      const t = setTimeout(() => onClose && onClose(), 3000);
      return () => clearTimeout(t);
    }
  }, [response, onClose]);

  if (!response) return null;

  const { error, ok, message } = response;
  let title = 'Información';
  let body = message || '';
  let cls = 'info';

  if (error) {
    title = 'Error';
    cls = 'error';
    if (!body) body = 'Operación fallida.';
  } else if (ok) {
    title = 'Éxito';
    cls = 'success';
    if (!body) body = 'Operación realizada correctamente.';
  } else if (message) {
    title = 'Aviso';
    cls = 'warning';
  }

  return (
    <div className="api-popup-overlay" onClick={onClose}>
      <div className={`api-popup ${cls}`} onClick={(e) => e.stopPropagation()}>
        <header className="api-popup-header"><h3>{title}</h3></header>
        <div className="api-popup-body">{body}</div>
        <div className="api-popup-actions">
          <button className="api-popup-close" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default ApiResponsePopup;
