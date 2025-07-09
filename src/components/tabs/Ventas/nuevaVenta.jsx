import { toLocalISOString } from '../../../utils/time/toLocalISO';
import { ListNewItems } from "../shared/listNewItems";

export function NuevaVenta({NItems}) {
  const { newItems, setNewItems } = NItems;
  
  return (
    <>
      <div className='separados'>
        <label htmlFor="fecha">Fecha y Hora:</label>
        <input type="datetime-local" id="fecha" name="Fecha" defaultValue={toLocalISOString(new Date())} />
        {/* <button className='btnSvg'> <ReloadIcon /> </button> */}
    
        <label htmlFor="tipo">Tipo de documento:</label>
        <select id="tipo" name="TipoR">
          <option value="factura">Factura</option>
          <option value="boleta">Boleta</option>
          <option value="ticket">Ticket</option>
        </select>
      </div>
      <hr />
      <div className='separados'>
        <label htmlFor="nombre">Nombre Cliente:</label>
        <input type="text" id="nombre" name="Cliente" required />
    
        <label htmlFor="tipoDoc">Tipo documento:</label>
        <select id="tipoDoc" name="tipoDoc">
          <option value="Ninguno">Ninguno</option>
          <option value="CUIT">CUIT</option>
          <option value="DNI">DNI</option>
        </select>
    
        <label htmlFor="cuentaC">Cuenta corriente:</label>
        <select id="cuentaC" name="CuentaC">
          <option value="no">No</option>
          <option value="si">Si</option>
        </select>
    
        <label htmlFor="CUIT">CUIT / Documento:</label>
        <input type="number" id="CUIT" name="CUIT"min="0" placeholder='12-12345678-0'/>
      </div>
      <hr />
      <ListNewItems tipo={"Venta"} newItemsState={{newItems, setNewItems}}/>
      <br /><hr />
      <div>
        <label htmlFor="descripcion">Detalles: <span className="colorGris">(opcional)</span></label>
        <textarea className='w60' id="descripcion" name="Descripcion" rows={4}/>
      </div>
      <br />
    </>
  )
}