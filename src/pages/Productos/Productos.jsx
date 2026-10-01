import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { FormSearch } from '../../components/pages/formSearch';
import { ModalEditarProducto } from "./modalEditarProducto.jsx";
import { TablaPaginada } from '../../components/pages/tablaPaginada';
import { Contenido } from './ContenidoTabla.jsx';
import { usePopup } from '../../context/notificationContext.jsx';
import { CheckRes } from '../../utils/checkRes.js';
import { esActivo } from '../../utils/displayConvert.jsx';
import { aTimestamp } from '../../utils/getDate.js';

export default function Productos() {
  const { productos } = useContext(DataContext);
  const { items, eliminar, reloadItems } = productos;
  const [idProducto, setIdProducto] = useState();
  const [modalNew, setModalNew] = useState(false);
  const { showPopup } = usePopup();
  
  const tableHeaders = ["Código", "Producto", "Descripción", "Categoría", "Proveedor", "Stock", "Precio", "Estado"];
  const ordenCampos = [
    { label: "Código", valor: (p) => p.idPublica },
    { label: "Producto", valor: (p) => p.nombre },
    { label: "Descripción", valor: (p) => p.descripcion },
    { label: "Categoría", valor: (p) => p.categoria },
    { label: "Proveedor", valor: (p) => p.proveedor ?? "" },
    { label: "Stock", valor: (p) => p.cantidad },
    { label: "Precio", valor: (p) => p.precio },
    { label: "Estado", valor: (p) => (esActivo(p.activo) ? 1 : 0) },
    { label: "Fecha Creación", valor: (p) => aTimestamp(p.fechaCreacion) },
    { label: "Fecha Modificación", valor: (p) => aTimestamp(p.fechaModificacion) },
  ];
  
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
      <FormSearch tipo={"Producto"} itemsManage={productos} newItemHandle={ () => setModalNew(true) } ordenCampos={ordenCampos} mostrarEstado />
      <TablaPaginada
        items={items}
        itemsManage={productos}
        headers={tableHeaders}
        editable
        clavePaginacion="productos"
        renderFilas={(lista) => <Contenido lista={lista} setIdProducto={setIdProducto} eliminar={handleDelete} />}
      />
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
