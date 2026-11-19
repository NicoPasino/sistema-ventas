import { ModalEditarCliente } from '../Clientes/modalEditarCliente';
import { ModalVerCliente } from '../Clientes/ModalVerCliente';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/dataContext';
import { BuscadorSugerencias } from '../../components/pages/BuscadorSugerencias';
import { Button } from '../../components/shared/botones';
import { DetalleCliente } from './DetalleCliente';

// Constantes a nivel módulo: mantienen estables las referencias que usa el
// useMemo del buscador y evitan recálculos/re-registros innecesarios.
const getKeyCliente = (cliente) => cliente.documento ?? cliente.nombre;
const getLabelCliente = (cliente) => cliente.nombre || String(cliente.documento ?? '');
const getDetalleCliente = (cliente) => cliente.documento ? `DNI ${cliente.documento}` : null;

export function BuscadorCliente({ clienteSelecManag }) {
  const { clienteSeleccionado, setClienteSeleccionado } = clienteSelecManag;
  const { clientes } = useContext(DataContext);
  // itemsOriginales: evitar que el buscador de la pestaña Clientes deje
  // filtrada la lista de esta pantalla (el DataProvider vive por encima de App).
  const { itemsOriginales } = clientes;
  const [showModalNew, setShowModalNew] = useState(false);
  const [verCliente, setVerCliente] = useState(false);

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

      <BuscadorSugerencias
        items={itemsOriginales ?? []}
        value={clienteSeleccionado}
        onChange={setClienteSeleccionado}
        getKey={getKeyCliente}
        getLabel={getLabelCliente}
        getDetalle={getDetalleCliente}
        placeholder="Buscar cliente por nombre o DNI..."
        maxItems={10}
        mensajeVacio="Sin resultados"
        showCreateButton
        crearLabel="Crear cliente"
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
