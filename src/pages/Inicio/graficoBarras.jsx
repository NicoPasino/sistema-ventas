export function GraficoBarras({ datos, valorDe, etiquetaDe, tituloDe, ariaLabel }) {
  const valores = datos.map(valorDe);
  const maximo = Math.max(...valores, 1);
  const indicesEje = datos.length > 2
    ? [0, Math.floor((datos.length - 1) / 2), datos.length - 1]
    : datos.map((_, indice) => indice);

  return (
    <div className="graficoBarras" role="img" aria-label={ariaLabel}>
      <div className="graficoBarrasPista">
        {datos.map((dato, indice) => {
          const valor = valores[indice];
          const alto = valor === 0 ? 0 : Math.max((valor / maximo) * 100, 3);

          return (
            <div key={indice} className="graficoBarraCol" title={tituloDe(dato)}>
              <div className="graficoBarra" style={{ height: `${alto}%` }} />
            </div>
          );
        })}
      </div>

      <div className="graficoBarrasEje">
        {indicesEje.map((indice) => <span key={indice}>{etiquetaDe(datos[indice])}</span>)}
      </div>
    </div>
  );
}
