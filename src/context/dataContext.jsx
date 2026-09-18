import { createContext, useMemo } from "react";
import { useItems } from "../Hooks/useItems";
import { productosAPI, categoriasAPI, clientesAPI, ventasAPI } from "../services/api";

// 1. Crear contexto
export const DataContext = createContext()

// 2. Crear proveedor
export function DataProvider ({children}) {
  const productos = useItems({itemsDB: productosAPI, categoriasDB: categoriasAPI});
  const clientes = useItems({itemsDB: clientesAPI});
  const ventas = useItems({itemsDB: ventasAPI});
  const value = useMemo(() => ({productos, clientes, ventas}), [productos, clientes, ventas]);

  return (
    <DataContext.Provider value={value}>
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