import { createContext, useContext, useState, useCallback } from 'react';
import { Popup } from '../components/shared/Popup';

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState(null);

  const showPopup = useCallback(({ type = 'info', message = '', onClose }) => {
    setPopup({ type, message, onClose });
  }, []);

  const hidePopup = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => { hidePopup(); popup.onClose?.(); }}
        />
      )}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}
