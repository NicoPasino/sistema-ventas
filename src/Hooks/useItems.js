import { useEffect, useState } from "react";

export function useItems({itemsDB, categoriasDB}) {
  const [ items, setItems ] = useState([]);
  const [ categorias, setCategorias ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ mensaje, setMensaje ] = useState(false);
  
  function hayError(res) {
    try {
      if (res?.error) {
        setError(res.error);
        return true;
      } else if (res?.message) {
        setMensaje(res.message);
        return true;
      } else return false;
    } catch {
      setError("Error de código, al checkear la respuesta de la API.");
      return true;
    }
  }
  
  const recargarItems = async (itemsDBArg) => {
    setLoading(true);
    try {
      // setTimeout(async () => {
        const res = await itemsDBArg.obtenerTodos();
        if (hayError(res)) return;

        setItems(Array.isArray(res) ? res : []);

        if (!categoriasDB) return;
        const categoriasRes = await categoriasDB.obtenerTodos();
        if (hayError(categoriasRes)) return;
        setCategorias(Array.isArray(categoriasRes) ? categoriasRes : []);
      // }, 3000);
    } catch (err) {
      setError(err?.message || String(err));
      setItems([]);
    } finally {
      setLoading(false);
    }
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

  const reloadItems = () => recargarItems(itemsDB);

  return { items, agregar, actualizar, obtenerItem, eliminar, reloadItems, buscarItems, loading, error, mensaje, setMensaje, categorias }
}
