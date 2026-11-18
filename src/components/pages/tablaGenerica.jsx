import { ArrowDownIcon, ArrowUpIcon } from '../../assets/icons';
import { CargandoT, ErrorMensajeT, SinResultadosT } from './textosComponent';
import './tablas.css'

export function TablaGenerica ({itemsManage, headers, children, editable = false, ordenCampos = [], sinResultados = false, onLimpiar}) {
  const {loading, error, orden, ordenarItems} = itemsManage;

  const esOrdenable = (header) => ordenCampos.some((c) => c.label === header);

  const handleOrdenar = (header) => {
    const campo = ordenCampos.find((c) => c.label === header);
    if (!campo || !ordenarItems) return;
    const activo = orden?.campo === header;
    ordenarItems(campo.valor, activo && orden.direccion === "asc" ? "desc" : "asc", header);
  };

  return (
    <table className="tablaList">
      <thead>
        <tr>
          {headers.map((header, i) => {
            if (!esOrdenable(header)) return <th key={i}>{header}</th>;

            const activo = orden?.campo === header;
            const direccion = orden?.direccion ?? "asc";
            const proxima = activo && direccion === "asc" ? "descendente" : "ascendente";

            return (
              <th
                key={i}
                aria-sort={activo ? (direccion === "asc" ? "ascending" : "descending") : "none"}
              >
                <button
                  type="button"
                  className={`thOrdenable ${activo ? "thOrdenActivo" : ""}`}
                  onClick={() => handleOrdenar(header)}
                  title={`Ordenar por ${header} (${proxima})`}
                >
                  <span>{header}</span>
                  {/* Una sola flecha visible: la dirección actual en reposo y la
                      contraria al hacer hover (la que aplicará el click). */}
                  <span
                    className={`thOrdenFlechas thOrdenFlechas${activo && direccion === "desc" ? "Desc" : "Asc"} ${activo ? "thOrdenFlechasActivo" : ""}`}
                    aria-hidden="true"
                  >
                    <span className="thOrdenFlecha thOrdenFlechaAsc"><ArrowDownIcon /></span>
                    <span className="thOrdenFlecha thOrdenFlechaDesc"><ArrowUpIcon /></span>
                  </span>
                </button>
              </th>
            );
          })}
          {editable ? <th>Acciones</th> : ""}
        </tr>
      </thead>
      <tbody>
        {
          loading
            ? <CargandoT />
            : ( error )
              ? <ErrorMensajeT msg={error} />
              : sinResultados
                ? <SinResultadosT onLimpiar={onLimpiar} />
                : children
        }
      </tbody>
    </table>
  )
}
