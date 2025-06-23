//TODO: juntar productosDB y ventasDB?

import { openDB } from 'idb'; // npm install idb

const initDB = async () => {
  return openDB('sistemaVentasDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("productos")) {
        db.createObjectStore("productos", { keyPath: 'ID', autoIncrement: true });
        console.log(`tabla de productos creada!`)
      }
      if (!db.objectStoreNames.contains("ventas")) {
        db.createObjectStore("ventas", { keyPath: 'ID', autoIncrement: true });
        console.log(`tabla de ventas creada!`)
      }
    },
  });
};

export class productosDB {
  // agregar un producto
  static agregarProducto = async (producto) => {
    const db = await initDB("productos");
    await db.add('productos', producto);
  };
  
  // obtener todos los productos
  static obtenerProductos = async () => {
    const db = await initDB("productos");
    return db.getAll('productos');
  };
  
  // eliminar un producto
  static eliminarProducto = async (id) => {
    const db = await initDB("productos");
    await db.delete('productos', id);
  };
  
  // actualizar un producto
  static actualizarProducto = async (producto) => {
    const db = await initDB("productos");
    await db.put('productos', producto);
  };
  
  // obtener un producto por ID
  static obtenerProductoPorID = async (id) => {
    const db = await initDB("productos");
    return db.get('productos', id);
  };
}

export class ventasDB {
  
  // agregar una Venta
  static agregarVenta = async (venta) => {
    const db = await initDB("ventas");
    await db.add('ventas', venta);
  };
  
  // obtener todos las Ventas
  static obtenerVentas = async () => {
    const db = await initDB("ventas");
    return db.getAll('ventas');
  };
  
  // eliminar una Venta
  static eliminarVenta = async (id) => {
    const db = await initDB("ventas");
    await db.delete('ventas', id);
  };
  
  // actualizar una Venta
  static actualizarVenta = async (venta) => {
    const db = await initDB("ventas");
    await db.put('ventas', venta);
  };
  
  // obtener una Venta por ID
  static obtenerVentaPorID = async (id) => {
    const db = await initDB("ventas");
    return db.get('ventas', id);
  };
}
