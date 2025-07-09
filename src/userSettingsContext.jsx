import { createContext, useEffect, useState } from 'react'
import { userSettings } from './userSettings';

// Crear el Contexto (usar en cuarquier arhivo)
export const UserSettingsContext = createContext() // singleton (solo se crea una vez)

// Crear Provider (envuelve la app de main.jsx)
export function UserSettingsProvider ({ children }) {
  const [getUser, setUser] = useState('Usuario')
  const [getTab, setTab] = useState('Inicio')
  // const [getUserSettings, setUserSettings] = useState({nombre: "Usuario", tab: 'Inicio'})

  useEffect(() => {
    const usuarioGuardado = userSettings.getUser();
    setUser(usuarioGuardado.nombre);
    setTab(usuarioGuardado.tab);
  }, []);

  
  function handleTab(tab) {
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