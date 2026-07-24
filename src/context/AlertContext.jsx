import { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback(({ type = 'info', title, message, autoClose = false, autoCloseDelay = 3000 }) => {
    setAlert({ type, title, message, autoClose, autoCloseDelay });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
