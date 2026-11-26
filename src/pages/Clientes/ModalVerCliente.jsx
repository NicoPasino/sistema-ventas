import { useContext, useMemo, useState } from "react";
import { VentasContext } from "../../context/dataContext";
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/botones';
import { AccionesContacto } from '../../components/shared/accionesModal';
import { TablaGenerica } from '../../components/pages/tablaGenerica';
import { CorreoDisplay, formatearMoneda, formatearNumero, GrayDisplay } from '../../utils/displayConvert';
import { getEstadisticasCliente } from '../../utils/estadisticasCliente';
import { aTimestamp, getDate } from '../../utils/getDate';
import '../../components/pages/modals.css';
import { totalVenta } from '../../utils/ventas';

const VENTAS_RESUMEN = 5;
const VENTAS_PASO = 10;

export function ModalVerCliente({ cliente, onClose, onEditar }) {
  const ventas = useContext(VentasContext);
  const { items: listaVentas } = ventas;
  const [cantidadVisible, setCantidadVisible] = useState(VENTAS_RESUMEN);

  const { totalVentas, totalGastado, ventas: suyas } = useMemo(
    () => getEstadisticasCliente(cliente, listaVentas),
    [cliente, listaVentas]
  );

  const ventasOrdenadas = useMemo(
    () => [...suyas].sort((a, b) => aTimestamp(b.fechaVenta) - aTimestamp(a.fechaVenta)),
    [suyas]
  );

  if (!cliente) return null;

  const { documento, nombre, correo, telefono, fechaCreacion } = cliente;
  const registrado = getDate(fechaCreacion);

  const visibles = ventasOrdenadas.slice(0, cantidadVisible);
  const quedan = ventasOrdenadas.length - visibles.length;

  return (
    <Modal
      title={nombre || `Cliente ${documento ?? "-"}`}
      onClose={onClose}
      className="modalCliente"
      headerAcciones={<AccionesContacto correo={correo} telefono={telefono} />}
      footer={
        <>
          <Button variant="danger" onClick={onClose}>Cerrar</Button>
          {onEditar && <Button variant="primary" onClick={onEditar}>Editar</Button>}
        </>
      }
    >
      <h3 className="modalSeccion">Datos</h3>
      <div className="modalClienteDatos">
        <div className="modalDato">
          <span className="modalLabel">Documento</span>
          <span className="modalValor">{documento ?? GrayDisplay("-")}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Registrado</span>
          <span className="modalValor">
            {registrado.fecha} {GrayDisplay(`(hace ${registrado.tiempoTranscurrido})`)}
          </span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Correo</span>
          <span className="modalValor">{CorreoDisplay(correo)}</span>
        </div>
        <div className="modalDato">
          <span className="modalLabel">Teléfono</span>
          <span className="modalValor">{telefono || GrayDisplay("(Sin teléfono)")}</span>
        </div>
      </div>

      <h3 className="modalSeccion modalConteoTitulo">
        Compras del cliente
        <span className="modalConteo">{formatearNumero(totalVentas)} compras</span>
      </h3>
      <div className="modalClienteTabla">
        <TablaGenerica
          itemsManage={{ loading: false, error: null }}
          headers={["N°", "Fecha", "Total"]}
        >
          {visibles.length === 0 ? (
            <tr><td colSpan={3} className="sinItems">Este cliente todavía no tiene ventas</td></tr>
          ) : (
            visibles.map((v, i) => {
              const fecha = getDate(v.fechaVenta);
              return (
                <tr key={v.id ?? v.numero ?? i}>
                  <td className="tablaColID">{v.numero}</td>
                  <td className="tablaColFecha">
                    {fecha.fecha}
                    {fecha.tiempoTranscurrido && (
                      <span className="modalClienteFechaRelativa"> · hace {fecha.tiempoTranscurrido}</span>
                    )}
                  </td>
                  <td className="tablaColPrecio">{formatearMoneda(totalVenta(v), { compacto: true })}</td>
                </tr>
              );
            })
          )}
        </TablaGenerica>
      </div>

      <div className="modalClientePie">
        {(quedan > 0 || cantidadVisible > VENTAS_RESUMEN) && (
          <div className="modalClienteMas">
            {quedan > 0 && (
              <Button variant="outline-secondary" size="sm" onClick={() => setCantidadVisible((n) => n + VENTAS_PASO)}>
                Ver más ({quedan})
              </Button>
            )}
            {cantidadVisible > VENTAS_RESUMEN && (
              <Button variant="outline-secondary" size="sm" onClick={() => setCantidadVisible(VENTAS_RESUMEN)}>
                Ver menos
              </Button>
            )}
          </div>
        )}

        <div className="modalClienteTotal">
          <span>Total de ventas</span>
          <strong>{formatearMoneda(totalGastado, { compacto: true })}</strong>
        </div>
      </div>
    </Modal>
  );
}
