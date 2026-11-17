import { TarjetaBlanca } from "../../components/pages/tarjetas";
import { nivelStockCSS } from "../../utils/stock";
import { EstadoDatos } from "./estadosDatos";

export function TarjetaBajoStock({ productos, resumenStock, top = 5 }) {
  const { bajoStock } = resumenStock;
  const visibles = bajoStock.slice(0, top);

  return (
    <TarjetaBlanca title="Productos con bajo stock" tab="Productos">
      <EstadoDatos
        datos={productos}
        cargando="productos"
        vacio={bajoStock.length === 0 ? "No hay productos con bajo stock." : null}
      >
        <ul className="rankingLista">
          {visibles.map((producto) => {
            const agotado = producto.cantidad <= 0;

            return (
              <li key={producto.idPublica ?? producto.nombre} className="rankingItem">
                <span className="rankingTexto">
                  <span className="rankingNombre">{producto.nombre}</span>
                </span>
                <span className={`stockPill ${agotado ? "agotado" : ""}`}>
                  {agotado ? (
                    "AGOTADO"
                  ) : (
                    <>
                      <strong className={`stockPillCantidad ${nivelStockCSS(producto.nivel)}`}>
                        {producto.cantidad}
                      </strong>
                      <span className="stockPillMin">/ mín. {producto.min}</span>
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {bajoStock.length > top && (
          <p className="rankingResto">+{bajoStock.length - top} productos más</p>
        )}
      </EstadoDatos>
    </TarjetaBlanca>
  );
}
