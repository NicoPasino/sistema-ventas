export function validarCliente(cliente) {
  const errors = {};

  const documento = String(cliente.documento ?? '').trim();
  if (!documento) {
    errors.documento = 'El documento es obligatorio.';
  } else if (!/^\d{8}$/.test(documento)) {
    errors.documento = 'El documento debe tener 8 números.';
  }

  if (!cliente.nombre || String(cliente.nombre).trim() === '') {
    errors.nombre = 'El nombre es obligatorio.';
  }

  const correo = String(cliente.correo ?? '').trim();
  if (!correo) {
    errors.correo = 'El correo es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errors.correo = 'Ingrese un correo válido.';
  }

  const telefono = String(cliente.telefono ?? '').trim();
  if (telefono && !/^[+\d][\d\s-]{5,}$/.test(telefono)) {
    errors.telefono = 'Ingrese un teléfono válido.';
  }

  return errors;
}