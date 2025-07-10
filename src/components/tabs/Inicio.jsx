import { useContext } from "react";
import { getDate } from "../../utils/time/getDate";
import { TarjetaBlanca } from "./shared/tarjetaBlanca";
import { UserSettingsContext } from "../../userSettingsContext";
import { ventasDB, productosDB } from "../../database/db";
import { useItems } from "../useItems";

const fecha = getDate();

export default function Inicio() {
  const {getUser} = useContext(UserSettingsContext);
  // const ventas = useItems({itemsDB: ventasDB});
  const productos = useItems({itemsDB: productosDB});

  return (
    <>
      <div className="simpleCard">
        <span className="fecha">{fecha.m} {fecha.d}, {fecha.y}</span>
        <p> Bienvenido al Sistema <b>{getUser}</b></p>
      </div>
      
      <br />
      <div className="divTarjetas">
        <TarjetaBlanca title="Productos con bajo Stock">
          <dl>
            {
              productos.items.length === 0
              ? <dt className='colorGris'>La lista de Productos está vacía!.</dt>
              : productos.items.map((prod) => {
                  if(prod.Cantidad<= 15){
                    return (
                      <div key={prod.ID}>
                        <dt>{prod.Producto}: <b>{prod.Cantidad}</b>.</dt>
                        {/* <dd>Cantidad:<b>{prod.Cantidad}</b> </dd> */}
                      </div>
                    )
                  }
                }
              )
            }
          </dl>
        </TarjetaBlanca>

        <TarjetaBlanca title="Clientes frecuentes">
          <span className="colorGris">Muy pronto...</span> 
          {/* <dl>
            {
              ventas.items.length === 0
              ? <dt className='colorGris'>La lista de Ventas está vacía!.</dt>
              : ventas.items.map((venta) => {
                  return (
                    <div key={venta.ID}>
                      <dt>{venta.Cliente}:</dt>
                      <dd>Compró <b>{venta.Cantidad}</b> productos</dd>
                    </div>
                  )
                }
              )
            }
          </dl> */}
        </TarjetaBlanca>

        <TarjetaBlanca title="Últimos Reportes">
          <span className="colorGris">Muy pronto...</span> 
        </TarjetaBlanca>
      </div>
    </>
  )
}