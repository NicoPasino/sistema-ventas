import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import { FormSearch } from '../shared/formSearch';
import { FormNuevoProducto } from "./formNuevoProducto";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';

export default function Productos() {
  const { productos } = useContext(DataContext);
  const { items, eliminar, reloadItems } = productos;
  const [idProducto, setIdProducto] = useState(); // editMode
  
  const tableHeaders = ["Código", "Producto", "Descripción", "Categoría", "Stock", "Precio"];
  
  return (
    (!idProducto)
      ? <div>
          <FormSearch tipo={"Producto"} itemsManage={productos} />
          <TablaGenerica 
            itemsManage={productos} 
            headers={tableHeaders} editable
            Contenido={<Contenido lista={items} setIdProducto={setIdProducto} eliminar={eliminar} />}
          />
        </div>
      : <FormNuevoProducto id={idProducto} setIdProducto={setIdProducto} reload={reloadItems}/>
  )
}

export function Producto() {
  return <FormNuevoProducto />
}
