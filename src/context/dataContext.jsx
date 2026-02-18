import { createContext } from "react";
import { useItems } from "../Hooks/useItems";
import { productosAPI, categoriasAPI, clientesAPI, ventasAPI } from "../services/apiClient";

// 1. Crear contexto
export const DataContext = createContext()

// 2. Crear proveedor
export function DataProvider ({children}) {
  const productos = useItems({itemsDB: productosAPI, categoriasDB: categoriasAPI});
  const clientes = useItems({itemsDB: clientesAPI});
  const ventas = useItems({itemsDB: ventasAPI});

  return (
    <DataContext.Provider value={ {productos, clientes, ventas} }>
      {children}
    </DataContext.Provider>
  )
}

// Usar proveedor
/* 
  <Proveedor>
    <App />
  </Proveedor>,
*/

// 3. Usar contexto
  // const [productos] = useContext(DataContext);