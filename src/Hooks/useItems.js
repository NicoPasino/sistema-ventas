import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { converToLocal } from "../utils/getDate";
import { esActivo } from "../utils/displayConvert";

const FILTROS_INICIALES = { busqueda: "", estado: "todos" };

function aplicarOrden(lista, orden) {
  if (!orden) return lista;
  const { accesor, direccion } = orden;
  const factor = direccion === "desc" ? -1 : 1;
  return [...lista].sort((a, b) => {
    const va = accesor(a);
    const vb = accesor(b);
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * factor;
    return String(va ?? "").localeCompare(String(vb ?? ""), "es", { numeric: true, sensitivity: "base" }) * factor;
  });
}

function filtrarLista(lista, { busqueda, estado }) {
  let filtrados = lista;

  if (estado === "activos") filtrados = filtrados.filter((item) => esActivo(item.activo));
  else if (estado === "inactivos") filtrados = filtrados.filter((item) => !esActivo(item.activo));

  const valor = (busqueda ?? "").trim().toLowerCase();
  if (valor === "") return filtrados;

  return filtrados.filter((item) => {
    return Object.values(item).some((val) => {
      if (val === null || val === undefined) return false;
      if (Array.isArray(val)) return false;
      return String(val).toLowerCase().includes(valor);
    });
  });
}

export function useItems({ itemsDB, categoriasDB, estadoInicial = "todos" }) {
  const [items, setItems] = useState([]);
  const [itemsOriginales, setItemsOriginales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orden, setOrden] = useState(null);
  const filtrosPorDefecto = useMemo(() => ({ ...FILTROS_INICIALES, estado: estadoInicial }), [estadoInicial]);
  const [filtros, setFiltros] = useState(() => ({ ...filtrosPorDefecto }));
  const filtrosRef = useRef({ ...filtrosPorDefecto });

  const mostrarFiltrados = useCallback((lista, filtrosAplicados, ordenAplicado) => {
    const filtrados = filtrarLista(lista, filtrosAplicados);
    setItems(ordenAplicado ? aplicarOrden(filtrados, ordenAplicado) : filtrados);
  }, []);

  const mostrarError = useCallback((res) => {
    const errorMsj = res?.error || res?.message;
    setError(errorMsj || false);
    return Boolean(errorMsj);
  }, []);

  const recargarItems = useCallback(async () => {
    setLoading(true);
    setOrden(null);
    try {
      let res = await itemsDB.obtenerTodos();

      // Convertir fechas de UTC a local
      if (Array.isArray(res)) {
        res = res.map((item) => {
          const copia = { ...item };
          if (copia.fechaCreacion) copia.fechaCreacion = converToLocal(copia.fechaCreacion);
          if (copia.fechaModificacion) copia.fechaModificacion = converToLocal(copia.fechaModificacion);
          if (copia.fechaVenta) copia.fechaVenta = converToLocal(copia.fechaVenta);
          return copia;
        });
      }

      if (mostrarError(res)) return;

      const lista = Array.isArray(res) ? res : [];
      setItemsOriginales(lista);
      mostrarFiltrados(lista, filtrosRef.current, null);

      if (!categoriasDB) return;
      const categoriasRes = await categoriasDB.obtenerTodos();
      if (mostrarError(categoriasRes)) return;
      setCategorias(Array.isArray(categoriasRes) ? categoriasRes : []);
    } catch (err) {
      setError("Error al cargar los datos.");
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [itemsDB, categoriasDB, mostrarError, mostrarFiltrados]);

  useEffect(() => {
    recargarItems();
  }, [recargarItems]);

  const agregar = useCallback(async ({ nuevoItem }) => {
    try {
      return await itemsDB.agregar(nuevoItem);
    } catch (err) {
      console.error(err);
      return { error: "Error al agregar el elemento." };
    }
  }, [itemsDB]);

  const actualizar = useCallback(async ({ nuevoDato }) => {
    try {
      return await itemsDB.actualizar(nuevoDato);
    } catch (err) {
      console.error(err);
      return { error: "Error al actualizar el elemento." };
    }
  }, [itemsDB]);

  const obtenerItem = useCallback(async (id) => {
    try {
      return await itemsDB.obtenerPorId(id);
    } catch (err) {
      console.error(err);
      return { error: "Error al obtener el elemento." };
    }
  }, [itemsDB]);

  const eliminar = useCallback(async (id) => {
    const respuestaConfirm = confirm("¿Realmente quieres realizar esta acción?");
    if (!respuestaConfirm) return undefined;
    try {
      return await itemsDB.eliminar(id);
    } catch (err) {
      console.error(err);
      return { error: "Error al eliminar el elemento." };
    }
  }, [itemsDB]);

  const cambiarFiltros = useCallback((cambios) => {
    const nuevosFiltros = { ...filtrosRef.current, ...cambios };
    filtrosRef.current = nuevosFiltros;
    setFiltros(nuevosFiltros);
    mostrarFiltrados(itemsOriginales, nuevosFiltros, orden);
  }, [itemsOriginales, orden, mostrarFiltrados]);

  const filtrarItemsLocal = useCallback((valor) => {
    cambiarFiltros({ busqueda: valor });
  }, [cambiarFiltros]);

  const filtrarPorEstado = useCallback((estado) => {
    cambiarFiltros({ estado });
  }, [cambiarFiltros]);

  const limpiarFiltros = useCallback(() => {
    const nuevosFiltros = { ...filtrosPorDefecto };
    filtrosRef.current = nuevosFiltros;
    setFiltros(nuevosFiltros);
    mostrarFiltrados(itemsOriginales, nuevosFiltros, orden);
  }, [filtrosPorDefecto, itemsOriginales, orden, mostrarFiltrados]);

  const ordenarItems = useCallback((accesor, direccion) => {
    const nuevoOrden = { accesor, direccion };
    setOrden(nuevoOrden);
    setItems(aplicarOrden(items, nuevoOrden));
  }, [items]);

  const reloadItems = recargarItems;

  const hayFiltros = (filtros.busqueda ?? "") !== "" || filtros.estado !== filtrosPorDefecto.estado;

  return useMemo(() => ({
    items,
    agregar,
    actualizar,
    obtenerItem,
    eliminar,
    reloadItems,
    filtrarItemsLocal,
    filtrarPorEstado,
    limpiarFiltros,
    filtroEstado: filtros.estado,
    hayFiltros,
    ordenarItems,
    loading,
    error,
    categorias
  }), [items, agregar, actualizar, obtenerItem, eliminar, reloadItems, filtrarItemsLocal, filtrarPorEstado, limpiarFiltros, filtros.estado, hayFiltros, ordenarItems, loading, error, categorias]);
}
