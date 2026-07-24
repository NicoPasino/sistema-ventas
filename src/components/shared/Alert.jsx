import { useEffect } from 'react';
import { useAlert } from '../../context/AlertContext';
import { DEFAULT_ICONS } from '../icons';
import './alert.css';


const DEFAULT_TITLES = {
  success: 'Éxito',
  error: 'Error',
  warning: 'Advertencia',
  info: 'Info',
};

export function Alert() {
  const { alert, hideAlert } = useAlert();

  useEffect(() => {
    if (!alert?.autoClose) return;
    const t = setTimeout(() => hideAlert(), alert.autoCloseDelay);
    return () => clearTimeout(t);
  }, [alert, hideAlert]);

  if (!alert) return null;

  return (
    <div className={`alert ${alert.type}`} role="alert">
      <div className="alert-icon">
        {DEFAULT_ICONS[alert.type]}
      </div>
      <div className="alert-body">
        {alert.title && <p className="alert-title">{alert.title}</p>}
        {!alert.title && <p className="alert-title">{DEFAULT_TITLES[alert.type]}</p>}
        {alert.message && <p className="alert-message">{alert.message}</p>}
      </div>
      <button className="alert-close" onClick={hideAlert} type="button">
        &times;
      </button>
    </div>
  );
}

export default Alert;
