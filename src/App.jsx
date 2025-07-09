import { useState } from 'react'
import './App.css'
import { Header } from './components/header'
import { Nav } from './components/nav'
import { Main } from './components/tabs/main'

export default function App() {
  const [statusMenu, setStatusMenu] = useState(true)
  
  return (
    <div className='view'>
      {statusMenu && <Nav />}
      <div className="body">
        <Header menu={{statusMenu, setStatusMenu}}/>
        {/* <button onClick={userSettings.clearAllUsers}>borrar usuarios</button> */}
        <Main />
      </div>
    </div>
  )
}
