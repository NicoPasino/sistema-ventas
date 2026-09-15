import { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { DataContext } from "../../../context/DataContext";
import { validarProducto } from "../../../utils/validarProducto.js";

export const NuevoProducto = forwardRef(function NuevoProducto({ obtenerItem, id }, ref) {
  const { productos } = useContext(DataContext);
  const { categorias, loading } = productos;
  const [producto, setProducto] = useState(productoDefault);
  const {nombre, activo, cantidad, precio, idCategoria, descripcion} = producto;
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const obtenerProducto = async () => {
      if (id) {
        let res = await obtenerItem(id)
                
        if(res.error) {
          setProducto(productoDefault); 
          setErrors({ fetch: res.error });
          return 
        }
        else {
          setProducto(res); 
        }
      } 
    }
    obtenerProducto();
  },[id, obtenerItem])

  useImperativeHandle(ref, () => ({
    getData: () => {
      convertirTipos(producto);
      return producto;
    },
    getErrors: () => errors,
    validate: () => {
      const errs = validarProducto(producto);
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  function handleBlur() {
    setErrors(validarProducto(producto));
  }

  function ListaCategorias({lista}) {
    if (!lista) return <input value={"(Sin categorías)"} disabled/>
    return (
      <select id="ListaCategorias" name="idCategoria" value={idCategoria ?? ""} onChange={handleChange} disabled={loading} required>
        <option value="">Seleccione una categoría</option>
        {lista.map((e, i) => ( <option key={i} value={e.id}>{e.nombre}</option> ))}
      </select>
    )
  }
  
  return (
    <>
      {errors.fetch && <p className='colorRojoClaro'>{errors.fetch}</p>}
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">Nombre Producto</label>
          <input type="text" id="nombre" name="nombre" value={nombre ?? ""} onChange={handleChange} onBlur={handleBlur} required />
          {errors.nombre && <span className="field-error">{errors.nombre}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="estadoP">Estado</label>
          <select id="estadoP" name="activo" value={activo ?? "true"} onChange={handleChange}>
            <option value="true">Activo</option>
            <option value="false">No Activo</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Cantidad / Stock</label>
          <input type="number" name="cantidad" value={cantidad ?? ""} onChange={handleChange} onBlur={handleBlur} min="1" required />
          {errors.cantidad && <span className="field-error">{errors.cantidad}</span>}
        </div>
        
        <div className="form-group">
          <label>Precio del Producto</label>
          <input type="number" name="precio" value={precio ?? ""} onChange={handleChange} onBlur={handleBlur} min="1" step={0.01} required />
          {errors.precio && <span className="field-error">{errors.precio}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="ListaCategorias">Categoría</label>
        {
          (loading) ? <input value={"Cargando Categorías..."} disabled/>
            : (errors.fetch) 
              ? <input value={"Error al cargar Categorías."} disabled/>
              : <ListaCategorias lista={categorias}/>
        }
        {errors.idCategoria && <span className="field-error">{errors.idCategoria}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">
          Detalles <span className="optional-label">(opcional)</span>
        </label>
        <textarea id="descripcion" name="descripcion" rows={3} value={descripcion ?? ""} onChange={handleChange}/>
      </div>
    </>
  )
});

const productoDefault = {
  nombre: '',
  activo: '',
  cantidad: '',
  precio: '',
  idCategoria: '',
  descripcion: ''
}

function convertirTipos(nuevoItem){  
  if (nuevoItem.activo !== undefined) {
    nuevoItem.activo = nuevoItem.activo === 'true';
  }
  if (nuevoItem.cantidad !== undefined) {
    nuevoItem.cantidad = Number(nuevoItem.cantidad) || 0;
  }
  if (nuevoItem.precio !== undefined) {
    nuevoItem.precio =  nuevoItem.precio || 0;
  }
  if (nuevoItem.idCategoria !== undefined) {
    const parsed = Number(nuevoItem.idCategoria);
    nuevoItem.idCategoria = Number.isNaN(parsed) ? nuevoItem.idCategoria : parsed;
  }
}
