import './formNueva.css'

export function FormNueva({tipo}) {
  return (
    <>
      <form action="/enviar-datos" method="post" className='formNueva'>
        <div>
          <label for="fecha">Fecha y Hora:</label>
          <input type="datetime-local" id="fecha" name="fecha" required />
        </div>

        <div>
          <label for="cliente">Nombre {tipo == "Ventas" ? "Proveedor" : "Cliente"}:</label>
          <input type="text" id="cliente" name="cliente" required />
        </div>

        <div>
          <label for="id">Producto:</label>
          <input type="number" id="id" name="id" />
        </div>
        <br />
        <div>
          <label for="descripcion">Descripción:</label>
          <input type="text" id="descripcion" name="descripcion" />
        </div>

        <div>
          <label for="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" min="1" required className='inputS'/>
        </div>

        <div>
          <label htmlFor="precio">Precio:</label>
          <input type="text" id="precio" name="precio" />
        </div>

        <div>
          <label for="tipo">Tipo de documento:</label>
          <select id="tipo" name="tipo">
            <option value="factura">Factura</option>
            <option value="boleta">Boleta</option>
            <option value="ticket">Ticket</option>
          </select>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </>
  )
}