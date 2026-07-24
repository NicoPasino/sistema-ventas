import '../shared/formNueva.css';
import { useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import { usePopup } from '../../../context/PopupContext';
import { Button } from '../../shared/botones';
import { CheckRes } from '../../../utils/checkRes';
import { BuscadorCliente, BuscadorProductos } from './campoBuscador';
import { TablaNewItemsVenta } from './tablaNewItemsVenta';
import { useAlert } from '../../../context/AlertContext';
import { Alert } from '../../shared/Alert';

export function FormNuevaVenta() {
  const { ventas, productos } = useContext(DataContext);
  const { agregar } = ventas;
  const { items: productosList, reloadItems } = productos;
  const { showPopup } = usePopup();
  const [newItems, setNewItems] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const { showAlert, hideAlert } = useAlert();

  const handleClear = () => {
    setNewItems([]);
    setClienteSeleccionado(null);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const query = Object.fromEntries(new window.FormData(event.target));
    if (!clienteSeleccionado) return showPopup({ type: 'warning', message: 'Cliente no seleccionado.' });
    if (!newItems[0]) return showPopup({ type: 'warning', message: 'Producto/s no seleccionado/s.' });

    const ItemsId = newItems.map(i => i.producto.idPublica);
    const ItemsCant = newItems.map(i => parseInt(i.cantidad));

    const nuevoItem = { ...query, ItemsId, ItemsCant };
    const res = await agregar({ nuevoItem });

    const onSuccess = () => { event.target.reset(); handleClear(); reloadItems(); hideAlert() };
    const onShowAlert = (type, message) => showAlert({ type, message });
    CheckRes(res, { onSuccess, showPopup, onMessage: onShowAlert });
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <Alert />
      <div className='mb-6'>
        <BuscadorCliente clienteSelecManag={{clienteSeleccionado, setClienteSeleccionado}}/>
        <BuscadorProductos newItemsManag={{newItems, setNewItems}} />
        <TablaNewItemsVenta newItemsManag={{newItems, setNewItems}} productosList={productosList}/>
      </div>
      <div className='submitBtns'>
        <Button variant="danger" onClick={handleClear}>Limpiar</Button>
        <Button variant="success" type="submit">Confirmar</Button>
      </div>
    </form>
  )
}
