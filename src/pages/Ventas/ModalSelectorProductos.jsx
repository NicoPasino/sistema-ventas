import { useMemo, useState } from 'react';
import { Modal } from '../../components/shared/Modal';
import { Button, IconButton } from '../../components/shared/botones';
import { TablaPaginada } from '../../components/pages/tablaPaginada';
import { esActivo, GrayDisplay, MoneyDisplay, StockDisplay } from '../../utils/displayConvert';
import { MasCantidadIcon, MenosCantidadIcon } from '../../assets/icons';
import '../../components/pages/modals.css';

const HEADERS = ['Código', 'Producto', 'Categoría', 'Stock', 'Precio'];

function coincideBusqueda(producto, busqueda) {
  const campos = [producto.idPublica, producto.nombre, producto.descripcion, producto.categoria, producto.proveedor];
  return campos.some((campo) => String(campo ?? '').toLowerCase().includes(busqueda));
}

export function ModalSelectorProductos({ productosManage, carrito, onClose }) {
  const { itemsOriginales } = productosManage;
  const [busqueda, setBusqueda] = useState('');

  const lista = useMemo(() => {
    const activos = (itemsOriginales ?? []).filter((producto) => esActivo(producto.activo));
    const valor = busqueda.trim().toLowerCase();
    if (!valor) return activos;
    return activos.filter((producto) => coincideBusqueda(producto, valor));
  }, [itemsOriginales, busqueda]);

  return (
    <Modal
      title="Agregar productos"
      onClose={onClose}
      className="modalAncho"
      footer={
        <>
          <span className="modalSelectorResumen">
            {carrito.cantidadProductos} productos · {carrito.unidades} unidades
          </span>
          <Button variant="success" onClick={onClose}>Listo</Button>
        </>
      }
    >
      <input
        type="text"
        className="modalSelectorBuscar"
        placeholder="Buscar por código, nombre, categoría o proveedor..."
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
        autoFocus
      />

      <TablaPaginada
        items={lista}
        itemsManage={productosManage}
        headers={HEADERS}
        editable
        clavePaginacion="selectorProductosVenta"
        opcionesPorPagina={[5, 10, 25, 50]}
        mostrarSinResultados={false}
        renderFilas={(pagina) => (
          pagina.length === 0 ? (
            <tr><td colSpan={HEADERS.length + 1} className="sinItems">No se encontraron productos</td></tr>
          ) : (
            pagina.map((producto) => {
              const disponible = carrito.disponible(producto);
              const enCarrito = carrito.cantidadEnCarrito(producto.idPublica);
              const itemCarrito = carrito.items.find(
                (item) => item.producto?.idPublica === producto.idPublica
              );

              return (
                <tr key={producto.idPublica}>
                  <td className="tablaColID">{GrayDisplay(producto.idPublica)}</td>
                  <td className="tablaColNombre">{producto.nombre}</td>
                  <td className="tablaCol">{producto.categoria}</td>
                  <td className="tablaColCantidad">
                    {StockDisplay(producto.cantidad, producto.stockMinimo, producto.stockMaximo)}
                    {enCarrito > 0 && (
                      <div className="modalSelectorEnCarrito">{enCarrito} en carrito</div>
                    )}
                  </td>
                  <td className="tablaColPrecio">{MoneyDisplay(producto.precio)}</td>
                  <td>
                    <div className="tablaColAcciones">
                      <IconButton
                        variant="danger"
                        size="sm"
                        disabled={!itemCarrito}
                        title={
                          !itemCarrito
                            ? `${producto.nombre} no está en el carrito`
                            : itemCarrito.cantidad <= 1
                              ? `Quitar ${producto.nombre} del carrito`
                              : `Restar uno de ${producto.nombre} (${itemCarrito.cantidad} en carrito)`
                        }
                        onClick={() => itemCarrito && (
                          itemCarrito.cantidad <= 1
                            ? carrito.quitar(itemCarrito.keyId)
                            : carrito.restar(itemCarrito.keyId)
                        )}
                      >
                        <MenosCantidadIcon />
                      </IconButton>
                      <IconButton
                        variant="success"
                        size="sm"
                        title={disponible <= 0 ? `Sin stock disponible de ${producto.nombre}` : `Agregar ${producto.nombre}`}
                        disabled={disponible <= 0}
                        onClick={() => carrito.agregar(producto, 1)}
                      >
                        <MasCantidadIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })
          )
        )}
      />
    </Modal>
  );
}
