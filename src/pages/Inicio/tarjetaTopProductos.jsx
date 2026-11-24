import { useMemo, useState } from "react";
import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { ToggleOpciones } from "../../components/pages/toggleOpciones";
import { MoneyDisplay, formatearNumero } from "../../utils/displayConvert";
import { getTopProductosVendidos } from "../../utils/estadisticasInicio";
import { EstadoDatos } from "./estadosDatos";

const MODOS = [
  { value: "facturacion", label: "Facturación" },
  { value: "cantidad", label: "Cantidad" },
];

export function TarjetaTopProductos({ ventas, top = 5 }) {
  const [modo, setModo] = useState("facturacion");
  const ventasOriginales = ventas?.itemsOriginales;

  const visibles = useMemo(() => {
    const orden = modo === "cantidad" ? "unidades" : "facturacion";
    return getTopProductosVendidos(ventasOriginales, { orden, top });
  }, [ventasOriginales, modo, top]);

  const acciones = (
    <ToggleOpciones
      ariaLabel="Modo de ranking de productos"
      opciones={MODOS}
      valor={modo}
      onChange={setModo}
    />
  );

  return (
    <TarjetaBlanca title="Top productos" tab="Ventas" acciones={acciones}>
      <EstadoDatos
        datos={ventas}
        cargando="productos más vendidos"
        vacio={visibles.length === 0 ? "No hay productos vendidos todavía." : null}
      >
        <ol className="rankingLista">
          {visibles.map((producto, indice) => (
            <li key={producto.nombre} className="rankingItem">
              <span className="rankingNumero">{indice + 1}</span>
              <span className="rankingTexto">
                <span className="rankingNombre">{producto.nombre}</span>
                <span className="rankingSecundario">
                  {modo === "cantidad"
                    ? <MoneyDisplay amount={producto.facturacion} compacto />
                    : `${formatearNumero(producto.cantidad)} vendidos`}
                </span>
              </span>
              <span className="rankingValor">
                {modo === "cantidad"
                  ? formatearNumero(producto.cantidad)
                  : <MoneyDisplay amount={producto.facturacion} compacto />}
              </span>
            </li>
          ))}
        </ol>

        {/* <p className="rankingNota">Ranking por {modo === "cantidad" ? "cantidad" : "facturación"}</p> */}
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
