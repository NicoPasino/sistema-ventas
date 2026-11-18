import { GrayDisplay } from "../../utils/displayConvert"
import { Button } from "../shared/botones"

export function Cargando({text}){ return GrayDisplay(text ? `Cargando ${text}...` : "Cargando datos...") };
export function CargandoT({text}){ return <tr><td colSpan={20}><Cargando text={text} /></td></tr> };

export function ListaVacia({text}){ return GrayDisplay(text ? text : "La lista está vacía!") };
export function ListaVaciaT({text}){ return <tr><td colSpan={20}><ListaVacia text={text} /></td></tr> };

export function SinResultadosT({ onLimpiar, text = "Sin resultados para estos filtros" }) {
  return (
    <tr>
      <td colSpan={20} className="sinResultados">
        <ListaVacia text={text} />
        {onLimpiar && (
          <Button variant="outline-danger" size="sm" onClick={onLimpiar} title="Quitar filtros y orden">
            Limpiar filtros
          </Button>
        )}
      </td>
    </tr>
  )
}


export function ErrorMensaje({msg = "Error."}){ return <p className='colorRojoClaro'>{msg}</p> };
export function ErrorMensajeT({msg = "Error."}){ return <tr><td colSpan={20}><p className='colorRojoClaro'>{msg}</p></td></tr> };