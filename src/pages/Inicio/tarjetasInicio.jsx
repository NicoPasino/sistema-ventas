import { useContext, useMemo } from 'react'
import { Cargando, ListaVacia, ErrorMensaje } from "../../components/pages/textosComponent";
import { TarjetaBlanca, TarjetaInfo } from "../../components/pages/tarjetas";
import { CartIcon, CategoriasIcon, ClientesIcon, ProductosIcon, VentasIcon, WarningIcon } from "../../assets/icons";
import { UserSettingsContext } from "../../context/userSettingsContext";
import { nivelStockCSS } from "../../utils/stock";
import { formatearMoneda, MoneyDisplay } from "../../utils/displayConvert";
import { getRankingClientesFacturacion } from "../../utils/estadisticasCliente";
import { getResumenStock, getResumenVentas } from "../../utils/estadisticasInicio";

const TOP = 5;

export function BajoStock({ productos, title, tab, top = TOP }) {
  const { bajoStock } = useMemo(() => getResumenStock(productos.itemsOriginales), [productos.itemsOriginales]);

  let contenido;

  if (productos.loading) contenido = <Cargando text={"productos"} />
  else if (productos.error) contenido = <ErrorMensaje msg={productos.error}/>
  else {
    const visibles = bajoStock.slice(0, top);

    contenido = visibles.length === 0 ? <ListaVacia text={"No hay productos con bajo stock." }/> : (
      <ul>
        {visibles.map((prod) => {
          return ( <li key={prod.idPublica ?? prod.nombre}>
                <strong>{prod.nombre}</strong> — <span className="colorGrisClaro">
                  <span className={nivelStockCSS(prod.nivel)}>{prod.cantidad}</span> en stock (mín. {prod.min}).
                </span>
              </li> )
        })}
        {bajoStock.length > top && (
          <p className="colorGrisClaro">+{bajoStock.length - top} productos...</p>
        )}
      </ul>
    );
  }

  return <TarjetaBlanca title={title} tab={tab}>{contenido}</TarjetaBlanca>
}

export function TopClientes({ clientes, ventas, title, tab, top = TOP }) {
  const ranking = useMemo(
    () => getRankingClientesFacturacion(clientes.itemsOriginales, ventas.itemsOriginales),
    [clientes.itemsOriginales, ventas.itemsOriginales]
  );

  let contenido;
  if (ventas.loading) contenido = <Cargando text={"ventas"} />
  else if (ventas.error) contenido = <ErrorMensaje msg={ventas.error}/>
  else {
    const topClientes = ranking.slice(0, top);

    contenido = topClientes.length === 0 ? <ListaVacia text={"Ningún cliente tiene compras todavía."}/> : (
      <ul>
        {topClientes.map((fila) => (
          <li key={fila.clave}>
            <strong>{fila.nombre}</strong> — {MoneyDisplay(fila.totalGastado)}{" "}
            <span className="colorGrisClaro">en {fila.totalVentas} compras.</span>
          </li>
        ))}
      </ul>
    );
  }

  return <TarjetaBlanca title={title} tab={tab}>{contenido}</TarjetaBlanca>
}

export function TopProductos({ ventas, title, tab, top = TOP }) {
  const topProductos = useMemo(() => {
    const contador = {};
    ventas.itemsOriginales.forEach((venta) => {
      const productos = Array.isArray(venta.productos) ? venta.productos : [];
      productos.forEach(({ producto, cantidad }) => {
        if (producto) contador[producto] = (contador[producto] || 0) + (Number(cantidad) || 0);
      });
    });

    return Object.entries(contador)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, top);
  }, [ventas.itemsOriginales, top]);

  let contenido;
  if (ventas.loading) contenido = <Cargando text={"productos más vendidos"}/>
  else if (ventas.error) contenido = <ErrorMensaje msg={ventas.error}/>
  else contenido = topProductos.length === 0 ? <ListaVacia text={"No hay ventas."}/> : (
    <ul>
      {topProductos.map((producto) => (
        <li key={producto.nombre}>
          <strong>{producto.nombre}</strong> — <span className="colorGrisClaro">{producto.cantidad} vendidos.</span>
        </li>
      ))}
    </ul>
  );

  return <TarjetaBlanca title={title} tab={tab}>{contenido}</TarjetaBlanca>
}

