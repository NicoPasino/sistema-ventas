import { GrayDisplay } from '../../../utils/displayConvert';

function valorVisible(valor) {
  if (valor === null || valor === undefined || String(valor).trim() === '') return null;
  return String(valor);
}

function Dato({ label, valor }) {
  const visible = valorVisible(valor);
  return (
    <span className="ventaDato">
      <span className="ventaDatoLabel">{label}</span>
      <span className="ventaDatoValor">
        {visible ?? GrayDisplay('-')}
      </span>
    </span>
  );
}

// Sólo DNI y correo, debajo del buscador de cliente.
export function DetalleCliente({ cliente }) {
  return (
    <div className="ventaClienteDatos">
      <Dato label="DNI" valor={cliente?.documento} />
      <Dato label="Correo" valor={cliente?.correo} />
    </div>
  );
}
