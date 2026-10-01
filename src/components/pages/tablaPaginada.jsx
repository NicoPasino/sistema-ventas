import { usePaginacion } from '../../Hooks/usePaginacion';
import { TablaGenerica } from './tablaGenerica';
import { Paginacion } from './paginacion';

export function TablaPaginada({ items = [], itemsManage, headers, editable = false, renderFilas, clavePaginacion, opcionesPorPagina }) {
  const { loading, error } = itemsManage;
  const { pagina, totalPaginas, total, porPagina, setPorPagina, listaPagina, irA, paginaAnterior, paginaSiguiente, opciones } =
    usePaginacion({ items, clave: clavePaginacion, opciones: opcionesPorPagina });

  return (
    <>
      <TablaGenerica itemsManage={itemsManage} headers={headers} editable={editable}>
        {renderFilas(listaPagina)}
      </TablaGenerica>
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
    </>
  )
}
