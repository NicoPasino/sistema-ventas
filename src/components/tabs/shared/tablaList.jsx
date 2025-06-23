import { useEffect, useState } from 'react';
import './tablas.css'

const tablas = {
  productos: ["ID", "Producto", "Descripcion", "Cantidad", "Precio"],
  ventas: ["ID", "Cliente", "Productos", "Cantidad", "Precio"],
  none: [""],
}

export function TablaList ({tipo="none", lista=[""], acciones}) {
  const [error, setError] = useState();

  useEffect(() => {
    if (!tipo || tipo === "none") setError("ERROR DE CÓDIGO: Tipo de tabla no definido.")
    if (!lista) setError("ERROR DE CÓDIGO: Sin lista!.")
  }, [tipo, lista]);

  const Tabla = () => {
    return (
      <table className="tablaList">
        <thead>
          <tr>
            { tablas[tipo].map((e) => <th key={tipo+e}>{e}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            lista.length === 0 
            ? <tr><td colSpan={20} className='colorGris'>La lista está vacía!.</td></tr>
            : lista.map((elemento) => 
                <tr key={elemento.ID}>
                  {tablas[tipo].map((e) =>
                    <td key={elemento.ID+e}>{elemento[e]}</td>
                  )}
                  <td><button onClick={()=> acciones.eliminar(elemento.ID)} className={'colorRojoClaro'}> Eliminar </button></td>
                </tr>
              )
          }
        </tbody>
      </table>
    )
  }
  
  return <> { error ? <p className='colorRojoClaro'>{error}</p> : <Tabla />} </>
}
