import { useCallback, useEffect, useMemo, useState } from "react";

export const OPCIONES_POR_PAGINA = [10, 25, 50, 100];
export const ITEMS_POR_PAGINA_INICIAL = 25;

function claveStorage(clave) {
  return `paginaSize_${clave}`;
}

function leerPorPaginaGuardado(clave, porPaginaInicial, opciones) {
  try {
    const guardado = Number(localStorage.getItem(claveStorage(clave)));
    return opciones.includes(guardado) ? guardado : porPaginaInicial;
  } catch {
    return porPaginaInicial;
  }
}

export function usePaginacion({ items = [], clave, opciones = OPCIONES_POR_PAGINA, porPaginaInicial = ITEMS_POR_PAGINA_INICIAL }) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPaginaInterno] = useState(() => leerPorPaginaGuardado(clave, porPaginaInicial, opciones));

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
    if (!Number.isFinite(nuevo) || nuevo <= 0) return;
    setPorPaginaInterno(nuevo);
    setPagina(1);
    try {
      localStorage.setItem(claveStorage(clave), String(nuevo));
    } catch {
      // localStorage no disponible: el valor solo queda en memoria
    }
  }, [clave]);

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
