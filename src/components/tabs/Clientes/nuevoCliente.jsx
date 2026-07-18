import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export const NuevoCliente = forwardRef(function NuevoCliente({ obtenerItem, id }, ref) {
  const [cliente, setCliente] = useState(clienteDefault);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const obtenerCliente = async () => {
      if (id) {
        let res = await obtenerItem(id);

        if (res.error) {
          setCliente(clienteDefault);
          setErrors({ fetch: res.error });
          return;
        }
        setCliente(res);
      }
    };
    obtenerCliente();
  }, [id, obtenerItem]);

  useImperativeHandle(ref, () => ({
    getData: () => cliente,
    getErrors: () => errors,
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

  function handleBlur(e) {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'Documento') {
      if (!value || value.trim() === '') {
        newErrors.Documento = 'El documento es obligatorio.';
      } else if (!/^\d+$/.test(value.trim())) {
        newErrors.Documento = 'El documento solo debe contener números.';
      } else {
        delete newErrors.Documento;
      }
    } else if (name === 'Nombre') {
      if (!value || value.trim() === '') {
        newErrors.Nombre = 'El nombre es obligatorio.';
      } else {
        delete newErrors.Nombre;
      }
    } else if (name === 'Correo') {
      if (!value || value.trim() === '') {
        newErrors.Correo = 'El correo es obligatorio.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        newErrors.Correo = 'Ingrese un correo válido.';
      } else {
        delete newErrors.Correo;
      }
    }

    setErrors(newErrors);
  }

  return (
    <>
      {errors.fetch && <p className='colorRojoClaro'>{errors.fetch}</p>}

      <div className="form-group">
        <label htmlFor="documento">DNI / CUIT / PAS</label>
        <input
          type="text"
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
    </>
  );
});

const clienteDefault = {
  Documento: '',
  Nombre: '',
  Correo: '',
  Telefono: '',
};