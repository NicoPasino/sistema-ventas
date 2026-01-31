// Conección directa con API
// Usa Vite env var `VITE_API_BASE_URL` o por defecto http://localhost:3000

import ApiResponsePopup from '../components/shared/ApiResponsePopup.jsx';

const server = 'https://nicopasino.space/api/ventas';
const local = 'https://localhost:7267/api/ventas';

const BASE = import.meta.env.VITE_API_BASE_URL || local; // TODO:

async function request(path, options = {}) {
  return await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options, })
  .then( res => {    
    if (res.error) { 
      return {error: "Error al hacer la petición con el servidor."}
    }
    else if (res.status === 202 || res.status === 201) {
      return {ok: true}
    }
    else if (res.status === 200) {
      let resJson = res.json();
      // console.log(resJson);
      return resJson;
    }
    else if (res.message || res.status === 400){
      return {message: res.message ?? "Solicitud incorrecta."};
    }
    else if (res.status === 404){
      return {error: "Error 404: Not Found."};
    }
    else if (res.status === 500){
      // console.log("entró en 500")
      return {message: "Error 500: Error desde el servidor."};
    }
    else {
      // console.log(res.error ?? res.message) // ELIMINAR
      // console.log("Respuesta no controlada") // TODO
      return {message: "Error: Al recibir la información (Respuesta no controlada)."}; // ELIMINAR
    } 
  })
  .catch(() => {
    // console.error("Error al conectar con la API del Servidor.");
    return {error: "Error al conectar con la API del Servidor."};
  })
}

function buildCollection(name) {
  return {
    agregar: async (item) => request(`/${name}`, { method: 'POST', body: JSON.stringify(item) }),
    obtenerTodos: async () => request(`/${name}`),
    obtenerPorId: async (id) => request(`/${name}/${id}`),
    eliminar: async (id) => request(`/${name}/${Number(id)}`, { method: 'DELETE' }),
    actualizar: async (item) => {
      const id = item.ID ?? item.id ?? item.Id ?? item.IdPublica;
      if (!id) throw new Error('No se encontró ID en el item para actualizar');
      return request(`/${name}`, { method: 'PUT', body: JSON.stringify(item) });
    },
  };
}

export const productosAPI = buildCollection('productos');
export const ventasAPI = buildCollection('ventas');
export const reportesAPI = buildCollection('reportes');
export const clientesAPI = buildCollection('clientes');
export const categoriasAPI = buildCollection('categorias'); // TODO: 

export default { productosAPI, ventasAPI, reportesAPI };
