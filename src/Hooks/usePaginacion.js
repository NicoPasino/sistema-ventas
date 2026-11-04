import { useCallback, useEffect, useMemo, useState } from "react";
import { useNotifications } from "../context/notificationContext";

export const OPCIONES_POR_PAGINA = [10, 25, 50, 100];
export const ITEMS_POR_PAGINA_INICIAL = 25;

function claveStorage(clave) {
  return `paginaSize_${clave}`;
}

// el inicial también debe pertenecer al catálogo: si no, el <select> quedaría vacío
function porPaginaValido(porPaginaInicial, opciones) {
  return opciones.includes(porPaginaInicial) ? porPaginaInicial : (opciones[0] ?? ITEMS_POR_PAGINA_INICIAL);
}

function leerPorPaginaGuardado(clave, porPaginaInicial, opciones) {
  const inicial = porPaginaValido(porPaginaInicial, opciones);
  try {
    const guardado = Number(localStorage.getItem(claveStorage(clave)));
    return opciones.includes(guardado) ? guardado : inicial;
  } catch {
    return inicial;
  }
}

export function usePaginacion({ items = [], clave, opciones = OPCIONES_POR_PAGINA, porPaginaInicial = ITEMS_POR_PAGINA_INICIAL }) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPaginaInterno] = useState(() => leerPorPaginaGuardado(clave, porPaginaInicial, opciones));
  const { showPopup } = useNotifications() ?? {};

  // la lista cambia al buscar, filtrar, ordenar o recargar: siempre volver a la primera página
  useEffect(() => {
    setPagina(1);
  }, [items]);

  const total = items.length;
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));
  // evita quedar en una página fuera de rango si la lista se acorta (borrado, filtro)
  const paginaActual = Math.min(pagina, totalPaginas);

  const listaPagina = useMemo(() => {
    const desde = (paginaActual - 1) * porPagina;
    return items.slice(desde, desde + porPagina);
  }, [items, paginaActual, porPagina]);

  const setPorPagina = useCallback((valor) => {
    const nuevo = Number(valor);
    // solo valores del catálogo: si no coincide con una <option>, el <select>
    // se rendería vacío y además se persistiría un tamaño inconsistente
    if (!opciones.includes(nuevo)) {
      showPopup?.({ type: "warning", message: "Cantidad de filas por página no válida." });
      return;
    }
    setPorPaginaInterno(nuevo);
    setPagina(1);
    try {
      localStorage.setItem(claveStorage(clave), String(nuevo));
    } catch {
      // localStorage no disponible: el valor solo queda en memoria
    }
  }, [clave, opciones, showPopup]);

  const irA = useCallback((nuevaPagina) => {
    setPagina(Math.min(Math.max(1, Number(nuevaPagina) || 1), totalPaginas));
  }, [totalPaginas]);

  const paginaAnterior = useCallback(() => irA(paginaActual - 1), [irA, paginaActual]);
  const paginaSiguiente = useCallback(() => irA(paginaActual + 1), [irA, paginaActual]);

  return {
    pagina: paginaActual,
    totalPaginas,
    porPagina,
    setPorPagina,
    listaPagina,
    total,
    irA,
    paginaAnterior,
    paginaSiguiente,
    opciones,
  };
}
