import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import './App.css'
import { Header } from './components/header'
import { Nav } from './components/nav'
import { Main } from './components/tabs/main'
import { userSettings } from './userSettings'

function App() {
  // const { tab } = useParams();
  const [statusMenu, setStatusMenu] = useState(true)
  const [usuario, setUsuario] = useState(userSettings.defaultUser)
  // const { nombre, tab } = usuario;
  const [currentTab, setCurrentTab] = useState("Inicio")

  useEffect(() => {
    const usuarioGuardado = userSettings.getUser();
    setUsuario(usuarioGuardado.nombre)
    setCurrentTab(usuarioGuardado.tab)
  }, []);
  
  function handleTab(tab) {
    setCurrentTab(tab);
    userSettings.editUser({newTab: tab});
  }
  
  return (
    <div className='view'>
      {statusMenu && <Nav tab={{currentTab, handleTab}} />}
      <div className="body">
        <Header tabName={currentTab} usuario={usuario} menu={{statusMenu, setStatusMenu}}/>
        {/* <button onClick={userSettings.clearAllUsers}>borrar usuarios</button> */}
        <Main vista={currentTab}/>
      </div>
    </div>
  )
}

export default App