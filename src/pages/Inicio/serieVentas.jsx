import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { formatearMoneda, formatearNumero, tendencia } from "../../utils/displayConvert";
import { EstadoDatos } from "./estadosDatos";
import { GraficoBarras } from "./graficoBarras";

const OPCIONES = [7, 30, 90];

const MONEDA = (valor) => formatearMoneda(valor, { compacto: true });

export function SerieVentas({ ventas, serie, comparacion, dias, onCambiarDias }) {
  const totalVentas = serie.reduce((acc, dia) => acc + dia.ventas, 0);
  const totalFacturacion = serie.reduce((acc, dia) => acc + dia.facturacion, 0);
  const variacion = tendencia(comparacion.facturacionPct);

  const acciones = (
    <div className="serieToggle" role="group" aria-label="Período de la serie">
      {OPCIONES.map((opcion) => (
        <button
          key={opcion}
          type="button"
          className={opcion === dias ? "activo" : ""}
          aria-pressed={opcion === dias}
          onClick={() => onCambiarDias(opcion)}
        >
          {opcion}d
        </button>
      ))}
    </div>
  );

  return (
    <TarjetaBlanca title={`Ventas de los últimos ${dias} días`} tab="Ventas" acciones={acciones}>
      <EstadoDatos
        datos={ventas}
        cargando="ventas"
        vacio={totalVentas === 0 ? `Sin ventas en los últimos ${dias} días.` : null}
      >
        <div className="serieResumen">
          <span><strong>{formatearNumero(totalVentas)}</strong> ventas</span>
          <span><strong>{MONEDA(totalFacturacion)}</strong> facturados</span>
          {variacion && (
            <span className={`serieTendencia ${variacion.direccion}`} title={`vs. los ${dias} días previos`}>
              {variacion.texto} vs. período anterior
            </span>
          )}
        </div>

        <GraficoBarras
          datos={serie}
          valorDe={(dia) => dia.ventas}
          etiquetaDe={(dia) => dia.etiqueta}
          tituloDe={(dia) => `${dia.etiqueta}: ${formatearNumero(dia.ventas)} ventas · ${MONEDA(dia.facturacion)}`}
          ariaLabel={`Ventas por día de los últimos ${dias} días`}
        />
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
