// import { useEffect, useState } from 'react';
import './shared/formTabla.css';
import { productosDB as itemsDB } from "../../database/db";
import { TablaList } from "./shared/tablaList";
import { ReloadIcon } from "../icons";
import { useItems } from '../useItems';

export default function Productos() {
  const { items, agregar, eliminar, recargarItems } = useItems({itemsDB}); // productosDB as itemsDB
  
  return (
    <div className="productos">
      {/* // TODO: Exportar buscador */}
      <div className="productosHeader">
        <div className="prodHeadL">
          <button style={{padding: 0}} title="Recargar Todo" onClick={() => recargarItems(itemsDB)}> <ReloadIcon /> </button>
        </div>
        <form className="prodHeadMid">
          <div className="form-group">
            <input type="number" id="id" name="id" placeholder="Buscar por ID" autoComplete="off"/>
          </div>
          <div className="form-group">
            <input type="text" id="nombre" name="nombre" placeholder="Buscar por nombre" />
          </div>
          {/* <button>🔍</button> */}
        </form>
        <div className="prodHeadR">
          <button onClick={agregar} className="colorVerdeClaro">+ Nuevo</button>
          <button>Mostrar</button>
        </div>
      </div>
      <TablaList tipo={"productos"} lista={items} acciones={{eliminar}}/>
    </div>
  )
}