import { TablaGenerica } from "../../components/pages/tablaGenerica";
import { MoneyDisplay } from "../../utils/displayConvert";
import { DeleteIcon, MasCantidadIcon, MenosCantidadIcon, WarningIcon } from "../../assets/icons";

export function TablaNewItemsVenta({ carrito }) {
  const { items, sumar, restar, quitar, subtotalDe, lineasSinStock } = carrito;
  const sinStockPorId = new Map(lineasSinStock.map((linea) => [linea.producto?.idPublica, linea]));

  const headers = ["Producto", "Cantidad", "Precio Unit.", "Subtotal"];

  return (
    <TablaGenerica
      itemsManage={{ loading: false, error: null }}
      headers={headers}
      editable
    >
      {items.length === 0 ? (
        <tr>
          <td colSpan={headers.length + 1} className="sinItems">
            <div className="ventaCarritoVacio">
              <span>Todavía no agregaste productos</span>
            </div>
          </td>
        </tr>
      ) : (
        items.map((item) => {
          const producto = item.producto ?? {};
          const lineaSinStock = sinStockPorId.get(producto.idPublica);

          return (
            <tr key={item.keyId}>
              <td className="tablaColNombre">{producto.nombre}</td>
              <td>
                <div className="ventaCantidad">
                  <span className="ventaCantidadValor">{item.cantidad}</span>
                  {lineaSinStock && (
                    <WarningIcono
                      title={`Stock insuficiente: ${producto.cantidad} en stock, ${lineaSinStock.pedido} en carrito`}
                    />
                  )}
                </div>
              </td>
              <td>{MoneyDisplay(producto.precio)}</td>
              <td>{MoneyDisplay(subtotalDe(item))}</td>
              <td>
                <div className="tablaColAcciones">
                  <i
                    className={`iconEdit svgView ${item.cantidad <= 1 ? 'svgDisabled' : ''}`}
                    title="Restar cantidad"
                    onClick={() => restar(item.keyId)}
                  >
                    <MenosCantidadIcon />
                  </i>
                  <i
                    className="iconEdit svgEdit"
                    title="Sumar cantidad"
                    onClick={() => sumar(item.keyId)}
                  >
                    <MasCantidadIcon />
                  </i>
                  <i
                    className="iconEdit svgDelete"
                    title="Quitar producto"
                    onClick={() => quitar(item.keyId)}
                  >
                    <DeleteIcon />
                  </i>
                </div>
              </td>
            </tr>
          );
        })
      )}
    </TablaGenerica>
  );
}

function WarningIcono({ title }) {
  return <span className="text-yellow-500 cursor-help" title={title}><WarningIcon /></span>;
}
