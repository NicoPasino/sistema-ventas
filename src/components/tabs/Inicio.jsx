import { UserSettingsContext } from "../../context/userSettingsContext";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { getDate } from "../../utils/time/getDate";
import { TarjetaBlanca } from "./shared/tarjetaBlanca";
import { Cargando, ListaVacia, ErrorMensaje } from "./shared/textosComponent";

export default function Inicio() {
  const {getUser} = useContext(UserSettingsContext);
  const {productos, clientes} = useContext(DataContext);
  const fecha = getDate();

  return (
    <>
      <div className="simpleCard">
        <span className="fecha">{fecha.m} {fecha.d}, {fecha.y}</span>
        <p> Bienvenido al Sistema <b>{getUser}</b></p>
      </div>
      
      <br />
      <div className="divTarjetas">
        <TarjetaBlanca title="📉 Productos con bajo stock" footer={"Productos"}>
          { 
            (productos.loading) ? <Cargando />
            : (productos.error)
              ? <ErrorMensaje msg={productos.error}/>
              : <BajoStock lista={productos.items}/>
          }
        </TarjetaBlanca>

        <TarjetaBlanca title="🏆 Top 5 Clientes" footer={"Ventas"}>
          { 
            (clientes.loading)
            ? <Cargando />
            : (productos.error)
              ? <ErrorMensaje msg={productos.error}/>
              : <TopClientes lista={clientes.items}/>
          }
        </TarjetaBlanca>

        <TarjetaBlanca title="🏆 Top Productos Vendidos" /* footer={"Ventas"} */>
          <span className="colorGris">Muy pronto...</span> 
        </TarjetaBlanca>
      </div>
    </>
  )
}

function BajoStock({ lista }){
  if (!lista) return <ListaVacia />
  else return (
    <ul>
      {lista.map((prod, i) => {
        if(prod.cantidad<= 15){
          return ( <li key={i}>
              <strong>{prod.nombre}</strong> — <span className="colorGrisClaro">{prod.cantidad} en stock.</span>
            </li> )
        }
      })}
    </ul>
  )
}

function TopClientes({ lista }) {
  if (!lista) return <ListaVacia />

  const topClientes = [...lista]
    .sort((a, b) => b.nroCompras - a.nroCompras)
    .slice(0, 7);

  return (
    <ul>
      {topClientes.map((cliente, index) => {
        if(cliente.nroCompras > 0){
          return(
            <li key={index}>
              <strong>{cliente.nombre}</strong> — <span className="colorGrisClaro">{cliente.nroCompras} compras.</span>
            </li>
          )
        }
      })}
    </ul>
  );
}
