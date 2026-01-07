import { useEffect, useState } from "react";

// TODO: Manejo de error

export function useItems({itemsDB}) {
  const [ items, setItems ] = useState([]);
  
  const recargarItems = async (items) => {
    setItems(await items.obtenerTodos());
  }

  useEffect(() => {
    recargarItems(itemsDB);
  }, [itemsDB]);

  const agregar = async ({nuevoItem}) => {
    let res = await itemsDB.agregar(nuevoItem);
    // if (res?.ok) 
      recargarItems(itemsDB);
    return res;
  };
  const actualizar = async ({nuevoDato}) => {
    let res = await itemsDB.actualizar(nuevoDato);
    // if (res?.ok) 
      recargarItems(itemsDB);
    return res;
  };
  const obtenerItem = async (id) => {
    let res = await itemsDB.obtenerPorId(id);
    return res;
  };
  const eliminar = async (id) => {
    const respuestaConfirm = confirm("Realmente quieres eliminar este elemento?"); // TODO: modal
    if (!respuestaConfirm) return;
    let res = await itemsDB.eliminar(Number(id));
    recargarItems(itemsDB);
    return res;
  };

  
  const buscarItems = async (campo, valor) => {
    setItems(await itemsDB.buscarPorCampo(campo, valor));
  }

  return { items, agregar, actualizar, obtenerItem, eliminar, recargarItems, buscarItems }
}
