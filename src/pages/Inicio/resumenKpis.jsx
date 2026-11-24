import { useContext } from "react";
import { UserSettingsContext } from "../../context/userSettingsContext";
import { TarjetaInfo } from "../../components/pages/tarjetas";
import {
  CategoriasIcon,
  ClientesIcon,
  MoneyIcon,
  ProductosIcon,
  StockIcon,
  TicketIcon,
  VentasIcon,
  WarningIcon,
} from "../../assets/icons";
import { MoneyDisplay, formatearNumero, tendencia } from "../../utils/displayConvert";

const NUMERO = (valor) => formatearNumero(valor);

function valorKpi(fuente, valor, formato = NUMERO) {
  if (fuente?.loading) return "…";
  if (fuente?.error) return "—";
  return formato(valor ?? 0);
}

function ValorMonedaKpi({ fuente, valor }) {
  if (fuente?.loading) return "…";
  if (fuente?.error) return "—";
  return <MoneyDisplay amount={valor ?? 0} compacto />;
}

function detalleKpi(fuente, valor, formato = NUMERO) {
  if (fuente?.loading || fuente?.error || valor === null || valor === undefined) return null;
  return formato(valor);
}

function tendenciaKpi(pct, dias) {
  const datos = tendencia(pct);
  if (!datos) return undefined;
  return { ...datos, titulo: `vs. los ${dias} días previos` };
}

export function ResumenKpis({ productos, clientes, ventas, resumen, dias }) {
  const { handleTab } = useContext(UserSettingsContext);
  const { resumenVentas, resumenStock, comparacion } = resumen;

  const categoriasFuente = {
    loading: productos.loading,
    error: productos.error || productos.errorCategorias,
  };

  // const hayAlertas = resumenStock.alertas > 0;

  return (
    <section className="dashboardKpis">
      <div className="kpisFila">
        <TarjetaInfo
          primaria
          text="Facturación total"
          tono="primary"
          svg={<MoneyIcon />}
          number={<ValorMonedaKpi fuente={ventas} valor={resumenVentas.facturacion} />}
          tendencia={tendenciaKpi(comparacion.facturacionPct, dias)}
          onClick={() => handleTab("Ventas")}
        />

        <TarjetaInfo
          primaria
          text="Ticket promedio"
          tono="success"
          svg={<TicketIcon />}
          number={<ValorMonedaKpi fuente={ventas} valor={resumenVentas.ticketPromedio} />}
          detalle={detalleKpi(ventas, resumenVentas.cantidadVentas, (valor) => `${NUMERO(valor)} ventas`)}
          tendencia={tendenciaKpi(comparacion.ticketPromedioPct, dias)}
          onClick={() => handleTab("Ventas")}
        />

        <TarjetaInfo
          primaria
          text="Ventas de hoy"
          tono="info"
          svg={<VentasIcon />}
          number={valorKpi(ventas, resumenVentas.hoy.ventas)}
          detalle={ventas?.loading || ventas?.error ? null : <MoneyDisplay amount={resumenVentas.hoy.facturacion ?? 0} compacto />}
          onClick={() => handleTab("Ventas")}
        />

        {/* <TarjetaInfo
          primaria
          text={hayAlertas ? "Alertas de stock" : "Stock sin alertas"}
          tono={hayAlertas ? "danger" : "success"}
          svg={<WarningIcon />}
          number={valorKpi(productos, resumenStock.alertas)}
          detalle={detalleKpi(productos, resumenStock.agotados.length, (valor) => `${NUMERO(valor)} ${valor === 1 ? "agotado" : "agotados"}`)}
          onClick={() => handleTab("Productos")}
        /> */}
      </div>

      <div className="kpisFila kpisFilaSecundaria">
        <TarjetaInfo
          text="Ventas totales"
          tono="primary"
          svg={<VentasIcon />}
          number={valorKpi(ventas, resumenVentas.cantidadVentas)}
          onClick={() => handleTab("Ventas")}
        />
        <TarjetaInfo
          text="Unidades vendidas"
          tono="success"
          svg={<StockIcon />}
          number={valorKpi(ventas, resumenVentas.unidades)}
          onClick={() => handleTab("Ventas")}
        />
        <TarjetaInfo
          text="Clientes"
          tono="info"
          svg={<ClientesIcon />}
          number={valorKpi(clientes, clientes.itemsOriginales?.length ?? 0)}
          onClick={() => handleTab("Clientes")}
        />
        <TarjetaInfo
          text="Productos activos"
          tono="success"
          svg={<ProductosIcon />}
          number={valorKpi(productos, resumenStock.totalProductos)}
          onClick={() => handleTab("Productos")}
        />
        <TarjetaInfo
          text="Categorías"
          tono="secondary"
          svg={<CategoriasIcon />}
          number={valorKpi(categoriasFuente, productos.categorias?.length ?? 0)}
          onClick={() => handleTab("Productos")}
        />
        {/* <TarjetaInfo
          text="Valor de stock"
          tono="warning"
          svg={<MoneyIcon />}
          number={valorKpi(productos, resumenStock.valor, MONEDA)}
          onClick={() => handleTab("Productos")}
        /> */}
      </div>
    </section>
  );
}
