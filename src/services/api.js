const apiUrl = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  return await fetch(`${apiUrl}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options })
    .then(async (res) => {
      if (res.status === 204 || res.status === 201 || res.status === 202) {
        return { ok: true, data: null };
      } else if (res.status === 200) {
        try {
          const data = await res.json();
          if (data && typeof data === 'object' && ('error' in data || 'message' in data)) {
            return { ok: false, error: data.error || data.message || `Error ${res.status}: Error del servidor.`, status: res.status };
          }
          return { ok: true, data: data ?? null };
        } catch {
          return { ok: true, data: null };
        }
      } else if (res.status === 400) {
        let resJson = await res.json().catch(() => ({}));
        return { ok: false, error: resJson.message || resJson.error || "Error 400: Solicitud incorrecta (sin mensaje del servidor).", status: res.status };
      } else if (res.status === 404) {
        return { ok: false, error: "Error 404: Solicitud no encontrada (sin mensaje del servidor).", status: res.status };
      } else if (res.status === 405) {
        return { ok: false, error: "Error 405: Solicitud rechazada (Método no permitido).", status: res.status };
      } else if (res.status === 500) {
        return { ok: false, error: "Error 500: Error desde el servidor (sin mensaje del servidor).", status: res.status };
      } else if (res.status === 501) {
        return { ok: false, error: "Error 501: Error desde el servidor (Funcionalidad no implementada).", status: res.status };
      } else {
        return { ok: false, error: `Error ${res.status}: (Respuesta no controlada).`, status: res.status };
      }
    })
    .catch(() => {
      return { ok: false, error: "Error al conectar con la API del Servidor." };
    })
}

function buildCollection(name) {
  return {
    obtenerTodos: async () => request(`/${name}`),
    buscarPorCampo: async (campo, valor) => request(`/${name}/search/${campo}/${valor}`),
    obtenerPorId: async (id) => request(`/${name}/${id}`),
    agregar: async (item) => request(`/${name}`, { method: 'POST', body: JSON.stringify(item) }),
    eliminar: async (id) => request(`/${name}/${Number(id)}`, { method: 'DELETE' }),
    cambiarActivo: async (id, activo) => request(`/${name}/${Number(id)}`, { method: 'PATCH', body: JSON.stringify({ Activo: activo }) }),
    actualizar: async (item) => {
      const id = item.IdPublica ?? item.idPublica;
      if (!id) throw new Error('No se encontró ID en el item para actualizar');
      return request(`/${name}/${id}`, { method: 'PATCH', body: JSON.stringify(item) });
    },
  };
}

export const productosAPI = buildCollection('productos');
export const ventasAPI = buildCollection('ventas');
export const clientesAPI = buildCollection('clientes');
export const categoriasAPI = buildCollection('categorias');

export default { productosAPI, ventasAPI, categoriasAPI };
