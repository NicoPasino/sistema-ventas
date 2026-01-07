import { useEffect, useState } from "react";

export function NuevoCliente({obtenerItem, id}) {
  const [cliente, setCliente] = useState();
  
  useEffect(() => {
    const obtenerProducto = async () => {
      if (id) setCliente(await obtenerItem(id));
    }
    obtenerProducto();
  },[id, obtenerItem])


  // SIN USO
  // SIN USO
  // SIN USO
  // SIN USO


  return (
    <>
      <div className="separados">
        {/* <input type="hidden" name="Id" value={id} /> */}
        <label htmlFor="nombre">Nombre Completo:</label>
        <input className='w80' type="text" id="nombre" name="Nombre" defaultValue={cliente?.nombre} required />
        
        {/* <label htmlFor="estadoP">Estado:</label>
        <select id="estadoP" name="activo" defaultValue={cliente?.estado ?? "true"}>
          <option value="true">Activo</option>
          <option value="false">No Activo</option>
        </select> */}
      </div>

      <div className="separados">
        <label>Cantidad / Stock:</label>
        <input className='inputS' type="number" name="Cantidad" defaultValue={cliente?.cantidad} min="1" required />
        
      </div>
      <label>ID Categoría:</label>
      <input className='inputS' type="number" name="IdCategoria" defaultValue={cliente?.idCategoria ?? 1} min="1" required />

    </>
  )
}


// SIN USO
// SIN USO
// SIN USO
// SIN USO

