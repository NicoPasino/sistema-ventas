import { ModalEditarCliente } from '../Clientes/modalEditarCliente';
import { ModalVerCliente } from '../Clientes/ModalVerCliente';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/dataContext';
import { Combobox } from '../../components/pages/Combobox';
import { Button } from '../../components/shared/botones';
import { DetalleCliente } from './DetalleCliente';

export function BuscadorCliente({ clienteSelecManag }) {
  const { clienteSeleccionado, setClienteSeleccionado } = clienteSelecManag;
  const { clientes } = useContext(DataContext);
  // itemsOriginales: evitar que el buscador de la pestaña Clientes deje
  // filtrada la lista de esta pantalla (el DataProvider vive por encima de App).
  const { itemsOriginales } = clientes;
  const [showModalNew, setShowModalNew] = useState(false);
  const [verCliente, setVerCliente] = useState(false);

  const getItemKey = (item) => item.documento;
  // Sin DNI a la vista: el documento queda como clave, no como texto.
  const getItemLabel = (item) => item.nombre || item.documento;

  return (
    <div className="ventaTopCampo">
      <div className="ventaTopLabel">
        <label>Cliente</label>
        <Button
          size="sm"
          variant="outline-primary"
          disabled={!clienteSeleccionado}
          onClick={() => setVerCliente(true)}
        >
          Ver cliente
        </Button>
      </div>

      <Combobox
        items={itemsOriginales ?? []}
        value={clienteSeleccionado}
        onChange={(cliente) => setClienteSeleccionado(cliente)}
        placeholder="Seleccionar cliente..."
        getItemKey={getItemKey}
        getItemLabel={getItemLabel}
        maxItems={20}
        showCreateButton={true}
        onCreate={() => setShowModalNew(true)}
      />

      <DetalleCliente cliente={clienteSeleccionado} />

      {showModalNew && (
        <ModalEditarCliente
          onClose={() => setShowModalNew(false)}
        />
      )}

      {verCliente && clienteSeleccionado && (
        <ModalVerCliente
          cliente={clienteSeleccionado}
          onClose={() => setVerCliente(false)}
        />
      )}
    </div>
  );
}

