import '../../../components/pages/formNueva.css';
import { useContext, useState } from 'react';
import { DataContext } from '../../../context/dataContext';
import { useNotifications } from '../../../context/notificationContext';
import { Button } from '../../../components/shared/botones';
import { CheckRes } from '../../../utils/checkRes';
import { SeccionBuscarCliente } from './seccionBuscarCliente';
import { TablaNewItemsVenta } from './tablaNewItemsVenta';
import { Alert } from '../../../components/notification/Alert';
import { ModalSelectorProductos } from './ModalSelectorProductos';
import { Reloj } from '../../../components/pages/Reloj';
import { useCarritoVenta } from '../../../Hooks/useCarritoVenta';
import { GrayDisplay, MoneyDisplay } from '../../../utils/displayConvert';
import { NewIcon } from '../../../assets/icons';

export function FormNuevaVenta() {
  const { ventas, productos } = useContext(DataContext);
  const { agregar: agregarVenta, reloadItems: reloadVentas } = ventas;
  const { reloadItems: reloadProductos } = productos;
  const { showPopup, showAlert, hideAlert } = useNotifications();
  const carrito = useCarritoVenta();
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [detalle, setDetalle] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [selectorAbierto, setSelectorAbierto] = useState(false);

  const btnLimpiarDisabled = enviando || (carrito.items.length === 0 && !clienteSeleccionado && !detalle);

  const handleClear = () => {
    carrito.limpiar();
    setClienteSeleccionado(null);
    setDetalle('');
    hideAlert();
  };

  const handleLimpiar = () => {
    if (carrito.items.length === 0 && !clienteSeleccionado && !detalle) {
      handleClear();
      return;
    }
    if (!confirm('¿Vaciar la venta actual?')) return;
    handleClear();
  };

  async function submitHandler(event) {
    event.preventDefault();
    if (enviando) return;
    if (!clienteSeleccionado) return showPopup({ type: 'warning', message: 'Cliente no seleccionado.' });
    if (carrito.items.length === 0) return showPopup({ type: 'warning', message: 'Producto/s no seleccionado/s.' });

    if (carrito.lineasSinStock.length > 0) {
      const faltantes = carrito.lineasSinStock
        .slice(0, 3)
        .map(({ producto, disponible }) => `${producto?.nombre ?? 'Producto'} (faltan ${Math.abs(disponible)})`)
        .join(' · ');
      return showPopup({ type: 'warning', message: `Stock insuficiente: ${faltantes}` });
    }

    setEnviando(true);
    try {
      const nuevoItem = {
        DNI: Number(clienteSeleccionado.documento),
        ItemsId: carrito.items.map((item) => item.producto.idPublica),
        ItemsCant: carrito.items.map((item) => parseInt(item.cantidad, 10)),
        ...(detalle.trim() ? { Detalle: detalle.trim() } : {}),
      };
      const res = await agregarVenta({ nuevoItem });

      const onSuccess = () => {
        handleClear();
        reloadProductos();
        reloadVentas();
      };
      const onShowAlert = (type, message) => showAlert({ type, message });
      CheckRes(res, { onSuccess, showPopup, onMessage: onShowAlert });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <form className="formNueva  divMarginWAuto" onSubmit={submitHandler}>
        <Alert />

        <div className="ventaTop">
          <SeccionBuscarCliente clienteSelecManag={{ clienteSeleccionado, setClienteSeleccionado }} />

          <div className="ventaTopCampo ventaDiv">
            <div className="ventaTopLabel">
              <label htmlFor="ventaDetalle">Detalle de venta {GrayDisplay("(opcional)")}</label>
              <Reloj />
            </div>
            <textarea
              id="ventaDetalle"
              rows={2}
              className="ventaDetalleInput"
              placeholder="Ej.: pago en efectivo, retiro en local..."
              value={detalle}
              maxLength={200}
              onChange={(event) => setDetalle(event.target.value)}
            />
          </div>
        </div>

        <section className="ventaMid">
          <div className="ventaTablaScroll tablaSticky">
            <TablaNewItemsVenta carrito={carrito} />
          </div>
          <div className="ventaToolbar">
            <div className="ventaToolbarAcciones">
              <button
                type="button"
                className="ventaAgregarFila"
                onClick={() => setSelectorAbierto(true)}
              >
                <NewIcon /> Agregar Productos
              </button>
              <Button
                className="ventaLimpiar"
                variant="outline-danger"
                onClick={handleLimpiar}
                disabled={btnLimpiarDisabled}
              >
                Limpiar Venta
              </Button>
            </div>
          </div>
        </section>

        <footer className="ventaBottom">
          <div className="ventaTotal">
            <span className="ventaTotalLabel">Total</span>
            <span className="ventaTotalValor">{MoneyDisplay(carrito.total)}</span>
          </div>

          <div className="ventaMeta">
            <span>{carrito.cantidadProductos} productos · {carrito.unidades} unidades</span>
          </div>

          <Button
            className="ventaFinalizar"
            variant="success"
            size="lg"
            type="submit"
            loading={enviando}
            loadingText="Finalizando..."
          >
            Finalizar venta
          </Button>
        </footer>
      </form>

      {selectorAbierto && (
        <ModalSelectorProductos
          productosManage={productos}
          carrito={carrito}
          onClose={() => setSelectorAbierto(false)}
        />
      )}
    </>
  );
}
