export function Cargando(){ return <span className='colorGris'>Cargando datos...</span> };
export function CargandoT(){ return <tr><td colSpan={20}><Cargando/></td></tr> };

export function ListaVacia(){ return <span className='colorGris'>La lista está vacía!.</span> };
export function ListaVaciaT(){ return <tr><td colSpan={20}><Cargando /></td></tr> };


export function ErrorMensaje({msg = "Error."}){ return <p className='colorRojoClaro'>{msg}</p> };