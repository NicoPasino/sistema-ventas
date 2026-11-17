import { useMemo } from "react";
import {
  getComparacionPeriodos,
  getResumenStock,
  getResumenVentas,
  getSerieDiariaVentas,
  getTopProductosVendidos,
  getUltimasVentas,
} from "../utils/estadisticasInicio";
import { getRankingClientesFacturacion } from "../utils/estadisticasCliente";

const TOP = 5;

// Concentra todas las agregaciones del dashboard en un solo lugar.
// Los componentes de Inicio quedan como presentación y no recorren las listas.
export function useResumenDashboard({ productos, clientes, ventas, dias = 30 }) {
  const ventasOriginales = ventas?.itemsOriginales;
  const productosOriginales = productos?.itemsOriginales;
  const clientesOriginales = clientes?.itemsOriginales;

  const resumenVentas = useMemo(
    () => getResumenVentas(ventasOriginales),
    [ventasOriginales]
  );

  const resumenStock = useMemo(
    () => getResumenStock(productosOriginales),
    [productosOriginales]
  );

  const serie = useMemo(
    () => getSerieDiariaVentas(ventasOriginales, dias),
    [ventasOriginales, dias]
  );

  const comparacion = useMemo(
    () => getComparacionPeriodos(ventasOriginales, dias),
    [ventasOriginales, dias]
  );

  const topProductos = useMemo(
    () => getTopProductosVendidos(ventasOriginales, { orden: "facturacion", top: TOP }),
    [ventasOriginales]
  );

  const rankingClientes = useMemo(
    () => getRankingClientesFacturacion(clientesOriginales, ventasOriginales),
    [clientesOriginales, ventasOriginales]
  );

  const ultimasVentas = useMemo(
    () => getUltimasVentas(ventasOriginales, TOP),
    [ventasOriginales]
  );

  return {
    resumenVentas,
    resumenStock,
    serie,
    comparacion,
    topProductos,
    rankingClientes,
    ultimasVentas,
  };
}
