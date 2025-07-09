export function NuevoProducto() {  
  return (
    <>
      <div className="separados">
        <label htmlFor="nombre">Nombre Producto:</label>
        <input className='w80' type="text" id="nombre" name="Producto" required />
        
        <label htmlFor="estadoP">Estado:</label>
        <select id="estadoP" name="Estado">
          <option value="true">Activo</option>
          <option value="false">No Activo</option>
        </select>
      </div>

      <div className="separados">
        <label htmlFor="cantidadProducto">Cantidad / Stock:</label>
        <input className='inputS' type="number" id="cantidadProducto" name="Cantidad" defaultValue="1" min="1" required />
        
        <label htmlFor="cantidadProducto">Precio del Producto:</label>
        $<input className='inputS' type="number" id="precio" name="Precio" defaultValue="1" min="1" required />
      </div>

      <hr />

      <div>
        <label htmlFor="descripcion">Detalles: <span className="colorGris">(opcional)</span></label>
        <textarea className='w60' id="descripcion" name="Descripcion" rows={4}/>
      </div>
    </>
  )
}

// TODO:
// Codigo de Barras
// Categoria
// Precio Compra
// Imagen
