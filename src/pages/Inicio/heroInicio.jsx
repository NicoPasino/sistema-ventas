import { useContext } from "react";
import { Button } from "../../components/shared/botones";
import { NewIcon } from "../../assets/icons";
import { UserSettingsContext } from "../../context/userSettingsContext";
import { getDate } from "../../utils/getDate";

function ultimaVentaTexto(venta) {
  if (!venta?.fechaVenta) return null;
  const { tiempoTranscurrido } = getDate(venta.fechaVenta);
  return tiempoTranscurrido ? `Última venta hace ${tiempoTranscurrido}` : null;
}

export function HeroInicio({ fechaLarga, usuario, ultimaVenta, cargandoVentas, errorVentas }) {
  const { handleTab } = useContext(UserSettingsContext);

  let ultima = null;
  if (cargandoVentas) ultima = "Cargando última venta...";
  else if (!errorVentas && ultimaVenta) ultima = ultimaVentaTexto(ultimaVenta);
  else if (!errorVentas) ultima = "Todavía no hay ventas registradas.";

  return (
    <section className="heroInicio">
      <div className="heroTexto">
        <p className="heroEyebrow">Dashboard</p>
        <h1 className="heroTitulo">{fechaLarga}</h1>
        <p className="heroSubtitulo">Bienvenido, {usuario}.</p>
      </div>

      <div className="heroAcciones">
        <Button variant="success" size="md" onClick={() => handleTab("Venta")}>
          <NewIcon /> Nueva venta
        </Button>
        {ultima && <span className="heroUltima">{ultima}</span>}
      </div>
    </section>
  );
}
