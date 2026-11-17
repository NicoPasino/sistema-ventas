import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { formatearMoneda } from "../../utils/displayConvert";
import { EstadoDatos } from "./estadosDatos";

export function TarjetaTopClientes({ clientes, ventas, ranking, top = 5 }) {
  const visibles = ranking.slice(0, top);

  return (
    <TarjetaBlanca title="Top clientes" tab="Ventas">
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
                  {cliente.totalVentas} {cliente.totalVentas === 1 ? "compra" : "compras"}
                </span>
              </span>
              <span className="rankingValor">{formatearMoneda(cliente.totalGastado, { compacto: true })}</span>
            </li>
          ))}
        </ol>
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
