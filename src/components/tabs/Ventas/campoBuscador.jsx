import { ModalEditarCliente } from '../Clientes/modalEditarCliente';
import { useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import { Combobox } from '../shared/Combobox';
import { QuantitySelector } from '../shared/QuantitySelector';

export function BuscadorCliente({ clienteSelecManag }) {
  const { clienteSeleccionado, setClienteSeleccionado } = clienteSelecManag;
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
        <ModalEditarCliente
          onClose={() => setShowModalNew(false)}
        />
      )}
    </div>
  )
}

export function BuscadorProductos({ newItemsManag }) {
  const { newItems, setNewItems } = newItemsManag;
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
      {/* <div>
        <label>Cantidad:</label>
        <QuantitySelector
          value={cantidad}
          onChange={setCantidad}
          min={1}
          // max={productoSeleccionado?.stock ?? 999}
        />
      </div> */}

      <div className='flex-1'>
        <label>Buscar Productos:</label>
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