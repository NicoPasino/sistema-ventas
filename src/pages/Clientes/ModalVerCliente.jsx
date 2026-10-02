import { useContext, useMemo } from "react";
import { DataContext } from "../../context/dataContext";
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/botones';
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { CorreoDisplay, GrayDisplay, MoneyDisplay } from '../../utils/displayConvert';
import { getEstadisticasCliente } from '../../utils/estadisticasCliente';
import { getDate } from '../../utils/getDate';
import { MailIcon, WhatsAppIcon } from '../../assets/icons';
import '../../components/pages/modals.css';

const ULTIMAS_VENTAS = 5;

function getLinkWhatsApp(telefono) {
  const numero = String(telefono ?? "").replace(/\D/g, "");
  return numero ? `https://wa.me/${numero}` : null;
}

export function ModalVerCliente({ cliente, onClose, onEditar }) {
  const { ventas } = useContext(DataContext);
  const { items: listaVentas } = ventas;

  const { totalVentas, totalGastado, ultimaFecha, ventas: suyas } = useMemo(
    () => getEstadisticasCliente(cliente, listaVentas),
    [cliente, listaVentas]
  );

  if (!cliente) return null;

  const { documento, nombre, correo, telefono, fechaCreacion } = cliente;
  const registrado = getDate(fechaCreacion);
  const ultimaCompra = ultimaFecha ? getDate(ultimaFecha) : null;
  const linkWhatsApp = getLinkWhatsApp(telefono);
  const ultimasVentas = [...suyas]
    .sort((a, b) => new Date(b.fechaVenta) - new Date(a.fechaVenta))
    .slice(0, ULTIMAS_VENTAS);

  return (
    <Modal
      title={nombre || `Cliente ${documento ?? "-"}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="danger" onClick={onClose}>Cerrar</Button>
          <Button variant="primary" onClick={onEditar}>Editar</Button>
        </>
      }
    >
      <h3 className="modalSeccion">Datos</h3>
      <div className="modalDatos">
        <div className="modalDato">
          <span className="modalLabel">Documento</span>
          <span className="modalValor">{documento ?? GrayDisplay("-")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Correo</span>
          <span className="modalValor">{CorreoDisplay(correo)}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Teléfono</span>
          <span className="modalValor">{telefono || GrayDisplay("(Sin teléfono)")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Registrado</span>
          <span className="modalValor">
            {registrado.fecha} {GrayDisplay(`(hace ${registrado.tiempoTranscurrido})`)}
          </span>
        </div>
      </div>

      <h3 className="modalSeccion">Contacto</h3>
      <div className="modalContactos">
        {correo ? (
          <a className="btn btn-outline-primary btn-sm" href={`mailto:${correo}`} title={`Escribir a ${correo}`}>
            <MailIcon /> Correo
          </a>
        ) : (
          <span className="modalSinContacto"><MailIcon /> {GrayDisplay("Sin correo")}</span>
        )}

        {linkWhatsApp ? (
          <a className="btn btn-outline-success btn-sm" href={linkWhatsApp} target="_blank" rel="noreferrer" title={`WhatsApp al ${telefono}`}>
            <WhatsAppIcon /> WhatsApp
          </a>
        ) : (
          <span className="modalSinContacto"><WhatsAppIcon /> {GrayDisplay("Sin teléfono")}</span>
        )}
      </div>

      <h3 className="modalSeccion">Compras</h3>
      <div className="modalDatos">
        <div className="modalDato">
          <span className="modalLabel">N° compras</span>
          <span className="modalValor">{totalVentas}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Total</span>
          <span className="modalValor">{MoneyDisplay(totalGastado)}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Última compra</span>
          <span className="modalValor">
            {ultimaCompra
              ? <> {ultimaCompra.fecha} - {ultimaCompra.hora} {GrayDisplay(`(hace ${ultimaCompra.tiempoTranscurrido})`)} </>
              : GrayDisplay("(Sin compras)")}
          </span>
        </div>
      </div>

      <h3 className="modalSeccion">Últimas ventas</h3>
      <TablaGenerica
        itemsManage={{ loading: false, error: null }}
        headers={["N°", "Fecha", "Total"]}
      >
        {ultimasVentas.length === 0 ? (
          <tr><td colSpan={3} className="sinItems">Este cliente todavía no tiene ventas</td></tr>
        ) : (
          ultimasVentas.map((v, i) => (
            <tr key={i}>
              <td className="tablaColID">{v.numero}</td>
              <td className="tablaColFecha">{getDate(v.fechaVenta).fecha}</td>
              <td className="tablaColPrecio">{MoneyDisplay(v.productos?.reduce((acc, p) => acc + (p.subTotal || 0), 0))}</td>
            </tr>
          ))
        )}
      </TablaGenerica>
    </Modal>
  );
}
