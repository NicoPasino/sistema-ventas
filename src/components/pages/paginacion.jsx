import './paginacion.css';
import { ChevronLeftIcon, ChevronRightIcon } from '../../assets/icons';
import { OPCIONES_POR_PAGINA } from '../../Hooks/usePaginacion';

const MAX_PAGINAS_VISIBLES = 7;
const ELLIPSIS = "...";

// primera y última página siempre visibles, el resto alrededor de la actual
function ventanaPaginas(pagina, totalPaginas, maxVisibles = MAX_PAGINAS_VISIBLES) {
  if (totalPaginas <= maxVisibles) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  const margen = Math.floor((maxVisibles - 2) / 2);
  let desde = Math.max(1, pagina - margen);
  const hasta = Math.min(totalPaginas, Math.max(desde + maxVisibles - 2, pagina + margen));
  desde = Math.max(1, hasta - maxVisibles + 2);

  const paginas = [];
  if (desde > 1) {
    paginas.push(1);
    if (desde > 2) paginas.push(ELLIPSIS);
  }
  for (let i = desde; i <= hasta; i++) paginas.push(i);
  if (hasta < totalPaginas) {
    if (hasta < totalPaginas - 1) paginas.push(ELLIPSIS);
    paginas.push(totalPaginas);
  }
  return paginas;
}

export function Paginacion({ pagina, totalPaginas, total, porPagina, setPorPagina, paginaAnterior, paginaSiguiente, irA, opciones = OPCIONES_POR_PAGINA }) {
  if (!total) return null;

  const desde = (pagina - 1) * porPagina + 1;
  const hasta = Math.min(pagina * porPagina, total);
  const esPrimera = pagina <= 1;
  const esUltima = pagina >= totalPaginas;

  return (
    <div className="paginacion">
      <span className="paginacionInfo">
        Mostrando <strong>{desde}</strong> - <strong>{hasta}</strong> de <strong>{total}</strong>
      </span>

      <div className="paginacionControles">
        <button
          type="button"
          className="paginacionBtn"
          title="Página anterior"
          aria-label="Página anterior"
          disabled={esPrimera}
          onClick={paginaAnterior}
        >
          <ChevronLeftIcon />
        </button>

        {ventanaPaginas(pagina, totalPaginas).map((p, i) => (
          p === ELLIPSIS
            ? <span key={`e${i}`} className="paginacionEllipsis">{ELLIPSIS}</span>
            : (
              <button
                key={p}
                type="button"
                className={`paginacionBtn ${p === pagina ? "paginacionBtnActivo" : ""}`}
                title={`Ir a la página ${p}`}
                aria-current={p === pagina ? "page" : undefined}
                onClick={() => irA(p)}
              >
                {p}
              </button>
            )
        ))}

        <button
          type="button"
          className="paginacionBtn"
          title="Página siguiente"
          aria-label="Página siguiente"
          disabled={esUltima}
          onClick={paginaSiguiente}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <label className="paginacionSize">
        Filas por página
        <select
          className="sort-select"
          title="Items por página"
          value={porPagina}
          onChange={(e) => setPorPagina(e.target.value)}
        >
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
