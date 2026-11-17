import { Cargando, ErrorMensaje, ListaVacia } from "../../components/pages/textosComponent";

// Centraliza los tres estados que repiten las tarjetas del dashboard:
// cargando, error de API y lista vacía.
export function EstadoDatos({ datos, cargando, vacio, children }) {
  const fuentes = Array.isArray(datos) ? datos : [datos];

  if (fuentes.some((fuente) => fuente?.loading)) return <Cargando text={cargando} />;

  const error = fuentes.find((fuente) => fuente?.error)?.error;
  if (error) return <ErrorMensaje msg={error} />;

  if (vacio) return <ListaVacia text={vacio} />;

  return children;
}
