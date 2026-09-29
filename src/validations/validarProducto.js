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

  const min = validarEnteroOpcional(producto.stockMinimo, 'El stock mínimo debe ser un número entero mayor o igual a 0.');
  const max = validarEnteroOpcional(producto.stockMaximo, 'El stock máximo debe ser un número entero mayor o igual a 0.');

  if (min.error) errors.stockMinimo = min.error;
  if (max.error) errors.stockMaximo = max.error;
  if (min.valor !== null && max.valor !== null && min.valor > max.valor) {
    errors.stockMaximo = 'El stock máximo no puede ser menor que el mínimo.';
  }

  const proveedor = String(producto.proveedor ?? '').trim();
  if (proveedor.length > 150) {
    errors.proveedor = 'El proveedor no puede tener más de 150 caracteres.';
  }

  return errors;
}

function validarEnteroOpcional(valor, mensaje) {
  if (valor === null || valor === undefined || String(valor).trim() === '') {
    return { valor: null, error: null };
  }

  const n = Number(valor);
  if (!Number.isInteger(n) || n < 0) return { valor: null, error: mensaje };

  return { valor: n, error: null };
}
