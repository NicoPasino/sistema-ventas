import './formSearch.css'
import { useRef, useState, useCallback } from 'react';
import { ReloadIcon, SearchIcon } from "../../icons";
import { IconButton, Button } from '../../shared/botones';

export function FormSearch({ itemsManage, tipo, newItemHandle }) {
  const { reloadItems, filtrarItemsLocal, error } = itemsManage;
  const searchRef = useRef();
  const [ busqueda, setBusqueda ] = useState("");

  const placeholder = tipo === "Cliente" ? "Buscar por Documento o Nombre"
    : tipo === "Producto" ? "Buscar por Código o Nombre"
    : "Buscar por Código o Nombre";

  const handleReload = useCallback(() => {
    setBusqueda("");
    reloadItems();
  }, [reloadItems]);

  const handleSearch = useCallback((valor) => {
    setBusqueda(valor);
    filtrarItemsLocal(valor);
  }, [filtrarItemsLocal]);

  if (error) {
    return (
      <div className="productosHeader">
        <div className="prodHeadL">
          <IconButton title="Recargar Todo" onClick={handleReload}><ReloadIcon /></IconButton>
        </div>
        <div className="prodHeadMid">
          <div className="search-error">Error al cargar datos. <button onClick={handleReload}>Reintentar</button></div>
        </div>
        <div className="prodHeadR">
          {newItemHandle && <Button variant="success" onClick={newItemHandle}>+ Nuevo</Button>}
        </div>
      </div>
    );
  }

  return (
    <div className="productosHeader">
      <div className="prodHeadL">
        <IconButton title="Recargar Todo" onClick={handleReload}><ReloadIcon /></IconButton>
      </div>
      <div className="prodHeadMid">
        <div className="search-input-wrapper">
          <SearchIcon />
          <input
            type="text"
            className="input search-input"
            ref={searchRef}
            placeholder={placeholder}
            autoComplete="off"
            value={busqueda}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="prodHeadR">
        {newItemHandle && <Button variant="success" onClick={newItemHandle}>+ Nuevo</Button>}
      </div>
    </div>
  )
}
