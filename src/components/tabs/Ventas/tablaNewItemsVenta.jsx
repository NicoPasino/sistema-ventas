import { TablaGenerica } from "../tablaGenerica";
import { MoneyDisplay } from "../../../utils/displayConvert";
import { DeleteIcon, MasCantidadIcon, MenosCantidadIcon, WarningIcon } from "../../icons";

export function TablaNewItemsVenta({ newItemsManag, productosList }) {
  const { newItems, setNewItems } = newItemsManag;

  const handleDelItem = (id) => setNewItems(newItems.filter((e) => e.keyId !== id));
  const handleRestarCantidad = (keyId) => {
    setNewItems(newItems.map((item) => {
      if (item.keyId === keyId && item.cantidad > 1) {
        const nuevaCantidad = item.cantidad - 1;
        return { ...item, cantidad: nuevaCantidad, total: item.producto.precio * nuevaCantidad };
      }
      return item;
    }));
  };
  const handleSumarCantidad = (keyId) => {
    setNewItems(newItems.map((item) => {
      if (item.keyId === keyId) {
        const nuevaCantidad = item.cantidad + 1;
        return { ...item, cantidad: nuevaCantidad, total: item.producto.precio * nuevaCantidad };
      }
      return item;
    }));
  };

  const headers = ["Producto", "Cantidad", "Precio Unit.", "Subtotal"];
  const calcularTotal = () => newItems.reduce((acc, item) => acc + item.total, 0);

  const hayStock = (idPub, cantidad) => productosList.find((p) => p.idPublica == idPub)?.cantidad - cantidad >= 0;

  return (
    <>
      <TablaGenerica
        itemsManage={{ loading: false, error: null }}
        headers={headers}
        editable
      >
        {newItems.length === 0 ? (
          <tr><td colSpan={headers.length + 1} className="sinItems">No hay productos agregados</td></tr>
        ) : (
          newItems.map((item) => (
            <tr key={item.keyId}>
              <td>{item.producto.nombre}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <span>{item.cantidad}</span>
                  {!hayStock(item.producto.idPublica, item.cantidad) && <WarningI title="Stock insuficiente"/>}
                </div>
              </td>
              <td>{MoneyDisplay(item.producto.precio)}</td>
              <td>{MoneyDisplay(item.total)}</td>
              <td>
                <div className='flex items-center justify-around'>
                  <i className='iconEdit svgView' onClick={() => handleRestarCantidad(item.keyId)}> <MenosCantidadIcon /> </i>
                  <i className='iconEdit svgEdit' onClick={() => handleSumarCantidad(item.keyId)}> <MasCantidadIcon /> </i>
                  <i className='iconEdit svgDelete' onClick={() => handleDelItem(item.keyId)}> <DeleteIcon /> </i>
                </div>
              </td>
            </tr>
          ))
        )}
      </TablaGenerica>
      {newItems.length > 0 && (
        <div className='total'><span className='totalText'>Total:</span> <span className='totalValue'>{MoneyDisplay(calcularTotal())}</span></div>
      )}
    </>
  )
}

function WarningI({title}) { 
  return <span className="text-yellow-500 cursor-help" title={title}><WarningIcon /></span>;
}