import { useContext } from 'react'
import { Cargando, ListaVacia, ErrorMensaje } from "../../components/pages/textosComponent";
import { TarjetaBlanca, TarjetaInfo } from "../../components/pages/tarjetas";
import { CategoriasIcon, ClientesIcon, ProductosIcon, VentasIcon } from "../../assets/icons";
import { UserSettingsContext } from "../../context/userSettingsContext";

export function BajoStock({ productos, title, footer }) {
  let contenido;
  if (productos.loading) contenido = <Cargando />
  else if (productos.error) contenido = <ErrorMensaje msg={productos.error}/>
  else if (!productos.items) contenido = <ListaVacia />
  else contenido = (
    <ul>
      {productos.items.map((prod, i) => {
        if(prod.cantidad<= 15){
          return ( <li key={i}>
              <strong>{prod.nombre}</strong> — <span className="colorGrisClaro">{prod.cantidad} en stock.</span>
            </li> )
        }
      })}
    </ul>
  );

  return <TarjetaBlanca title={title} footer={footer}>{contenido}</TarjetaBlanca>
}

export function TopClientes({ clientes, title, footer, top = 5 }) {
  let contenido;
  if (clientes.loading) contenido = <Cargando />
  else if (clientes.error) contenido = <ErrorMensaje msg={clientes.error}/>
  else if (!clientes.items) contenido = <ListaVacia />
  else {
    const topClientes = [...clientes.items]
      .sort((a, b) => b.nroCompras - a.nroCompras)
      .filter((cliente) => cliente.nroCompras > 0)
      .slice(0, top);

    contenido = topClientes.length === 0 ? <ListaVacia /> : (
      <ul>
        {topClientes.map((cliente, index) => (
          <li key={index}>
            <strong>{cliente.nombre}</strong> — <span className="colorGrisClaro">{cliente.nroCompras} compras.</span>
          </li>
        ))}
      </ul>
    );
  }

  return <TarjetaBlanca title={title} footer={footer}>{contenido}</TarjetaBlanca>
}

export function TopProductos({ ventas, title, footer, top = 5 }) {
  let contenido;
  if (ventas.loading) contenido = <Cargando />
  else if (ventas.error) contenido = <ErrorMensaje msg={ventas.error}/>
  else if (!ventas.items) contenido = <ListaVacia />
  else {
    const contador = {};
    ventas.items.forEach((venta) => {
      const productos = Array.isArray(venta.productos) ? venta.productos : [];
      productos.forEach(({ producto, cantidad }) => {
        contador[producto] = (contador[producto] || 0) + cantidad;
      });
    });

    const topProductos = Object.entries(contador)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, top);

    contenido = topProductos.length === 0 ? <ListaVacia /> : (
      <ul>
        {topProductos.map((producto, index) => (
          <li key={index}>
            <strong>{producto.nombre}</strong> — <span className="colorGrisClaro">{producto.cantidad} vendidos.</span>
          </li>
        ))}
      </ul>
    );
  }

  return <TarjetaBlanca title={title} footer={footer}>{contenido}</TarjetaBlanca>
}

export function TarjetasResumen({ productos, clientes, ventas }) {
  const { handleTab } = useContext(UserSettingsContext)

  return (
    <div className="divTarjetasInfo">
      <CantidadInfo datos={productos} text="Total Productos" color="#0d6efd" svg={<ProductosIcon />} onClick={() => handleTab("Productos")} />
      <CantidadInfo datos={ventas} text="Total Ventas" color="#198754" svg={<VentasIcon />} onClick={() => handleTab("Ventas")} />
      {/* <CantidadInfo datos={productos} text="Categorías" color="#ffc107" svg={<CategoriasIcon />} cantidad={productos.categorias.length} onClick={() => handleTab("Productos")} /> */}
      <CantidadInfo datos={clientes} text="Total Clientes" color="#0dcaf0" svg={<ClientesIcon />} onClick={() => handleTab("Clientes")} />
    </div>
  );
}

function CantidadInfo({ datos, cantidad, text, color, svg, onClick }) {
  let number;
  if (datos.loading) number = "…"
  else if (datos.error) number = "—"
  else number = cantidad ?? datos.items.length;

  return <TarjetaInfo text={text} number={number} color={color} svg={svg} onClick={onClick} />;
}
