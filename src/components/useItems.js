import { useEffect, useState } from "react";

function useGetItems (itemsDB) {
  const [items, updateItems] = useState([])

  const recargarItems = async (items) => {
    updateItems(await items.obtenerTodos());
  }

  useEffect(() => {
    recargarItems(itemsDB);
  }, [itemsDB]);

  return { items, recargarItems }
}

export function useItems({itemsDB}) {
  const { items, recargarItems } = useGetItems(itemsDB);

  const agregar = async () => {
    const nuevo = {
      Producto: 'Nombre producto',
      Descripcion: 'Descripción del producto',
      Cantidad: Math.round(Math.random()*8)+1,
      Precio: Math.round(Math.random()*90),
      Fecha: Date.now(),
      
      Productos: 'Nombres o ID de productos',
      Cliente: 'Cliente ' + String(Date.now()).at(-1),
    };
    await itemsDB.agregar(nuevo);
    recargarItems(itemsDB);
  };
  const eliminar = async (id) => {
    const respuestaConfirm = confirm("Realmente quieres eliminar este elemento?")
    if (!respuestaConfirm) return;
    itemsDB.eliminar(id);
    recargarItems(itemsDB);
  }

  return { items, agregar, eliminar, recargarItems }
}
