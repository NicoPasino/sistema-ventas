import { CargandoT, ErrorMensajeT } from './shared/textosComponent';
import './shared/tablas.css'

export function TablaGenerica ({itemsManage, headers, children, editable = false}) {
  const {loading, error} = itemsManage;

  return (
    <table className="tablaList">
      <thead>
        <tr>{headers.map((e, i) => <th key={i}>{e}</th>)}{ editable ? <th>Acciones</th> : ""}</tr>
      </thead>
      <tbody>
        {
          loading 
            ? <CargandoT />
            : ( error ) 
              ? <ErrorMensajeT msg={error} />
              : children
        }
      </tbody>
    </table>
  )
}
