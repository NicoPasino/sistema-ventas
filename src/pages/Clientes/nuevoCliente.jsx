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
        Documento: encontrado.documento,
        Nombre: encontrado.nombre,
        Correo: encontrado.correo,
        Telefono: encontrado.telefono ?? '',
      });
    } else {
      setCliente(clienteDefault);
      setErrors({ fetch: "No se encontró el cliente en los datos locales." });
    }
  }, [id, items]);

  useImperativeHandle(ref, () => ({
    getData: () => ({ ...cliente }),
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
          type="number"
          id="documento"
          name="Documento"
          value={cliente.Documento ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.Documento && <span className="field-error">{errors.Documento}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          type="text"
          id="nombre"
          name="Nombre"
          value={cliente.Nombre ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.Nombre && <span className="field-error">{errors.Nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="Correo"
          value={cliente.Correo ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.Correo && <span className="field-error">{errors.Correo}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="telefono">
          Teléfono <span className="optional-label">(opcional)</span>
        </label>
        <input
          type="tel"
          id="telefono"
          name="Telefono"
          value={cliente.Telefono ?? ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

const clienteDefault = {
  Documento: '',
  Nombre: '',
  Correo: '',
  Telefono: '',
};