import { useEffect, useState } from "react";

export function NuevoProducto({obtenerItem, id}) {
  const [producto, setProducto] = useState();
  
  useEffect(() => {
    const obtenerProducto = async () => {
      if (id) setProducto(await obtenerItem(id));
    }
    obtenerProducto();
  },[id, obtenerItem])

  return (
    <>
      <div className="separados">
        <label htmlFor="nombre">Nombre Producto:</label>
        <input className='w80' type="text" id="nombre" name="Producto" defaultValue={producto?.Producto} required />
        
        <label htmlFor="estadoP">Estado:</label>
        <select id="estadoP" name="Estado" defaultValue={producto?.Estado}>
          <option value="true">Activo</option>
          <option value="false">No Activo</option>
        </select>
      </div>

      <div className="separados">
        <label>Cantidad / Stock:</label>
        <input className='inputS' type="number" name="Cantidad" defaultValue={producto?.Cantidad} min="1" required />
        
        <label>Precio del Producto:</label>
        $<input className='inputS' type="number" name="Precio" defaultValue={producto?.Precio} min="1" required />
      </div>

      <hr />

      <div>
        <label htmlFor="descripcion">Detalles: <span className="colorGris">(opcional)</span></label>
        <textarea className='w60' id="descripcion" name="Descripcion" rows={4}  defaultValue={producto?.Descripcion}/>
      </div>
    </>
  )
}

// TODO: Agregar...
// Codigo de Barras
// Categoria
// Precio de Compra
// Imagen
