import '../shared/formNueva.css';
import { useItems } from '../../useItems';
import { productosDB } from "../../../database/db";
import { NuevoProducto } from './nuevoProducto';

export function FormNuevoProducto({id, setIdProducto, reload}) {
  const { agregar, actualizar, obtenerItem } = useItems({itemsDB: productosDB});

  function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));
    // {Producto, Estado, Cantidad, Precio, Descripcion}

    // TODO: Modal + Clear
    if (id) {
      const nuevoDato = {...nuevoItem, ID: id}
      actualizar({nuevoDato});
      setIdProducto();
      reload(productosDB);
      console.log("Producto Actualizado ✅");
    }
    else {
      agregar({nuevoItem});
      console.log("Producto Creado ✅");
    }
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <h1>{id ? "Editar" : "Crear"} Producto: <span className="colorRojoClaro">{id}</span></h1>

      <NuevoProducto id={id} obtenerItem={obtenerItem} />

      <div className='submitBtns'>
        <button type="reset" onClick={() => setIdProducto && setIdProducto()}>Cancelar</button>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  )
}
