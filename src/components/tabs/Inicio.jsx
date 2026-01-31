import React, { useState, useEffect, useContext } from "react";
import { getDate } from "../../utils/time/getDate";
import { TarjetaBlanca } from "./shared/tarjetaBlanca";
import { UserSettingsContext } from "../../userSettingsContext";
import { clientesAPI, ventasAPI, productosAPI } from "../../services/apiClient";
import { Cargando, ListaVacia, ErrorMensaje } from "./shared/textosComponent";
import { useItems } from "../useItems";

const fecha = getDate();

export default function Inicio() {
  const {getUser} = useContext(UserSettingsContext);
  // const ventas = useItems({itemsDB: ventasAPI});
  const productos = useItems({itemsDB: productosAPI});
  const clientes = useItems({itemsDB: clientesAPI});

  return (
    <>
      <div className="simpleCard">
        <span className="fecha">{fecha.m} {fecha.d}, {fecha.y}</span>
        <p> Bienvenido al Sistema <b>{getUser}</b></p>
      </div>
      
      <br />
      <div className="divTarjetas">
        <TarjetaBlanca title="📉 Productos con poco stock" footer={"Productos"}>
          { 
            (productos.loading) ? <Cargando />
            : (productos.items.error)
              ? <ErrorMensaje msg={productos.items.error}/>
              : <BajoStock lista={productos.items}/>
          }
        </TarjetaBlanca>

        <TarjetaBlanca title="🏆 Top 5 Clientes" footer={"Ventas"}>
          { 
            (clientes.loading)
            ? <Cargando />
            : (productos.items.error)
              ? <ErrorMensaje msg={productos.items.error}/>
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

function BajoStock({lista}){
  if (!lista) return <span className='colorGris'>La lista de Productos está vacía!.</span>
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
  const topClientes = [...lista]
    .sort((a, b) => b.nroCompras - a.nroCompras)
    .slice(0, 7);

  if (!lista) return <span className='colorGris'>La lista de Clientes está vacía!.</span>
  else return (
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