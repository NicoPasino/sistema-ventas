import { useEffect } from 'react';
import './popup.css';
import { Button } from './botones';

const DEFAULT_ICONS = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const TITLES = {
  success: 'Éxito',
  error: 'Error',
  warning: 'Aviso',
  info: 'Información',
};

export function Popup({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  autoCloseDelay = 3000,
  showCloseButton = true,
  confirmText = 'Cerrar',
  onConfirm,
  icon,
  children,
}) {
  useEffect(() => {
    if (!autoClose || type !== 'success') return;
    const t = setTimeout(() => onClose?.(), autoCloseDelay);
    return () => clearTimeout(t);
  }, [autoClose, autoCloseDelay, onClose, type]);

  const handleClose = () => onConfirm?.() ?? onClose?.();

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup ${type}`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-icon">
          {icon ?? DEFAULT_ICONS[type]}
        </div>
        <h3 className="popup-title">{title ?? TITLES[type]}</h3>
        {message && <p className="popup-message">{message}</p>}
        {children}
        {showCloseButton && (
          <div className="popup-actions">
            <Button variant="primary" onClick={handleClose}>{confirmText}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
