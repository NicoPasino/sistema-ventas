import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { FormSearch } from '../../components/pages/formSearch';
import { ModalEditarProducto } from "./modalEditarProducto.jsx";
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { Contenido } from './ContenidoTabla.jsx';
import { usePopup } from '../../context/notificationContext.jsx';
import { CheckRes } from '../../utils/checkRes.js';

export default function Productos() {
  const { productos } = useContext(DataContext);
  const { items, eliminar, reloadItems } = productos;
  const [idProducto, setIdProducto] = useState();
  const [modalNew, setModalNew] = useState(false);
  const { showPopup } = usePopup();
  
  const tableHeaders = ["Código", "Producto", "Descripción", "Categoría", "Stock", "Precio"];
  
  function handleCloseModal() {
    setIdProducto();
    setModalNew(false);
  }

  async function handleDelete(id) {
    const res = await eliminar(id);
    if (!res) return;
    CheckRes(res, { onSuccess: reloadItems, showPopup });
  }

  return (
    <div>
      <FormSearch tipo={"Producto"} itemsManage={productos} newItemHandle={ () => setModalNew(true) } />
      <TablaGenerica itemsManage={productos} headers={tableHeaders} editable>
        <Contenido lista={items} setIdProducto={setIdProducto} eliminar={handleDelete} />
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
