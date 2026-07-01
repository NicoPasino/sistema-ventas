import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import { FormSearch } from '../shared/formSearch';
import { ModalEditarProducto } from "./modalEditarProducto.jsx";
import { TablaGenerica } from '../tablaGenerica';
import { Contenido } from './ContenidoTabla';

export default function Productos() {
  const { productos } = useContext(DataContext);
  const { items, eliminar, reloadItems } = productos;
  const [idProducto, setIdProducto] = useState();
  const [modalNew, setModalNew] = useState(false);
  
  const tableHeaders = ["Código", "Producto", "Descripción", "Categoría", "Stock", "Precio"];
  
  function handleCloseModal() {
    setIdProducto();
    setModalNew(false);
  }
  
  return (
    <div>
      <FormSearch tipo={"Producto"} itemsManage={productos} newItemHandle={ () => setModalNew(true) } />
      <TablaGenerica itemsManage={productos} headers={tableHeaders} editable>
        <Contenido lista={items} setIdProducto={setIdProducto} eliminar={eliminar} />
      </TablaGenerica>
      {(modalNew || idProducto) && (
        <ModalEditarProducto 
          id={idProducto} 
          setIdProducto={handleCloseModal} 
          reload={reloadItems}
        />
      )}
    </div>
  )
}
