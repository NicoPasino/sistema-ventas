import { TarjetaBlanca } from "./shared/tarjetaBlanca";

export default function Inicio() {
  return (
    <>
      <h1>Inicio</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam ipsum consectetur beatae tempora debitis nulla, iste aliquam a doloremque voluptatibus eaque saepe, dolore soluta voluptate recusandae nihil iure iusto quos eveniet, minus aut facere similique! Quae simili qui perferendis assumenda. Praesentium explicabo repudiandae molestiae sapiente, nihil tempora voluptate asperiores minus ipsum illum similique quidem? Fuga voluptas aut soluta modi id! Quo quam fugit obcaecati dolore, maxime repudiandae maiores nostrum dolorum delectus dolores at soluta. Dolores iste sit, consequatur placeat sequi repellendus inventore reiciendis natus asperiores neque quisquam est maiores nemo debitis enim, nulla ipsum dolor itaque laudantium quibusdam quae officia non? Omnis, ex, inventore deserunt eveniet animi id veritatis magnam tempore, sit quisquam officia corporis esse ducimus. Impedit aut, porro ea modi minus omnis dolorum neque vitae fugiat tempore eos nostrum earum saepe dolores alias et, soluta accusamus. Obcaecati, consequatur velit possimus qui cupiditate dolores. Praesentium, a, delectus quam voluptatum, officiis officia aut inventore nostrum suscipit sunt consequatur? Iste optio nesciunt perferendis id cum eum vitae velit. Laboriosam ea cumque voluptas tempora sint, commodi dolorem. <br /> <br />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda asperiores necessitatibus veniam atque possimus consectetur quibusdam vel, quod odio eum velit. Et tempore ullam alias sed placeat officia consectetur unde? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla maiores ex accusamus fugiat ullam pariatur.</p>
      <br />
      <div className="divTarjetas">
        <TarjetaBlanca title="Productos más vendidos">
          <dl>
            <dt>Mi Producto:</dt>
            <dd>Vendido <b>7</b> veces</dd>
            <dt>Otro:</dt>
            <dd>Vendido <b>4</b> veces</dd>
          </dl>
        </TarjetaBlanca>
        <TarjetaBlanca title="Clientes frecuentes" text="Muy pronto..."> </TarjetaBlanca>
        <TarjetaBlanca title="Últimos Reportes">
          <dl>
            <dt>Cliente 1:</dt>
            <dd>El producto <b>FS-003</b> tiene varios....</dd>
            <dt>Cliente 2:</dt>
            <dd>El paquete de mi pedido viene con un....</dd>
          </dl>
        </TarjetaBlanca>
      </div>
    </>
  )
}