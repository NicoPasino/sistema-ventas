import './formSearch.css'
import { useRef, useState, useCallback } from 'react';
import { ReloadIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon } from "../../assets/icons";
import { IconButton, Button } from '../shared/botones';

export function FormSearch({ itemsManage, tipo, newItemHandle, ordenCampos = [] }) {
  const { reloadItems, filtrarItemsLocal, ordenarItems, error } = itemsManage;
  const searchRef = useRef();
  const [ busqueda, setBusqueda ] = useState("");
  const [ campoOrden, setCampoOrden ] = useState(null);
  const [ direccion, setDireccion ] = useState("asc");

  const placeholder = tipo === "Cliente" ? "Buscar por Documento o Nombre"
    : tipo === "Producto" ? "Buscar por Código o Nombre"
    : "Buscar por Código o Nombre";

  const handleReload = useCallback(() => {
    setBusqueda("");
    setCampoOrden(null);
    setDireccion("asc");
    reloadItems();
  }, [reloadItems]);

  const handleSearch = useCallback((valor) => {
    if (error) return;
    setBusqueda(valor);
    filtrarItemsLocal(valor);
  }, [filtrarItemsLocal]);

  const handleOrdenar = useCallback((index) => {
    const campo = ordenCampos[index];
    if (!campo) return;
    setCampoOrden(index);
    setDireccion("asc");
    ordenarItems(campo.valor, "asc");
  }, [ordenCampos, ordenarItems]);

  const handleCambiarDireccion = useCallback(() => {
    if (campoOrden === null) return;
    const nuevaDir = direccion === "asc" ? "desc" : "asc";
    setDireccion(nuevaDir);
    ordenarItems(ordenCampos[campoOrden].valor, nuevaDir);
  }, [campoOrden, direccion, ordenCampos, ordenarItems]);

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
        {ordenCampos.length > 0 && (
          <div className="sort-wrapper">
            <select
              className="sort-select"
              title="Ordenar por columna"
              value={campoOrden ?? -1}
              onChange={(e) => handleOrdenar(Number(e.target.value))}
            >
              <option value={-1}>Ordenar por…</option>
              {ordenCampos.map((c, i) => (
                <option key={i} value={i}>{c.label}</option>
              ))}
            </select>
            <IconButton
              title={direccion === "asc" ? "Ascendente" : "Descendente"}
              onClick={handleCambiarDireccion}
              disabled={campoOrden === null}
            >
              {direccion === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconButton>
          </div>
        )}
      </div>
      <div className="prodHeadR">
        {newItemHandle && <Button variant="success" onClick={newItemHandle}>+ Nuevo</Button>}
      </div>
    </div>
  )
}
