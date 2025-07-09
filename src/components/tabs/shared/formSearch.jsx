import './formSearch.css'
import { useContext } from 'react';
import { ReloadIcon } from "../../icons";
import { nuevoItem } from "../../../provicional/nuevoItem" // ! provisional
import { UserSettingsContext } from '../../../userSettingsContext';

export function FormSearch({props, tipo}) {
  const { handleTab } = useContext(UserSettingsContext);
  const { itemsDB, recargarItems, agregar } = props
  
  return (
    <>
      <div className="productosHeader">
        <div className="prodHeadL">
          <button style={{padding: 0}} title="Recargar Todo" onClick={() => recargarItems(itemsDB)}> <ReloadIcon /> </button>
        </div>
        <form className="prodHeadMid">
          <div className="form-group">
            <input type="number" id="id" name="id" placeholder="Buscar por ID" autoComplete="off"/>
          </div>
          <div className="form-group">
            <input type="text" id="nombre" name="nombre" placeholder="Buscar por nombre" />
          </div>
          {/* <button>🔍</button> */}
        </form>
        <div className="prodHeadR">
          <button onClick={() => agregar({nuevoItem})} className='colorRojoClaro'>Test</button>
          <button onClick={() => handleTab(tipo)} className="colorVerdeClaro">+ Nuevo</button>
        </div>
      </div>
    </>
  )
}