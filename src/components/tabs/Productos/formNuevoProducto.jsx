import '../shared/formNueva.css';
import { productosDB } from "../../../database/db";
import { useItems } from '../../useItems';
import { NuevoProducto } from './nuevoProducto';

export function FormNuevoProducto() {
  const { agregar } = useItems({itemsDB: productosDB});
  // const [newItems, setNewItems] = useState([]);

  function submitHandler(event) {
    event.preventDefault();
    const nuevoItem = Object.fromEntries(new window.FormData(event.target));
    // {Producto, Estado, Cantidad, Precio, Descripcion}

    agregar({nuevoItem});

    console.log("PRODUCTO CREADO ✅");
    // TODO: Modal + Clear
  }

  return (
    <form className='formNueva' onSubmit={submitHandler}>
      <h1>Nuevo Producto:</h1>

      <NuevoProducto />

      <div className='submitBtns'>
        <button type="reset">Borrar</button>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  )
}


// TODO:
//* manejo de error...
//* Reutilizar este componente para "Actualizar Producto".

