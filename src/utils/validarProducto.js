export function validarProducto(producto) {
  const errors = {};

  if (!producto.nombre || producto.nombre.trim() === '') {
    errors.nombre = 'El nombre es obligatorio.';
  }

  if (!producto.cantidad && producto.cantidad !== 0) {
    errors.cantidad = 'La cantidad es obligatoria.';
  } else if (Number(producto.cantidad) < 1) {
    errors.cantidad = 'La cantidad debe ser al menos 1.';
  }

  if (!producto.precio && producto.precio !== 0) {
    errors.precio = 'El precio es obligatorio.';
  } else if (Number(producto.precio) < 1) {
    errors.precio = 'El precio debe ser al menos 1.';
  }

  if (!producto.idCategoria) {
    errors.idCategoria = 'La categoría es obligatoria.';
  }

  return errors;
}
