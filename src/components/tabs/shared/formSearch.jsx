import './formSearch.css'
import { useContext, useRef } from 'react';
import { ReloadIcon, SearchIcon } from "../../icons";
import { UserSettingsContext } from '../../../userSettingsContext';

export function FormSearch({itemsManage, tipo, itemsDB}) {
  const { handleTab } = useContext(UserSettingsContext);
  const { recargarItems, buscarItems } = itemsManage;

  const numeroSearchRef = useRef();
  const nombreSearchRef = useRef();
  // const otroSearchRef = useRef();

  const placeholderNumero = `Buscar por ${tipo == "Cliente" ? "Documento" : "Código"}`;
  const placeholderNombre = `Buscar por ${tipo == "Producto" ? "Producto" : "Nombre"}`;
  // const placeholderOtro = "Buscar Otro";

  function handleReload() {
    numeroSearchRef.current.value = "";
    nombreSearchRef.current.value = "";
    // otroSearchRef.current.value = "";
    recargarItems(itemsDB);
  }
  function handleSearch(campo) {
    const valorNumero = numeroSearchRef.current.value ?? "";
    const valorNombre = nombreSearchRef.current.value ?? "";
    // const valorOtro = otroSearchRef.current.value ?? "";

    switch (campo) {
      case "numero":
        if (!valorNumero) return
        buscarItems("numero", valorNumero);
        break;
      case "nombre":
        if (!valorNombre) return
        buscarItems("nombre", valorNombre);
        break;
      /* case "otro":
        if (!valorOtro) return
        buscarItems("otro", valorOtro);
        break; */
      default:
        console.log(`Campo '${campo}' no soportado. (handleSearch)`);
        break;
    }
  }

  function ButtonSearch({ref, placeholder, campo, isNumber = false}) {
    return (
      <div className="form-group">
        <input type={isNumber? "number" : "text"} className='input' ref={ref} placeholder={placeholder} autoComplete="off"/>
        <button style={{padding: 0}} title={placeholder} onClick={() => handleSearch(campo)}>{<SearchIcon />}</button>
      </div>
    )
  }
  
  return (
    <div className="productosHeader">
      <div className="prodHeadL">
        <button style={{padding: 0}} title="Recargar Todo" onClick={() => handleReload()}> <ReloadIcon /> </button>
      </div>
      <div className="prodHeadMid">
        <ButtonSearch ref={numeroSearchRef} placeholder={placeholderNumero} campo="numero"/>
        <ButtonSearch ref={nombreSearchRef} placeholder={placeholderNombre} campo="nombre"/>
        {/* <ButtonSearch ref={otroSearchRef} placeholder={placeholderOtro} campo="otro"/> */}
      </div>
      <div className="prodHeadR">
        <button onClick={() => handleTab(tipo)} className="colorVerdeClaro">+ Nuevo</button>
      </div>
    </div>
  )
}

//TODO: si hay error queda todo en blanco, poner una alerta ()