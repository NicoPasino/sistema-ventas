import './formSearch.css'
import { useRef, useState, useCallback } from 'react';
import { ReloadIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon, NewIcon, CancelIcon } from "../../assets/icons";
import { IconButton, Button } from '../shared/botones';

const OPCIONES_ESTADO = [
  { valor: "todos", label: "Todos" },
  { valor: "activos", label: "Activos" },
  { valor: "inactivos", label: "Inactivos" },
];

export function FormSearch({ itemsManage, tipo, newItemHandle, ordenCampos = [], mostrarEstado = false }) {
  const { hayFiltros, reloadItems, filtrarItemsLocal, ordenarItems, loading, error, filtroEstado, filtrarPorEstado, limpiarFiltros } = itemsManage;
  const searchRef = useRef();
  const [ busqueda, setBusqueda ] = useState("");
  const [ campoOrden, setCampoOrden ] = useState(null);
  const [ direccion, setDireccion ] = useState("asc");

  const placeholder = tipo === "Cliente" ? "Buscar en Clientes..."
    : tipo === "Producto" ? "Buscar en Productos..."
    : "Buscar...";

  // solo recarga: mantiene la búsqueda y el filtro de estado que estén aplicados
  const handleReload = useCallback(() => {
    setCampoOrden(null);
    setDireccion("asc");
    reloadItems();
  }, [reloadItems]);

  const handleSearch = useCallback((valor) => {
    if (error) return;
    setBusqueda(valor);
    filtrarItemsLocal(valor);
  }, [filtrarItemsLocal, error]);

  const handleEstado = useCallback((valor) => {
    if (error) return;
    filtrarPorEstado(valor);
  }, [filtrarPorEstado, error]);

  // limpia búsqueda y estado sin volver a pedir los datos, el orden se mantiene
  const handleLimpiar = useCallback(() => {
    if (error) return;
    setBusqueda("");
    limpiarFiltros();
  }, [limpiarFiltros, error]);

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
    <div className="toolbar">
      {/* Fila 1: búsqueda y alta */}
      <div className="toolbarRow toolbarRowTop">
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

        {newItemHandle && (
          <Button variant="success" onClick={newItemHandle} className="toolbarNuevo">
            <NewIcon /> Nuevo
          </Button>
        )}

        <IconButton title="Recargar Todo" onClick={handleReload} loading={loading}>
          <ReloadIcon />
        </IconButton>
      </div>

      {/* Fila 2: recarga, ordenamiento, estado y limpieza */}
      <div className="toolbarRow toolbarRowBottom">
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

        {mostrarEstado && (
          <div className="estado-filter" role="group" aria-label="Filtrar por estado">
            {OPCIONES_ESTADO.map((op) => (
              <button
                key={op.valor}
                type="button"
                title={`Mostrar ${op.label.toLowerCase()}`}
                className={`estado-filter-btn ${filtroEstado === op.valor ? "estado-filter-btnActivo" : ""}`}
                onClick={() => handleEstado(op.valor)}
              >
                {op.label}
              </button>
            ))}
          </div>
        )}

        <Button
          variant="outline-danger"
          onClick={handleLimpiar}
          disabled={!hayFiltros || Boolean(error)}
          className="toolbarLimpiar"
        >
          <CancelIcon /> Limpiar filtros
        </Button>
      </div>
    </div>
  )
}