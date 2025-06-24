// import { useEffect, useState } from "react";
import { FormNueva } from "./shared/formNueva";
import { TablaList } from "./shared/tablaList";
import { ventasDB as itemsDB } from "../../database/db";
import { useItems } from "../useItems";
import { ReloadIcon } from "../icons";

export default function Ventas() {
  const { items, agregar, eliminar, recargarItems } = useItems({itemsDB}); // ventasDB as itemsDB

  return (
    <>
      {/* <FormNueva /> */}
      <button style={{padding: 0}} title="Recargar Todo" onClick={() => recargarItems(itemsDB)}> <ReloadIcon /> </button>
      <button onClick={agregar} className="colorVerdeClaro">+ Nuevo</button>
      <TablaList tipo={"ventas"} lista={items} acciones={{eliminar}}/>
    </>
  )
}