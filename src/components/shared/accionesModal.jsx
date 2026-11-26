import { MailIcon, PhoneIcon, PrinterIcon } from '../../assets/icons';

function getLinkTelefono(telefono) {
  const numero = String(telefono ?? "").replace(/\D/g, "");
  return numero ? `tel:${numero}` : null;
}

export function BotonCorreo({ correo }) {
  if (!correo) {
    return (
      <span className="btn btn-icon btn-sm btn-outline-secondary btn-disabled" title="Sin correo" aria-label="Sin correo">
        <MailIcon />
      </span>
    );
  }

  return (
    <a
      className="btn btn-icon btn-sm btn-outline-primary"
      href={`mailto:${correo}`}
      title={`Escribir a ${correo}`}
      aria-label={`Escribir a ${correo}`}
    >
      <MailIcon />
    </a>
  );
}

export function BotonTelefono({ telefono }) {
  const linkTelefono = getLinkTelefono(telefono);

  if (!linkTelefono) {
    return (
      <span className="btn btn-icon btn-sm btn-outline-secondary btn-disabled" title="Sin teléfono" aria-label="Sin teléfono">
        <PhoneIcon />
      </span>
    );
  }

  return (
    <a
      className="btn btn-icon btn-sm btn-outline-success"
      href={linkTelefono}
      title={`Llamar a ${telefono}`}
      aria-label={`Llamar a ${telefono}`}
    >
      <PhoneIcon />
    </a>
  );
}

export function AccionesContacto({ correo, telefono }) {
  return (
    <>
      <BotonCorreo correo={correo} />
      <BotonTelefono telefono={telefono} />
    </>
  );
}

// La impresión todavía no está implementada: sin onClick el botón queda deshabilitado.
export function BotonImprimir({ onClick, disabled = false, ...props }) {
  const inactivo = disabled || typeof onClick !== 'function';
  const title = inactivo ? "Imprimir (próximamente)" : "Imprimir";

  if (inactivo) {
    return (
      <span
        className="btn btn-icon btn-sm btn-outline-secondary btn-disabled"
        title={title}
        aria-label={title}
        aria-disabled="true"
        {...props}
      >
        <PrinterIcon />
      </span>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-icon btn-sm btn-outline-primary"
      onClick={onClick}
      title={title}
      aria-label={title}
      {...props}
    >
      <PrinterIcon />
    </button>
  );
}
