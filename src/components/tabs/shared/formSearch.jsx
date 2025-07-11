import './formSearch.css'
import { useContext, useRef } from 'react';
import { ReloadIcon, SearchIcon } from "../../icons";
import { UserSettingsContext } from '../../../userSettingsContext';

export function FormSearch({itemsManage, tipo, itemsDB}) {
  const { handleTab } = useContext(UserSettingsContext);
  const { recargarItems, buscarItems } = itemsManage;

  const idSearchRef = useRef();
  const nameSearchRef = useRef();

  function handleReload() {
    idSearchRef.current.value = "";
    nameSearchRef.current.value = "";
    recargarItems(itemsDB);
  }
  function handleSearch(campo) {
    if (campo === "id") {
      const valor = idSearchRef.current.value;
      buscarItems("ID", valor);
    }
    else if (campo === "name"){
      const valor = nameSearchRef.current.value;
      if (tipo == "Venta") {
        buscarItems("Cliente", valor);
      }
      else if (tipo == "Producto") {
        buscarItems("Producto", valor);
      }
      else {
        console.log("tipo no válido. (handleSearch)");
      }
    }
    else {
      console.log("campo no válido. (handleSearch)");
    }
  }
  
  return (
    <div className="productosHeader">
      <div className="prodHeadL">
        <button style={{padding: 0}} title="Recargar Todo" onClick={() => handleReload()}> <ReloadIcon /> </button>
      </div>
      <div className="prodHeadMid">
        <div className="form-group">
          <input type="number" className='inputM' ref={idSearchRef} placeholder="Buscar ID" autoComplete="off"/>
          <button style={{padding: 0}} title="Buscar por ID" onClick={() => handleSearch("id")}>{<SearchIcon />}</button>
        </div>
        <div className="form-group">
          <input type="text" className='input' ref={nameSearchRef} placeholder="Buscar por nombre" autoComplete='off'/>
          <button style={{padding: 0}} title="Buscar por Nombre" onClick={() => handleSearch("name")}>{<SearchIcon />}</button>
        </div>
      </div>
      <div className="prodHeadR">
        <button onClick={() => handleTab(tipo)} className="colorVerdeClaro">+ Nuevo</button>
      </div>
    </div>
  )
}
