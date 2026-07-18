// Conección directa con API

import { isDev } from '../config.js';

const url = isDev ? "localhost:7267" : "nicopasino.space";
const BASE = `https://${url}/api/ventas`;

async function request(path, options = {}) {
  return await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options, })
  .then((res) => {
    if (res.error) {
      return { error: "Error al hacer la petición con el servidor." };
    } else if (res.status === 202 || res.status === 201) {
      return { ok: true };
    } else if (res.status === 200) {
      let resJson = res.json();
      return resJson;
    } else if (res.message || res.status === 400) {
      return { message: res.message ?? "Error 400: Solicitud incorrecta." };
    } else if (res.status === 404) {
      return { error: "Error 404: Solicitud no encontrada." };
    } else if (res.status === 500) {
      return { error: "Error 500: Error desde el servidor." };
    } else {
      return { error: "Error: (Respuesta no controlada)." };
    }
  })
  .catch(() => {
    return {error: "Error al conectar con la API del Servidor."};
  })
}

function buildCollection(name) {
  return {
    obtenerTodos: async () => request(`/${name}`),
    buscarPorCampo: async (campo, valor) => request(`/${name}/search/${campo}/${valor}`),
    obtenerPorId: async (id) => request(`/${name}/${id}`),
    agregar: async (item) => request(`/${name}`, { method: 'POST', body: JSON.stringify(item) }),
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
export const clientesAPI = buildCollection('clientes');
export const categoriasAPI = buildCollection('categorias');

export default { productosAPI, ventasAPI, categoriasAPI };
