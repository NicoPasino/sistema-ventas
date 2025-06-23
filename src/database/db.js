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
      if (!db.objectStoreNames.contains("reportes")) {
        db.createObjectStore("reportes", { keyPath: 'ID', autoIncrement: true });
        console.log(`tabla de reportes creada!`)
      }
    },
  });
};

// Clase genérica para manejar cualquier tabla
export class DBTable {
  constructor(tableName) {
    this.tableName = tableName;
  }

  agregar = async (item) => {
    const db = await initDB();
    await db.add(this.tableName, item);
  };

  obtenerTodos = async () => {
    const db = await initDB();
    return db.getAll(this.tableName);
  };

  eliminar = async (id) => {
    const db = await initDB();
    await db.delete(this.tableName, id);
  };

  actualizar = async (item) => {
    const db = await initDB();
    await db.put(this.tableName, item);
  };

  obtenerPorID = async (id) => {
    const db = await initDB();
    return db.get(this.tableName, id);
  };
}

// Instancias específicas para cada tabla
export const productosDB = new DBTable('productos');
export const ventasDB = new DBTable('ventas');
export const reportesDB = new DBTable('reportes');
