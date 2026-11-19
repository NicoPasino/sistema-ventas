import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { CancelIcon, SearchIcon } from '../../assets/icons';
import './BuscadorSugerencias.css';

const SIN_CAMPOS = [];

function normalizar(valor) {
  return String(valor ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

function labelPorDefecto(item) {
  return String(item ?? '');
}

function detallePorDefecto() {
  return null;
}

function clavePorDefecto(item) {
  if (item === null || typeof item !== 'object') return item;
  return item.idPublica ?? item.id ?? item.documento ?? item.nombre;
}

function textoBusqueda(item, labelDe, detalleDe, campos) {
  const partes = [labelDe(item), detalleDe(item)];

  campos.forEach((campo) => {
    partes.push(typeof campo === 'function' ? campo(item) : item?.[campo]);
  });

  return normalizar(partes.filter((valor) => valor !== null && valor !== undefined).join(' '));
}

export function BuscadorSugerencias({
  items = [],
  value = null,
  onChange,
  getLabel = labelPorDefecto,
  getDetalle = detallePorDefecto,
  getKey = clavePorDefecto,
  camposBusqueda = SIN_CAMPOS,
  placeholder = 'Buscar...',
  minChars = 1,
  requerirBusqueda = false,
  maxItems = 10,
  showCreateButton = false,
  onCreate,
  crearLabel = 'Crear',
  verTodosLabel = 'Ver todos',
  verMenosLabel = 'Ver menos',
  mensajeVacio = 'Sin resultados',
  disabled = false,
  className = '',
}) {
  const [texto, setTexto] = useState(() => (value ? getLabel(value) : ''));
  const [conFoco, setConFoco] = useState(false);
  const [indiceActivo, setIndiceActivo] = useState(-1);
  const [expandido, setExpandido] = useState(false);

  const contenedorRef = useRef(null);
  const inputRef = useRef(null);
  const opcionesRef = useRef([]);
  const labelRef = useRef(getLabel);
  const valueRef = useRef(value);
  labelRef.current = getLabel;
  valueRef.current = value;

  const listaId = useId();
  const termino = normalizar(texto.trim());
  const terminoValido = termino.length >= minChars;
  const campos = camposBusqueda ?? SIN_CAMPOS;

  const resultadosCompletos = useMemo(() => {
    if (!terminoValido && requerirBusqueda) return [];
    if (!terminoValido) return items;

    return items.filter((item) => textoBusqueda(item, getLabel, getDetalle, campos).includes(termino));
  }, [items, termino, terminoValido, requerirBusqueda, getLabel, getDetalle, campos]);

  const resultados = expandido ? resultadosCompletos : resultadosCompletos.slice(0, maxItems);
  const hayMasResultados = resultadosCompletos.length > maxItems;

  const mostrarLista = conFoco && !disabled && (requerirBusqueda ? terminoValido : true);
  const mostrarPanel = conFoco && !disabled && (mostrarLista || showCreateButton);

  useEffect(() => {
    setTexto(value ? labelRef.current(value) : '');
    setIndiceActivo(-1);
  }, [value]);

  useEffect(() => {
    setExpandido(false);
  }, [termino]);

  // Único listener de documento: dependencias estables, sólo cierra al hacer
  // click fuera. El teclado se maneja en el input, no a nivel global (#21).
  useEffect(() => {
    function handleClickOutside(event) {
      if (!contenedorRef.current?.contains(event.target)) {
        setConFoco(false);
        setIndiceActivo(-1);
        setExpandido(false);
        setTexto(valueRef.current ? labelRef.current(valueRef.current) : '');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (indiceActivo < 0) return;
    opcionesRef.current[indiceActivo]?.scrollIntoView({ block: 'nearest' });
  }, [indiceActivo]);

  const seleccionar = useCallback((item) => {
    onChange?.(item);
    setTexto(item ? labelRef.current(item) : '');
    setIndiceActivo(-1);
    setExpandido(false);
    setConFoco(false);
  }, [onChange]);

  const limpiar = useCallback(() => {
    onChange?.(null);
    setTexto('');
    setIndiceActivo(-1);
    setExpandido(false);
    setConFoco(true);
    inputRef.current?.focus();
  }, [onChange]);

  const handleChange = (event) => {
    setTexto(event.target.value);
    setIndiceActivo(-1);
    setConFoco(true);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        if (!mostrarLista || resultados.length === 0) return;
        event.preventDefault();
        setIndiceActivo((prev) => (prev < resultados.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        if (!mostrarLista || resultados.length === 0) return;
        event.preventDefault();
        setIndiceActivo((prev) => (prev > 0 ? prev - 1 : resultados.length - 1));
        break;
      case 'Enter':
        if (!mostrarLista || indiceActivo < 0 || !resultados[indiceActivo]) return;
        event.preventDefault();
        seleccionar(resultados[indiceActivo]);
        break;
      case 'Escape':
        if (mostrarPanel) {
          setConFoco(false);
          setIndiceActivo(-1);
          setExpandido(false);
        } else if (texto) {
          setTexto(valueRef.current ? labelRef.current(valueRef.current) : '');
        }
        break;
      case 'Tab':
        // El blur del contenedor cierra el panel cuando el foco sale;
        // así "Ver todos" y "Crear" siguen siendo alcanzables por teclado.
        setIndiceActivo(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`buscadorSugerencias ${className}`.trim()}
      ref={contenedorRef}
      onBlur={(event) => {
        if (!contenedorRef.current?.contains(event.relatedTarget)) {
          setConFoco(false);
          setIndiceActivo(-1);
          setExpandido(false);
        }
      }}
    >
      <div className={`buscadorSugerenciasInputWrapper ${mostrarPanel ? 'abierto' : ''} ${disabled ? 'deshabilitado' : ''}`}>
        <SearchIcon />
        <input
          ref={inputRef}
          type="text"
          className="buscadorSugerenciasInput"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={mostrarPanel}
          aria-controls={listaId}
          aria-activedescendant={mostrarLista && indiceActivo >= 0 ? `${listaId}-opcion-${indiceActivo}` : undefined}
          placeholder={placeholder}
          value={texto}
          disabled={disabled}
          autoComplete="off"
          onChange={handleChange}
          onFocus={() => setConFoco(true)}
          onKeyDown={handleKeyDown}
        />
        {texto && !disabled && (
          <button
            type="button"
            className="buscadorSugerenciasLimpiar"
            title="Limpiar selección"
            aria-label="Limpiar selección"
            onMouseDown={(event) => event.preventDefault()}
            onClick={limpiar}
          >
            <CancelIcon />
          </button>
        )}
      </div>

      {mostrarPanel && (
        <div className="buscadorSugerenciasPanel">
          {mostrarLista && (
            <ul className="buscadorSugerenciasLista" role="listbox" id={listaId}>
              {resultados.length === 0 ? (
                <li className="buscadorSugerenciasVacio" role="presentation">{mensajeVacio}</li>
              ) : (
                resultados.map((item, index) => {
                  const detalle = getDetalle(item);
                  const tieneDetalle = detalle !== null && detalle !== undefined && String(detalle).trim() !== '';

                  return (
                    <li
                      key={getKey(item)}
                      id={`${listaId}-opcion-${index}`}
                      ref={(el) => { opcionesRef.current[index] = el; }}
                      className={`buscadorSugerenciasOpcion ${indiceActivo === index ? 'activa' : ''}`}
                      role="option"
                      aria-selected={indiceActivo === index}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setIndiceActivo(index)}
                      onClick={() => seleccionar(item)}
                    >
                      <span className="buscadorSugerenciasNombre">{getLabel(item)}</span>
                      {tieneDetalle && (
                        <span className="buscadorSugerenciasDetalle">{detalle}</span>
                      )}
                    </li>
                  );
                })
              )}

              {hayMasResultados && (
                <li className="buscadorSugerenciasVerTodosFila" role="presentation">
                  <button
                    type="button"
                    className="buscadorSugerenciasVerTodos"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setExpandido((prev) => !prev);
                      setIndiceActivo(-1);
                    }}
                  >
                    {expandido ? verMenosLabel : `${verTodosLabel} (${resultadosCompletos.length})`}
                  </button>
                </li>
              )}
            </ul>
          )}

          {showCreateButton && (
            <button
              type="button"
              className="buscadorSugerenciasCrear"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setConFoco(false);
                onCreate?.(texto.trim());
              }}
            >
              + {crearLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
