import { UserSettingsContext } from "../../context/userSettingsContext";
import { DataContext } from "../../context/dataContext";
import { useContext, useMemo } from "react";
import { getDate } from "../../utils/getDate";
import { HeaderCard } from "../../components/pages/tarjetas";
import { BajoStock, TopClientes, TopProductos, TarjetasResumen } from "./tarjetasInicio";

export default function Inicio() {
  const {getUser} = useContext(UserSettingsContext);
  const {productos, clientes, ventas} = useContext(DataContext);

  const fechaLarga = useMemo(() => getDate().fechaLarga, []);

  return (
    <>
      <HeaderCard title={fechaLarga} subtitle={`Bienvenido ${getUser}.`} />

      <TarjetasResumen productos={productos} clientes={clientes} ventas={ventas} />

      <div className="divTarjetas">
        <BajoStock productos={productos} title="📉 Productos con bajo stock" tab="Productos" />

        <TopClientes clientes={clientes} ventas={ventas} title="🏆 Top 5 Clientes por facturación" tab="Ventas" />

        <TopProductos ventas={ventas} title="🏆 Top Productos Vendidos" tab="Ventas" />
      </div>
    </>
  )
}
