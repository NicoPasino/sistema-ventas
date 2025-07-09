import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserSettingsProvider } from './userSettingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserSettingsProvider>
    <App />
  </UserSettingsProvider>,
)
