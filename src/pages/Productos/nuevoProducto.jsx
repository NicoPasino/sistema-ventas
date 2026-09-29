import { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { DataContext } from "../../context/dataContext";
import { validarProducto } from "../../validations/validarProducto";
import { esActivo } from "../../utils/displayConvert";

const CAMPOS_EDITABLES = ['nombre', 'activo', 'cantidad', 'precio', 'idCategoria', 'descripcion', 'stockMinimo', 'stockMaximo', 'proveedor'];

// El PATCH del backend solo escribe min/max si vienen con valor, asi que un null se ignora
// en silencio. Al borrar el campo se omite del parche y el valor anterior se conserva.
const CAMPOS_SIN_ANULAR = ['stockMinimo', 'stockMaximo'];

function sonIguales(a, b) {
  if (a === b) return true;
  if (a == null || a === '') return b == null || b === '';
  if (b == null) return false;
  return String(a) === String(b);
}

export const NuevoProducto = forwardRef(function NuevoProducto({ id }, ref) {
  const { productos } = useContext(DataContext);
  const { categorias, loading, items } = productos;
  const [producto, setProducto] = useState(productoDefault);
  const [productoOriginal, setProductoOriginal] = useState(null);
  const {nombre, activo, cantidad, precio, idCategoria, descripcion, stockMinimo, stockMaximo, proveedor} = producto;
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (!id) {
      setProducto(productoDefault);
      setProductoOriginal(null);
      return;
    }

    const encontrado = items.find(p => String(p.idPublica) === String(id));

    if (encontrado) {
      setProducto(encontrado);
      setProductoOriginal(encontrado);
    } else {
      setProducto(productoDefault);
      setProductoOriginal(null);
      setErrors({ fetch: "No se encontró el producto en los datos locales." });
    }
  }, [id, items])

  useImperativeHandle(ref, () => ({
    getData: () => convertirTipos(producto),
    getCambios: () => {
      if (!productoOriginal) return convertirTipos(producto);
      const actual = convertirTipos(producto);
      const cambios = {};
      for (const campo of CAMPOS_EDITABLES) {
        if (CAMPOS_SIN_ANULAR.includes(campo) && actual[campo] === null) continue;
        if (!sonIguales(actual[campo], productoOriginal[campo])) cambios[campo] = actual[campo];
      }
      return cambios;
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
            <option value="true">Activado</option>
            <option value="false">Desactivado</option>
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
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="stockMinimo">Stock Mínimo</label>
          <input type="number" id="stockMinimo" name="stockMinimo" value={stockMinimo ?? ""} onChange={handleChange} onBlur={handleBlur} min="0" step="1" />
          {errors.stockMinimo && <span className="field-error">{errors.stockMinimo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="stockMaximo">Stock Máximo</label>
          <input type="number" id="stockMaximo" name="stockMaximo" value={stockMaximo ?? ""} onChange={handleChange} onBlur={handleBlur} min="0" step="1" />
          {errors.stockMaximo && <span className="field-error">{errors.stockMaximo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="proveedor">Proveedor</label>
          <input type="text" id="proveedor" name="proveedor" value={proveedor ?? ""} onChange={handleChange} onBlur={handleBlur} maxLength="150" />
          {errors.proveedor && <span className="field-error">{errors.proveedor}</span>}
        </div>
      </div>
      <p className="colorGrisClaro stockRangoNota">
        El stock se muestra según el porcentaje entre el mínimo y el máximo. <span className="optional-label">(Si se dejan vacíos se usan 20 y 150)</span>
      </p>

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
  descripcion: '',
  stockMinimo: '',
  stockMaximo: '',
  proveedor: ''
}

function convertirTipos(nuevoItem){
  const convertido = { ...nuevoItem };
  if (convertido.activo !== undefined) {
    convertido.activo = esActivo(convertido.activo);
  }
  if (convertido.cantidad !== undefined) {
    convertido.cantidad = Number(convertido.cantidad) || 0;
  }
  if (convertido.precio !== undefined) {
    convertido.precio = Number(convertido.precio) || 0;
  }
  if (convertido.idCategoria !== undefined) {
    const parsed = Number(convertido.idCategoria);
    convertido.idCategoria = Number.isNaN(parsed) ? convertido.idCategoria : parsed;
  }
  if (convertido.stockMinimo !== undefined) {
    convertido.stockMinimo = aEnteroONull(convertido.stockMinimo);
  }
  if (convertido.stockMaximo !== undefined) {
    convertido.stockMaximo = aEnteroONull(convertido.stockMaximo);
  }
  if (convertido.proveedor !== undefined) {
    convertido.proveedor = String(convertido.proveedor ?? '').trim();
  }
  return convertido;
}

function aEnteroONull(valor) {
  if (valor === null || valor === undefined || String(valor).trim() === '') return null;
  const n = Number(valor);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}
