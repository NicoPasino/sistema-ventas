import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/dataContext.jsx'
import { UserSettingsProvider } from './context/userSettingsContext.jsx'
import { NotificationProvider } from './context/notificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <UserSettingsProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserSettingsProvider>
  </NotificationProvider>,
)
