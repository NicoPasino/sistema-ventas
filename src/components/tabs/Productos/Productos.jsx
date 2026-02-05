import { productosAPI as itemsDB } from "../../../services/apiClient";
import { useItems } from '../../../Hooks/useItems';
import { useState } from "react";
import { FormSearch } from '../shared/formSearch';
import { FormNuevoProducto } from "./formNuevoProducto";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';

export default function Productos() {
  const itemsManage = useItems({itemsDB}); // productosDB as itemsDB
  const {items, eliminar, recargarItems} = itemsManage;
  const [idProducto, setIdProducto] = useState(); // editMode
  
  const tableHeaders = ["Código", "Producto", "Descripción", "Categoría", "Stock", "Precio"];
  
  return (
    !idProducto ? 
      <div>
        <FormSearch tipo={"Producto"} itemsManage={itemsManage} itemsDB={itemsDB}/>
        <TablaGenerica 
          itemsManage={itemsManage} 
          headers={tableHeaders} editable
          Contenido={<Contenido lista={items} setIdProducto={setIdProducto} eliminar={eliminar} />}
        />
      </div>
    : <FormNuevoProducto id={idProducto} setIdProducto={setIdProducto} reload={recargarItems}/>
  )
}

export function Producto() {
  return <FormNuevoProducto />
}

// TODO: ver info completa