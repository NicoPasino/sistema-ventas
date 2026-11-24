import './formSearch.css'
import { useRef, useState, useCallback } from 'react';
import { SearchIcon, NewIcon, CancelIcon } from "../../assets/icons";
import { Button } from '../shared/botones';

const OPCIONES_ESTADO = [
  { valor: "todos", label: "Todos" },
  { valor: "activos", label: "Activos" },
  { valor: "inactivos", label: "Inactivos" },
];

export function FormSearch({ itemsManage, tipo, newItemHandle, mostrarEstado = false }) {
  const { hayFiltros, hayOrden, filtrarItemsLocal, error, filtroEstado, filtrarPorEstado, limpiarFiltros } = itemsManage;
  const searchRef = useRef();
  const [ busqueda, setBusqueda ] = useState("");

  const placeholder = tipo === "Cliente" ? "Buscar en Clientes..."
    : tipo === "Producto" ? "Buscar en Productos..."
    : "Buscar...";

  const handleSearch = useCallback((valor) => {
    if (error) return;
    setBusqueda(valor);
    filtrarItemsLocal(valor);
  }, [filtrarItemsLocal, error]);

  // limpia solo el buscador, sin tocar el estado ni el orden de la tabla
  const handleClearSearch = useCallback(() => {
    setBusqueda("");
    filtrarItemsLocal("");
    searchRef.current?.focus();
  }, [filtrarItemsLocal]);

  const handleEstado = useCallback((valor) => {
    if (error) return;
    filtrarPorEstado(valor);
  }, [filtrarPorEstado, error]);

  // limpia búsqueda, estado y orden sin volver a pedir los datos
  // se permite limpiar incluso con error para recuperar el control del toolbar
  const handleLimpiar = useCallback(() => {
    setBusqueda("");
    limpiarFiltros();
  }, [limpiarFiltros]);

  return (
    <div className="toolbar">
      {/* Fila 1: búsqueda */}
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
          {busqueda && (
            <button
              type="button"
              className="search-clear-btn"
              title="Limpiar búsqueda"
              aria-label="Limpiar búsqueda"
              onClick={handleClearSearch}
            >
              <CancelIcon />
            </button>
          )}
        </div>
      </div>

      {/* Fila 2: estado y acciones */}
      <div className="toolbarRow toolbarRowBottom">
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

        <div className="toolbarAcciones">
          {newItemHandle && (
            <Button variant="success" onClick={newItemHandle} className="toolbarNuevo">
              <NewIcon /> Nuevo
            </Button>
          )}

          <Button
            variant="outline-danger"
            onClick={handleLimpiar}
            disabled={!hayFiltros && !hayOrden}
            className="toolbarLimpiar"
          >
            <CancelIcon /> Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
