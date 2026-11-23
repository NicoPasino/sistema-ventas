import { usePaginacion } from '../../Hooks/usePaginacion';
import { TablaGenerica } from './tablaGenerica';
import { Paginacion } from './paginacion';

export function TablaPaginada({ items = [], itemsManage, headers, editable = false, renderFilas, clavePaginacion, opcionesPorPagina, ordenCampos = [], mostrarSinResultados = true }) {
  const { loading, error, hayFiltros, hayOrden, limpiarFiltros } = itemsManage;
  const { pagina, totalPaginas, total, porPagina, setPorPagina, listaPagina, irA, paginaAnterior, paginaSiguiente, opciones } =
    usePaginacion({ items, clave: clavePaginacion, opciones: opcionesPorPagina });

  const sinResultados = mostrarSinResultados && !loading && !error && items.length === 0 && (hayFiltros || hayOrden);

  return (
    <div className="listaTabla divBackground">
      <div className="listaTablaScroll">
        <TablaGenerica
          itemsManage={itemsManage}
          headers={headers}
          editable={editable}
          ordenCampos={ordenCampos}
          sinResultados={sinResultados}
          onLimpiar={limpiarFiltros}
        >
          {renderFilas(listaPagina)}
        </TablaGenerica>
      </div>
      {!(loading || error) && (
        <Paginacion
          pagina={pagina}
          totalPaginas={totalPaginas}
          total={total}
          porPagina={porPagina}
          setPorPagina={setPorPagina}
          irA={irA}
          paginaAnterior={paginaAnterior}
          paginaSiguiente={paginaSiguiente}
          opciones={opciones}
        />
      )}
    </div>
  )
}
