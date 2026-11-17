import { useContext, useMemo, useState } from "react";
import { UserSettingsContext } from "../../context/userSettingsContext";
import { DataContext } from "../../context/dataContext";
import { getDate } from "../../utils/getDate";
import { useResumenDashboard } from "../../Hooks/useResumenDashboard";
import { HeroInicio } from "./heroInicio";
import { ResumenKpis } from "./resumenKpis";
import { SerieVentas } from "./serieVentas";
import { TarjetaBajoStock } from "./tarjetaBajoStock";
import { TarjetaTopProductos } from "./tarjetaTopProductos";
import { TarjetaTopClientes } from "./tarjetaTopClientes";
import { TarjetaUltimasVentas } from "./tarjetaUltimasVentas";

export default function Inicio() {
  const { getUser } = useContext(UserSettingsContext);
  const { productos, clientes, ventas } = useContext(DataContext);
  const [dias, setDias] = useState(30);

  const fechaLarga = useMemo(() => getDate().fechaLarga, []);
  const resumen = useResumenDashboard({ productos, clientes, ventas, dias });

  return (
    <div className="dashboard">
      <HeroInicio
        fechaLarga={fechaLarga}
        usuario={getUser}
        ultimaVenta={resumen.resumenVentas.ultimaVenta}
        cargandoVentas={ventas.loading}
        errorVentas={ventas.error}
      />

      <ResumenKpis
        productos={productos}
        clientes={clientes}
        ventas={ventas}
        resumen={resumen}
        dias={dias}
      />

      <div className="dashboardMedio">
        <SerieVentas
          ventas={ventas}
          serie={resumen.serie}
          comparacion={resumen.comparacion}
          dias={dias}
          onCambiarDias={setDias}
        />

        <TarjetaUltimasVentas ventas={ventas} ultimasVentas={resumen.ultimasVentas} />
      </div>

      <div className="divTarjetas">
        <TarjetaBajoStock productos={productos} resumenStock={resumen.resumenStock} top={8} />
        <TarjetaTopProductos ventas={ventas} topProductos={resumen.topProductos} />
        <TarjetaTopClientes clientes={clientes} ventas={ventas} ranking={resumen.rankingClientes} />
      </div>

      <p className="appVersion">Sistema de Ventas · v{__APP_VERSION__}</p>
    </div>
  );
}
