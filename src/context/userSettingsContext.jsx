import { createContext, useEffect, useState } from 'react';
import { userSettings } from '../Hooks/userSettings';
import { useNotifications } from './notificationContext';

export const UserSettingsContext = createContext();

export function UserSettingsProvider ({ children }) {
  const { hideAlert } = useNotifications();
  const [getUser, setUser] = useState('Usuario')
  const [getTab, setTab] = useState('Inicio')

  useEffect(() => {
    const usuarioGuardado = userSettings.getUser();
    setUser(usuarioGuardado.nombre);
    setTab(usuarioGuardado.tab);
  }, []);

  
  function handleTab(tab) {
    hideAlert();
    setTab(tab);
    userSettings.editUser({newTab: tab});
  }

  return (
    <UserSettingsContext.Provider value={{
      getUser, setUser,
      getTab, handleTab,
    }}
    >
      {children}
    </UserSettingsContext.Provider>
  )
}
