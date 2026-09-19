import { UserSettingsContext } from "../../context/userSettingsContext";
import { DataContext } from "../../context/dataContext";
import { useContext } from "react";
import { getDate } from "../../utils/getDate";
import { HeaderCard } from "../../components/pages/tarjetas";
import { BajoStock, TopClientes, TopProductos, TarjetasResumen } from "./tarjetasInicio";

export default function Inicio() {
  const {getUser} = useContext(UserSettingsContext);
  const {productos, clientes, ventas} = useContext(DataContext);

  return (
    <>
      <HeaderCard title={getDate().fechaLarga} subtitle={`Bienvenido ${getUser}.`} />

      <TarjetasResumen productos={productos} clientes={clientes} ventas={ventas} />

      <div className="divTarjetas">
        <BajoStock productos={productos} title="📉 Productos con bajo stock" footer="Productos"/>

        <TopClientes clientes={clientes} top={5} title="🏆 Top 5 Clientes" footer="Ventas"/>

        <TopProductos ventas={ventas} top={5} title="🏆 Top Productos Vendidos" footer="Ventas"/>
      </div>
    </>
  )
}
