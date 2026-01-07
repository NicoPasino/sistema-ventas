// import { toLocalISOString } from '../../../utils/time/toLocalISO';
import { ListNewItems } from "../shared/listNewItems";

export function NuevaVenta({NItems}) {
  const { newItems, setNewItems } = NItems;
  
  return (
    <>
      <div className='separados'>
        <label htmlFor="DNI">Documento DNI:</label>
        <input type="number" id="DNI" name="DNI"min="0" placeholder='12345678'/>

        <label htmlFor="nombre">Nombre Cliente:</label>
        <input type="text" id="nombre" name="nombre" required />
    
      </div>
      <hr />
      <ListNewItems tipo={"Venta"} newItemsState={{newItems, setNewItems}}/>
      <br /><hr />
      <div>
        <label htmlFor="descripcion">Detalles: <span className="colorGris">(opcional)</span></label>
        <textarea className='w60' id="descripcion" name="detalle" rows={4}/>
      </div>
      <br />
    </>
  )
}
