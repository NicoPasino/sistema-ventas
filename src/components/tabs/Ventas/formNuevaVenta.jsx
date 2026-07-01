import '../shared/formNueva.css';
import { useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import { TablaGenerica } from '../tablaGenerica';
import ApiResponsePopup from '../../shared/ApiResponsePopup';
import { Modal } from '../../shared/Modal';
import { Button } from '../../shared/botones';
import { ModalNuevoClienteInline } from '../Clientes/modalEditarCliente';
import { CancelIcon, DeleteIcon } from '../../icons';
import { Combobox } from '../shared/Combobox';
import { QuantitySelector } from '../shared/QuantitySelector';

export function FormNuevaVenta() {
  const { ventas } = useContext(DataContext);
  const { agregar } = ventas;
  const [newItems, setNewItems] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    const query = Object.fromEntries(new window.FormData(event.target));
    if (!newItems[0]) return setApiResponse({ message: "Se requiere al menos un producto." });

    const ItemsId = newItems.map(i => i.producto.idPublica);
    const ItemsCant = newItems.map(i => parseInt(i.cantidad));

    const nuevoItem = { ...query, ItemsId, ItemsCant };
    const res = await agregar({ nuevoItem });

    setApiResponse(res);
    if (res.message || res.error) return;
    if (res.ok) {
      event.target.reset();
      setNewItems([]);
      setClienteSeleccionado(null);
    }
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <NuevaVenta
        newItems={newItems}
        setNewItems={setNewItems}
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={setClienteSeleccionado}
      />

      <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />

      <div className='submitBtns'>
        <Button variant="danger" onClick={() => { setNewItems([]); setClienteSeleccionado(null); }}>Limpiar</Button>
        <Button variant="success" type="submit">Confirmar</Button>
      </div>
    </form>
  )
}

function NuevaVenta({ newItems, setNewItems, clienteSeleccionado, setClienteSeleccionado }) {
  return (
    <div className='mb-6'>
      <BuscadorCliente
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={setClienteSeleccionado}
      />

      <BuscadorProductos newItems={newItems} setNewItems={setNewItems} />

      <ItemsVenta newItems={newItems} setNewItems={setNewItems} />
    </div>
  )
}

function BuscadorCliente({ clienteSeleccionado, setClienteSeleccionado }) {
  const { clientes } = useContext(DataContext);
  const { items } = clientes;
  const [showModalNew, setShowModalNew] = useState(false);

  const getItemKey = (item) => item.documento;
  const getItemLabel = (item) => `${item.documento} - ${item.nombre}`;

  return (
    <div>
      <label>Cliente:</label>
      <Combobox
        items={items}
        value={clienteSeleccionado}
        onChange={(cliente) => setClienteSeleccionado(cliente)}
        placeholder="Seleccionar cliente..."
        getItemKey={getItemKey}
        getItemLabel={getItemLabel}
        maxItems={20}
        showCreateButton={true}
        onCreate={() => setShowModalNew(true)}
        className='mb-6'
      />
      <input type="hidden" name="DNI" value={clienteSeleccionado?.documento ?? ""} />
      <input type="hidden" name="nombre" value={clienteSeleccionado?.nombre ?? ""} />

      {showModalNew && (
        <Modal title="Nuevo Cliente" onClose={() => setShowModalNew(false)}>
          <ModalNuevoClienteInline
            onClose={() => setShowModalNew(false)}
            onClienteCreado={(cliente) => {
              setClienteSeleccionado(cliente);
              setShowModalNew(false);
            }}
          />
        </Modal>
      )}
    </div>
  )
}

function BuscadorProductos({ newItems, setNewItems }) {
  const { productos } = useContext(DataContext);
  const { items } = productos;
  const [cantidad, setCantidad] = useState(1);

  const getItemKey = (item) => item.idPublica;
  const getItemLabel = (item) => `${item.idPublica} - ${item.nombre} - $${item.precio}`;

  const handleSeleccionarProducto = (producto) => {
    const cant = parseInt(cantidad) || 1;
    const newData = {
      keyId: Date.now(),
      producto,
      cantidad: cant,
      total: producto.precio * cant,
    };
    setNewItems([...newItems, newData]);
    setCantidad(1);
  };

  return (
    <div className='flex-row mb-6'>
      <div>
        <label>Cantidad:</label>
        <QuantitySelector
          value={cantidad}
          onChange={setCantidad}
          min={1}
        />
      </div>

      <div className='flex-1'>
        <label>Producto:</label>
        <Combobox
          items={items}
          value={null}
          onChange={(producto) => handleSeleccionarProducto(producto)}
          placeholder="Seleccionar producto..."
          getItemKey={getItemKey}
          getItemLabel={getItemLabel}
          maxItems={20}
        />
      </div>
    </div>
  )
}

function ItemsVenta({ newItems, setNewItems }) {
  const handleDelItem = (id) => {
    setNewItems(newItems.filter((e) => e.keyId !== id));
  };

  const calcularTotal = () => {
    const cantTotal = newItems.reduce((acc, item) => acc + item.total, 0);
    return cantTotal.toFixed(2);
  };

  const headers = ["Producto", "Cantidad", "Precio Unit.", "Total"];

  return (
    <>
      <TablaGenerica
        itemsManage={{ loading: false, error: null }}
        headers={headers}
        editable
      >
        {newItems.length === 0 ? (
          <tr>
            <td colSpan={headers.length + 1} style={{ textAlign: 'center', color: '#999' }}>
              No hay productos agregados
            </td>
          </tr>
        ) : (
          newItems.map((item) => (
            <tr key={item.keyId}>
              <td>{item.producto.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.producto.precio}</td>
              <td>${item.total}</td>
              <td>
                <i className='iconEdit svgDelete' onClick={()=> handleDelItem(item.keyId)}> <DeleteIcon /> </i>
              </td>
            </tr>
          ))
        )}
      </TablaGenerica>
      {newItems.length > 0 && (
        <span><b>Total</b>: ${calcularTotal()}</span>
      )}
    </>
  )
}
