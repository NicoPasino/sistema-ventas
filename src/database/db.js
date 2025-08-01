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

  obtenerPorId = async (id) => {
    const db = await initDB();
    return db.get(this.tableName, id);
  };

  // buscar por un campo específico
  buscarPorCampo = async (campo = "ID", valor) => {
    const db = await initDB();
    const allItems = await db.getAll(this.tableName);
    if (!valor) {
      return allItems;
    }
    return allItems.filter(item => {
      const fieldValue = item[campo];
      if (fieldValue === undefined || fieldValue === null) return false;
      return String(fieldValue).toLowerCase().includes(String(valor).toLowerCase());
    });
  }
}

// Instancias específicas para cada tabla
export const productosDB = new DBTable('productos');
export const ventasDB = new DBTable('ventas');
export const reportesDB = new DBTable('reportes');
