import { openDB } from 'idb'; // npm install idb

// TODO pasar a una CLASE
// TODO pasar a una CLASE
// TODO pasar a una CLASE
// TODO pasar a una CLASE
// TODO pasar a una CLASE
// TODO pasar a una CLASE

export const initDB = async () => {
  return openDB('MiDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('productos')) {
        db.createObjectStore('productos', { keyPath: 'ID' });
      }
    },
  });
};

// agregar un producto
export const agregarProducto = async (producto) => {
  const db = await initDB();
  await db.add('productos', producto);
};

// obtener todos los productos
export const obtenerProductos = async () => {
  const db = await initDB();
  return db.getAll('productos');
};

// eliminar un producto
export const eliminarProducto = async (id) => {
  const db = await initDB();
  await db.delete('productos', id);
};

// actualizar un producto
export const actualizarProducto = async (producto) => {
  const db = await initDB();
  await db.put('productos', producto);
};

// obtener un producto por ID
export const obtenerProductoPorID = async (id) => {
  const db = await initDB();
  return db.get('productos', id);
};


/* 
// App.jsx
import { useEffect, useState } from 'react';
// import { agregarProducto, obtenerProductos } from './db';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerProductos();
      setProductos(datos);
    };
    cargar();
  }, []);

  const agregar = async () => {
    const nuevo = {
      ID: Date.now(),
      Producto: 'Nuevo producto',
      Descripción: 'Descripción de prueba',
      Cantidad: 1,
      Precio: 10.0,
    };
    await agregarProducto(nuevo);
    const actualizados = await obtenerProductos();
    setProductos(actualizados);
  };

  return (
    <div>
      <button onClick={agregar}>Agregar producto</button>
      <ul>
        {productos.map((p) => (
          <li key={p.ID}>
            {p.Producto} - {p.Descripción} - ${p.Precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
 */