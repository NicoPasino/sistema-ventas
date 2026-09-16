import { createContext, useContext, useState, useCallback } from 'react';
import { Popup } from '../components/shared/Popup';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [popup, setPopup] = useState(null);

  const showAlert = useCallback(({ type = 'info', title, message, autoClose = false, autoCloseDelay = 3000 }) => {
    setAlert({ type, title, message, autoClose, autoCloseDelay });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const showPopup = useCallback(({ type = 'info', message = '', onClose }) => {
    setPopup({ type, message, onClose });
  }, []);

  const hidePopup = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ alert, showAlert, hideAlert, showPopup, hidePopup }}>
      {children}
      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => { hidePopup(); popup.onClose?.(); }}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}

export function useAlert() {
  return useContext(NotificationContext);
}

export function usePopup() {
  return useContext(NotificationContext);
}