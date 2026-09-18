import { useCallback, useEffect, useMemo, useState } from "react";
import { converToLocal } from "../utils/getDate";

export function useItems({ itemsDB, categoriasDB }) {
  const [items, setItems] = useState([]);
  const [itemsOriginales, setItemsOriginales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mostrarError = useCallback((res) => {
    const errorMsj = res?.error || res?.message;
    setError(errorMsj || false);
    return Boolean(errorMsj);
  }, []);

  const recargarItems = useCallback(async () => {
    setLoading(true);
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

      setItems(Array.isArray(res) ? res : []);
      setItemsOriginales(Array.isArray(res) ? res : []);

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
  }, [itemsDB, categoriasDB, mostrarError]);

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
    const respuestaConfirm = confirm("Realmente quieres eliminar este elemento?"); // TODO: modal
    if (!respuestaConfirm) return undefined;
    try {
      return await itemsDB.eliminar(id);
    } catch (err) {
      console.error(err);
      return { error: "Error al eliminar el elemento." };
    }
  }, [itemsDB]);

  const filtrarItemsLocal = useCallback((valor) => {
    if (!valor || valor.trim() === "") {
      setItems(itemsOriginales);
      return;
    }
    const valorLower = valor.toLowerCase().trim();
    const filtrados = itemsOriginales.filter((item) => {
      return Object.values(item).some((val) => {
        if (val === null || val === undefined) return false;
        if (Array.isArray(val)) return false;
        return String(val).toLowerCase().includes(valorLower);
      });
    });
    setItems(filtrados);
  }, [itemsOriginales]);

  const reloadItems = recargarItems;

  return useMemo(() => ({
    items,
    agregar,
    actualizar,
    obtenerItem,
    eliminar,
    reloadItems,
    filtrarItemsLocal,
    loading,
    error,
    categorias
  }), [items, agregar, actualizar, obtenerItem, eliminar, reloadItems, filtrarItemsLocal, loading, error, categorias]);
}