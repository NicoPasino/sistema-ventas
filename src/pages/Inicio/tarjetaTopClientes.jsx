import { useMemo, useState } from "react";
import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { ToggleOpciones } from "../../components/pages/toggleOpciones";
import { MoneyDisplay, formatearNumero } from "../../utils/displayConvert";
import { getRankingClientesFacturacion } from "../../utils/estadisticasCliente";
import { EstadoDatos } from "./estadosDatos";

const MODOS = [
  { value: "facturacion", label: "Facturación" },
  { value: "compras", label: "Cantidad" },
];

export function TarjetaTopClientes({ clientes, ventas, top = 5 }) {
  const [modo, setModo] = useState("facturacion");

  const visibles = useMemo(() => {
    const orden = modo === "compras" ? "compras" : "facturacion";
    return getRankingClientesFacturacion(clientes?.itemsOriginales, ventas?.itemsOriginales, { orden }).slice(0, top);
  }, [clientes?.itemsOriginales, ventas?.itemsOriginales, modo, top]);

  const acciones = (
    <ToggleOpciones
      ariaLabel="Modo de ranking de clientes"
      opciones={MODOS}
      valor={modo}
      onChange={setModo}
    />
  );

  return (
    <TarjetaBlanca title="Top clientes" tab="Ventas" acciones={acciones}>
      <EstadoDatos
        datos={[clientes, ventas]}
        cargando="clientes"
        vacio={visibles.length === 0 ? "Ningún cliente tiene compras todavía." : null}
      >
        <ol className="rankingLista">
          {visibles.map((cliente, indice) => (
            <li key={cliente.clave} className="rankingItem">
              <span className="rankingNumero">{indice + 1}</span>
              <span className="rankingTexto">
                <span className="rankingNombre">{cliente.nombre}</span>
                <span className="rankingSecundario">
                  {modo === "compras"
                    ? <MoneyDisplay amount={cliente.totalGastado} compacto />
                    : `${formatearNumero(cliente.totalVentas)} ${cliente.totalVentas === 1 ? "compra" : "compras"}`}
                </span>
              </span>
              <span className="rankingValor">
                {modo === "compras"
                  ? formatearNumero(cliente.totalVentas)
                  : <MoneyDisplay amount={cliente.totalGastado} compacto />}
              </span>
            </li>
          ))}
        </ol>

        {/* <p className="rankingNota">Ranking por {modo === "compras" ? "cantidad" : "facturación"}</p> */}
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
