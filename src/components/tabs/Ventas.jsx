import { FormNueva } from "./shared/formNueva";
import { TablaList } from "./shared/tablaList";
import { ventasDB } from "../../database/db";
import { useEffect, useState } from "react";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);

  const cargarVentas = async () => {
    const datos = await ventasDB.obtenerVentas();
    setVentas(datos);
  };
  useEffect(() => {
    cargarVentas();
  }, []);

  const agregar = async () => {
    const nuevo = {
      Cliente: 'Cliente ' + String(Date.now()).at(-1),
      Productos: 'Descripción de venta',
      Cantidad: Math.round(Math.random()*8)+1,
      Precio: Math.round(Math.random()*90),
      Fecha: Date.now(),
    };
    await ventasDB.agregarVenta(nuevo);
    cargarVentas();
  };

  return (
    <>
      {/* <FormNueva /> */}
      <button onClick={agregar} className="colorVerdeClaro">+ Nuevo</button>
      <TablaList tipo={"ventas"} lista={ventas}/>
    </>
  )
}