import { DataContext } from '../../../context/DataContext';
import { useContext, useEffect, useState } from 'react';
import ApiResponsePopup from '../../shared/ApiResponsePopup';
import { Button } from '../../shared/botones';
import { Modal } from '../../shared/Modal';
import '../Productos/modalProducto.css';


export function ModalEditarCliente({ id, setIdCliente }) {
  const { clientes } = useContext(DataContext);
  const { agregar, actualizar, obtenerItem, reloadItems } = clientes;
  const [apiResponse, setApiResponse] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));

    if (id) {
      const nuevoDato = { ...nuevoItem, IdPublica: id };
      let res = await actualizar({ nuevoDato });

      if (res.message || res.error) {
        return;
      }
      if (res.ok) {
        reloadItems();
        setIdCliente();
      }
    } else {
      let res = await agregar({ nuevoItem });
      setApiResponse(res);

      if (res.message || res.error) {
        return;
      }
      if (res.ok) {
        reloadItems();
        setIdCliente();
      }
    }
  }

  function handleClose() {
    if (setIdCliente) setIdCliente();
  }

  return (
    <Modal
      title={id ? "Editar Cliente" : "Nuevo Cliente"}
      onClose={handleClose}
    >
      <form onSubmit={submitHandler}>
        <NuevoCliente id={id} obtenerItem={obtenerItem} />

        <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />

        <div className="modal-footer">
          <Button type="button" variant="danger" onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="success">Confirmar</Button>
        </div>
      </form>
    </Modal>
  );
}


export function NuevoCliente({ obtenerItem, id }) {
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
        <label htmlFor="documento">Documento</label>
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
        <label htmlFor="nombre">Nombre completo</label>
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
}


const clienteDefault = {
  Documento: '',
  Nombre: '',
  Correo: '',
  Telefono: '',
};

export function ModalNuevoClienteInline({ onClose, onClienteCreado }) {
  const { clientes } = useContext(DataContext);
  const { agregar } = clientes;
  const [apiResponse, setApiResponse] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));
    const res = await agregar({ nuevoItem });
    setApiResponse(res);

    if (res.message || res.error) return;
    if (res.ok) {
      onClienteCreado({
        documento: nuevoItem.Documento,
        nombre: nuevoItem.Nombre,
        correo: nuevoItem.Correo,
        telefono: nuevoItem.Telefono,
      });
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <NuevoCliente />
      <ApiResponsePopup response={apiResponse} onClose={() => setApiResponse(null)} />
      <div className="modal-footer">
        <Button type="button" variant="danger" onClick={onClose}>Cancelar</Button>
        <Button type="submit" variant="success">Crear Cliente</Button>
      </div>
    </form>
  );
}

// FIX MANEJO DE ERROR POPUP RESPUESTA