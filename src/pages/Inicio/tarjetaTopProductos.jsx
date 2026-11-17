import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { formatearMoneda, formatearNumero } from "../../utils/displayConvert";
import { EstadoDatos } from "./estadosDatos";

export function TarjetaTopProductos({ ventas, topProductos, top = 5 }) {
  const visibles = topProductos.slice(0, top);

  return (
    <TarjetaBlanca title="Top productos" tab="Ventas">
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
                <span className="rankingSecundario">{formatearNumero(producto.cantidad)} vendidos</span>
              </span>
              <span className="rankingValor">{formatearMoneda(producto.facturacion, { compacto: true })}</span>
            </li>
          ))}
        </ol>

        <p className="rankingNota">Ranking por facturación</p>
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
