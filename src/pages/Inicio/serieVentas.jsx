import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { ToggleOpciones } from "../../components/pages/toggleOpciones";
import { MoneyDisplay, formatearMoneda, formatearNumero, tendencia } from "../../utils/displayConvert";
import { EstadoDatos } from "./estadosDatos";
import { GraficoBarras } from "./graficoBarras";

const OPCIONES = [
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 90, label: '90d' },
];

export function SerieVentas({ ventas, serie, comparacion, dias, onCambiarDias }) {
  const totalVentas = serie.reduce((acc, dia) => acc + dia.ventas, 0);
  const totalFacturacion = serie.reduce((acc, dia) => acc + dia.facturacion, 0);
  const variacion = tendencia(comparacion.facturacionPct);

  const acciones = (
    <ToggleOpciones
      ariaLabel="Período de la serie"
      opciones={OPCIONES}
      valor={dias}
      onChange={onCambiarDias}
    />
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
          <span><strong><MoneyDisplay amount={totalFacturacion} compacto /></strong> facturados</span>
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
          tituloDe={(dia) => `${dia.etiqueta}: ${formatearNumero(dia.ventas)} ventas · ${formatearMoneda(dia.facturacion, { compacto: true })}`}
          ariaLabel={`Ventas por día de los últimos ${dias} días`}
        />
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
