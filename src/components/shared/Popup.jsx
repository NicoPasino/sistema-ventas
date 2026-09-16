import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NOTIFICATION_ICONS } from '../../assets/icons';
import './popup.css';

export default function Popup({
  type = 'info',
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 3000,
  icon,
  children,
}) {
  useEffect(() => {
    if (!autoClose) return;
    const t = setTimeout(() => onClose?.(), autoCloseDelay);
    return () => clearTimeout(t);
  }, [autoClose, autoCloseDelay, onClose, type]);

  return createPortal(
    <div className="popup-overlay">
      <div className={`popup ${type}`}>
        <div className="popup-icon">
          {icon ?? NOTIFICATION_ICONS[type]}
        </div>
        {message && <p className="popup-message">{message}</p>}
        {children}
      </div>
    </div>,
    document.body
  );
}
