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
  const { hayFiltros, hayOrden, orden, reloadItems, filtrarItemsLocal, ordenarItems, loading, error, filtroEstado, filtrarPorEstado, limpiarFiltros } = itemsManage;
  const searchRef = useRef();
  const [ busqueda, setBusqueda ] = useState("");

  // El orden vive en useItems para compartirlo con los headers de la tabla.
  const campoOrden = orden?.campo ?? null;
  const direccion = orden?.direccion ?? "asc";

  const placeholder = tipo === "Cliente" ? "Buscar en Clientes..."
    : tipo === "Producto" ? "Buscar en Productos..."
    : "Buscar...";

  // recarga: useItems ya resetea el orden, acá solo limpiamos la búsqueda visual
  const handleReload = useCallback(() => {
    setBusqueda("");
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

  // limpia búsqueda, estado y orden sin volver a pedir los datos
  // se permite limpiar incluso con error para recuperar el control del toolbar
  const handleLimpiar = useCallback(() => {
    setBusqueda("");
    limpiarFiltros();
  }, [limpiarFiltros]);

  const handleCambiarDireccion = useCallback(() => {
    if (!orden) return;
    const nuevaDir = direccion === "asc" ? "desc" : "asc";
    ordenarItems(orden.accesor, nuevaDir, orden.campo);
  }, [orden, direccion, ordenarItems]);

  const handleOrdenar = useCallback((label) => {
    const campo = ordenCampos.find((c) => c.label === label);
    if (!campo) return;
    if (orden?.campo === label) {
      handleCambiarDireccion();
      return;
    }
    ordenarItems(campo.valor, "asc", label);
  }, [orden, ordenCampos, ordenarItems, handleCambiarDireccion]);

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
              value={campoOrden ?? ""}
              onChange={(e) => handleOrdenar(e.target.value)}
            >
              <option value="">Ordenar por…</option>
              {ordenCampos.map((c, i) => (
                <option key={i} value={c.label}>{c.label}</option>
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
          disabled={!hayFiltros && !hayOrden}
          className="toolbarLimpiar"
        >
          <CancelIcon /> Limpiar filtros
        </Button>
      </div>
    </div>
  )
}