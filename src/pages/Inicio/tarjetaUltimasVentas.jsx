import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { MoneyDisplay } from "../../utils/displayConvert";
import { getDate } from "../../utils/getDate";
import { EstadoDatos } from "./estadosDatos";

function fechaRelativa(fechaVenta) {
  const { tiempoTranscurrido, fecha } = getDate(fechaVenta);
  return tiempoTranscurrido ? `hace ${tiempoTranscurrido}` : fecha;
}

export function TarjetaUltimasVentas({ ventas, ultimasVentas }) {
  return (
    <TarjetaBlanca title="Últimas ventas" tab="Ventas">
      <EstadoDatos
        datos={ventas}
        cargando="últimas ventas"
        vacio={ultimasVentas.length === 0 ? "Todavía no hay ventas registradas." : null}
      >
        <ul className="rankingLista">
          {ultimasVentas.map((venta) => (
            <li key={venta.id} className="rankingItem">
              <span className="rankingTexto">
                <span className="rankingNombre">{venta.cliente}</span>
                <span className="rankingSecundario">
                  {venta.numero ? `N° ${venta.numero} · ` : ""}
                  {fechaRelativa(venta.fechaVenta)}
                </span>
              </span>
              <span className="rankingValor"><MoneyDisplay amount={venta.total} compacto /></span>
            </li>
          ))}
        </ul>
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
