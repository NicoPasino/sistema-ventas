import { useContext, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { validarCliente } from "../../validations/validarCliente";

export const NuevoCliente = forwardRef(function NuevoCliente({ id }, ref) {
  const { clientes } = useContext(DataContext);
  const { items } = clientes;
  const [cliente, setCliente] = useState(clienteDefault);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) {
      setCliente(clienteDefault);
      setErrors({});
      return;
    }

    const encontrado = items.find(c => String(c.documento) === String(id));

    if (encontrado) {
      setCliente({
        documento: encontrado.documento,
        nombre: encontrado.nombre,
        correo: encontrado.correo,
        telefono: encontrado.telefono ?? '',
      });
    } else {
      setCliente(clienteDefault);
      setErrors({ fetch: "No se encontró el cliente en los datos locales." });
    }
  }, [id, items]);

  useImperativeHandle(ref, () => ({
    getData: () => ({ ...cliente, documento: Number(cliente.documento) }),
    getErrors: () => errors,
    validate: () => {
      const errs = validarCliente(cliente);
      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
  }));

  function handleChange(e) {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleBlur() {
    setErrors(validarCliente(cliente));
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      {errors.fetch && <p className='colorRojoClaro'>{errors.fetch}</p>}

      <div className="form-group">
        <label htmlFor="documento">DNI / Documento</label>
        <input
          type="text"
          id="documento"
          name="documento"
          inputMode="numeric"
          maxLength={8}
          value={cliente.documento ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.documento && <span className="field-error">{errors.documento}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={cliente.nombre ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.nombre && <span className="field-error">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={cliente.correo ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.correo && <span className="field-error">{errors.correo}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="telefono">
          Teléfono <span className="optional-label">(opcional)</span>
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={cliente.telefono ?? null}
          onChange={handleChange}
        />
        {errors.telefono && <span className="field-error">{errors.telefono}</span>}
      </div>
    </div>
  );
});

const clienteDefault = {
  documento: '',
  nombre: '',
  correo: '',
  telefono: '',
};