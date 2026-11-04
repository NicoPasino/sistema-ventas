import { createContext, useMemo } from "react";
import { useItems } from "../Hooks/useItems";
import { productosAPI, categoriasAPI, clientesAPI, ventasAPI } from "../services/api";

// 1. Crear contextos: uno por dominio, así cada consumidor sólo se
// re-renderiza cuando cambian los datos que realmente usa.
export const ProductosContext = createContext()
export const ClientesContext = createContext()
export const VentasContext = createContext()

// Contexto combinado para las vistas que necesitan los tres (ej. Inicio).
export const DataContext = createContext()

// 2. Crear proveedor
export function DataProvider ({children}) {
  // useItems devuelve un objeto memoizado con dependencias granulares,
  // por lo que estas referencias sólo cambian cuando cambia su dominio.
  const productos = useItems({itemsDB: productosAPI, categoriasDB: categoriasAPI, estadoInicial: "activos"});
  const clientes = useItems({itemsDB: clientesAPI});
  const ventas = useItems({itemsDB: ventasAPI});

  const value = useMemo(() => ({productos, clientes, ventas}), [productos, clientes, ventas]);

  return (
    <ProductosContext.Provider value={productos}>
      <ClientesContext.Provider value={clientes}>
        <VentasContext.Provider value={ventas}>
          <DataContext.Provider value={value}>
            {children}
          </DataContext.Provider>
        </VentasContext.Provider>
      </ClientesContext.Provider>
    </ProductosContext.Provider>
  )
}

// Usar proveedor
/* 
  <Proveedor>
    <App />
  </Proveedor>,
*/

// 3. Usar contexto
  // const productos = useContext(ProductosContext);
