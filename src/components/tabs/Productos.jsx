import { useEffect, useState } from 'react';
import './shared/formTabla.css';
import { productosDB } from "../../database/db";
import { TablaList } from "./shared/tablaList";
import { ReloadIcon } from "../icons";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  
  // TODO: Exportar como customHook para usar en "Productos" y "Ventas"
  const cargarProductos = async () => {
    const datos = await productosDB.obtenerProductos();
    setProductos(datos);
  };
  useEffect(() => {
    cargarProductos();
  }, []);
  
  // TODO: exportar
  const agregar = async () => {
    const nuevo = {
      Producto: 'Nuevo producto',
      Descripcion: 'Descripción del producto',
      Cantidad: Math.round(Math.random()*8)+1,
      Precio: Math.round(Math.random()*90),
      Fecha: Date.now(),
    };
    await productosDB.agregarProducto(nuevo);
    cargarProductos();
  };
  const eliminar = async (id) => {
    const respuestaConfirm = confirm("Realmente quieres eliminar este elemento?")
    if (!respuestaConfirm) return
    productosDB.eliminarProducto(id);
    cargarProductos();
  }
  
  return (
    <div className="productos">
      {/* TODO: Exportar buscador */}
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
      <TablaList tipo={"productos"} lista={productos} acciones={{eliminar}}/>
    </div>
  )
}