export function TarjetasResumen({ productos, clientes, ventas }) {
  const { handleTab } = useContext(UserSettingsContext)

  const resumenVentas = useMemo(() => getResumenVentas(ventas.itemsOriginales), [ventas.itemsOriginales]);
  const resumenStock = useMemo(() => getResumenStock(productos.itemsOriginales), [productos.itemsOriginales]);

  const moneda = (amount) => formatearMoneda(amount, { compacto: true });

  return (
    <>
      <GrupoTarjetas>
        <CantidadInfo datos={productos} text="Total Productos" color="#0d6efd" svg={<ProductosIcon />} onClick={() => handleTab("Productos")} />
        <CantidadInfo datos={ventas} text="Total Ventas" color="#198754" svg={<VentasIcon />} onClick={() => handleTab("Ventas")} />
        <CantidadInfo datos={clientes} text="Total Clientes" color="#0dcaf0" svg={<ClientesIcon />} onClick={() => handleTab("Clientes")} />
        <CantidadInfo datos={ventas} valor={resumenVentas.unidades} text="Unidades Vendidas" color="#198754" svg={<ProductosIcon />} onClick={() => handleTab("Ventas")} />
        {/* <CantidadInfo datos={productos} valor={resumenStock.unidades} text="Unidades en Stock" color="#6c757d" svg={<ProductosIcon />} onClick={() => handleTab("Productos")} /> */}
        <CantidadInfo datos={productos} valor={productos.categorias.length} text="Total Categorías" color="#ffc107" svg={<CategoriasIcon />} onClick={() => handleTab("Productos")} />
        {/* <CantidadInfo
          datos={productos}
          valor={resumenStock.alertas}
          color={hayAlertas ? "#dc3545" : "#198754"}
          svg={<WarningIcon />}
          text={hayAlertas ? "Alertas de Stock" : "Stock Sin Alertas"}
          onClick={() => handleTab("Productos")}
        /> */}
      </GrupoTarjetas>

      <GrupoTarjetas>
        <CantidadInfo datos={ventas} valor={resumenVentas.facturacion} formato={moneda} text="Facturación Total" color="#ffc107" svg={<CartIcon />} onClick={() => handleTab("Ventas")} />
        <CantidadInfo
          datos={ventas}
          valor={resumenVentas.ultimos30.ventas}
          detalle={moneda(resumenVentas.ultimos30.facturacion)}
          text="Ventas Últimos 30 Días"
          color="#0dcaf0"
          svg={<VentasIcon />}
          onClick={() => handleTab("Ventas")}
        />
        <CantidadInfo datos={productos} valor={resumenStock.valor} formato={moneda} text="Valor de Stock" color="#ffc107" svg={<CartIcon />} onClick={() => handleTab("Productos")} />
      </GrupoTarjetas>
    </>
  );
}

function GrupoTarjetas({ children }) {
  return (
    <section className="tarjetasGrupo">
      <div className="divTarjetasInfo">{children}</div>
    </section>
  );
}

function CantidadInfo({ datos, valor, detalle, formato, text, color, svg, onClick }) {
  let number;
  if (datos.loading) number = "…"
  else if (datos.error) number = "—"
  else if (formato) number = formato(valor ?? datos.itemsOriginales.length)
  else number = valor ?? datos.itemsOriginales.length;

  // el detalle solo se pinta cuando los datos cargaron bien y hay valor real
  const detalleFinal = datos.loading || datos.error ? null : detalle;

  return <TarjetaInfo text={text} number={number} detalle={detalleFinal} color={color} svg={svg} onClick={onClick} />;
}
