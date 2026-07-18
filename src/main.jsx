import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/dataContext.jsx'
import { UserSettingsProvider } from './context/userSettingsContext.jsx'
import { PopupProvider } from './context/PopupContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserSettingsProvider>
    <DataProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </DataProvider>
  </UserSettingsProvider>,
)
