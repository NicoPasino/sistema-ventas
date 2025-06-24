import { useEffect, useState } from "react";

export function useItems({itemsDB}) {
  const [ items, setItems ] = useState([]);
  
  const recargarItems = async (items) => {
    setItems(await items.obtenerTodos());
  }

  useEffect(() => {
    recargarItems(itemsDB);
  }, [itemsDB]);

  const agregar = async ({nuevoItem}) => {
    await itemsDB.agregar(nuevoItem);
    recargarItems(itemsDB);
  };
  const actualizar = async ({nuevoDato}) => {
    await itemsDB.actualizar(nuevoDato);
    recargarItems(itemsDB);
  };
  const obtenerPorId = async (id) => {
    await itemsDB.obtenerPorId(id);
    recargarItems(itemsDB);
  };
  const eliminar = async (id) => {
    const respuestaConfirm = confirm("Realmente quieres eliminar este elemento?"); // TODO: modal
    if (!respuestaConfirm) return;
    itemsDB.eliminar(id);
    recargarItems(itemsDB);
  };

  return { items, agregar, actualizar, obtenerPorId, eliminar, recargarItems }
}
