import { TablaList } from "./shared/tablaList";
import './shared/formTabla.css';
import { ReloadIcon } from "../icons";
// import productos from "../../productos.json"; // json
import { useEffect, useState } from 'react';
import { agregarProducto, obtenerProductos, eliminarProducto,
actualizarProducto, obtenerProductoPorID } from '../../database/db';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  
  const cargarProductos = async () => {
    const datos = await obtenerProductos();
    setProductos(datos);
  };
  useEffect(() => {
    cargarProductos();
  }, []);
  
  const agregar = async () => {
    const nuevo = {
      ID: Date.now(),
      Producto: 'Nuevo producto',
      Descripcion: 'Descripción de prueba',
      Cantidad: 1,
      Precio: 10.0,
    };
    await agregarProducto(nuevo);
    cargarProductos();
  };
  const eliminar = async (id) => {
    const respuestaConfirm = confirm("Realmente quieres eliminar este producto?")
    if (!respuestaConfirm) return
    eliminarProducto(id);
    cargarProductos();
  }
  
  return (
    <div className="productos">
      <div className="productosHeader">
        <div className="prodHeadL">
          <button style={{padding: 0}} title="Recargar Todo" onClick={cargarProductos}> <ReloadIcon /> </button>
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
      <TablaList lista={productos} acciones={{eliminar}}/>
    </div>
  )
}