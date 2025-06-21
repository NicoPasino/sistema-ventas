import './tablas.css'

export function TablaList ({lista, acciones}) {
  return (
    // tabla de productos
    <table className="tablaList">
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {!lista ? "ERROR - Sin lista!" : 
        lista.length === 0 ? (
          <tr>
            <td> - </td>
            <td> Sin Productos! </td>
            <td> Agregue nuevos productos! </td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
          </tr>
        ) : lista.map((producto) => (
          <tr key={producto.ID}>
            <td>{producto.ID}</td>
            <td>{producto.Producto}</td>
            <td>{producto.Descripcion}</td>
            <td>{producto.Cantidad}</td>
            <td>${producto.Precio}</td>
            <td><button onClick={()=> {acciones.eliminar(producto.ID)}} className={'colorRojoClaro'} >Eliminar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}