import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataContext";

export function NuevoProducto({obtenerItem, id}) {
  const { productos } = useContext(DataContext);
  const { categorias, loading } = productos;
  const [producto, setProducto] = useState(productoDefault);
  const {nombre, activo, cantidad, precio, idCategoria, descripcion} = producto /* || productoDefault */
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const obtenerProducto = async () => {
      if (id) {
        let res = await obtenerItem(id)
                
        if(res.error) {
          setProducto(productoDefault); 
          setError(res.error);
          return 
        }
        else {
          setProducto(res); 
        }
      } 
    }
    obtenerProducto();
  },[id, obtenerItem])

  
  function ListaCategorias({lista}) {
    if (!lista) return <input value={"(Sin categorías)"} disabled/>
    return (
      <select id="ListaCategorias" name="IdCategoria" defaultValue={idCategoria ?? ""} disabled={loading} required>
        <option value="">Seleccione una categoría</option>
        {lista.map((e, i) => ( <option key={i} value={e.id}>{e.nombre}</option> ))}
      </select>
    )
  }
  
  const Contenido = () => {
    return (
      <>
        <div className="separados">
          <label htmlFor="nombre">Nombre Producto:</label>
          <input className='w80' type="text" id="nombre" name="Nombre" defaultValue={nombre ?? ""} required />
          
          <label htmlFor="estadoP">Estado:</label>
          <select id="estadoP" name="activo" defaultValue={activo}>
            <option value="true">Activo</option>
            <option value="false">No Activo</option>
          </select>
        </div>

        <div className="separados">
          <label>Cantidad / Stock:</label>
          <input className='inputS' type="number" name="Cantidad" defaultValue={cantidad} min="1" required />
          
          <label>Precio del Producto:</label>
          $<input className='inputS' type="number" name="Precio" defaultValue={precio} min="1" step={0.01} required />
          
        </div>
        
        <label htmlFor="ListaCategorias">Categoría:</label>
        {
          (loading) ? <input value={"Cargando Categorías..."} disabled/>
            : (error) 
              ? <input value={"Error al cargar Categorías."} disabled/>
              : <ListaCategorias lista={categorias}/>
        }


        <hr />

        <div>
          <label htmlFor="descripcion">Detalles: <span className="colorGris">(opcional)</span></label>
          <textarea className='w60' id="descripcion" name="Descripcion" rows={4} defaultValue={descripcion}/>
        </div>
      </>
    )
  }
  
  return <> { error ? <p className='colorRojoClaro'>{error}</p> : <Contenido />} </>
}


let productoDefault = {
  nombre: null,
  activo: null,
  cantidad: null,
  precio: null,
  idCategoria: null, 
  descripcion: null
}