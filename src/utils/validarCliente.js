export function validarCliente(cliente) {
  const errors = {};

  if (!cliente.Documento || cliente.Documento.trim() === '') {
    errors.Documento = 'El documento es obligatorio.';
  } else if (cliente.Documento.trim().length !== 8) {
    errors.Documento = 'El documento debe tener 8 números.';
  }

  if (!cliente.Nombre || cliente.Nombre.trim() === '') {
    errors.Nombre = 'El nombre es obligatorio.';
  }

  if (!cliente.Correo || cliente.Correo.trim() === '') {
    errors.Correo = 'El correo es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.Correo.trim())) {
    errors.Correo = 'Ingrese un correo válido.';
  }

  return errors;
}
