const apiUrl = import.meta.env.VITE_API_URL;

const ERRORES_POR_STATUS = {
  400: "Error 400: Solicitud incorrecta (sin mensaje del servidor).",
  404: "Error 404: Solicitud no encontrada (sin mensaje del servidor).",
  405: "Error 405: Solicitud rechazada (Método no permitido).",
  500: "Error 500: Error desde el servidor (sin mensaje del servidor).",
  501: "Error 501: Error desde el servidor (Funcionalidad no implementada).",
};

// Extrae el detalle del body de error: JSON con message/error/detail/title,
// JSON que sea un string (StatusCode(500, "...")) o texto plano.
async function leerDetalle(res) {
  try {
    const texto = await res.text();
    if (!texto) return null;
    try {
      const body = JSON.parse(texto);
      if (typeof body === 'string') return body.trim() || null;
      if (body && typeof body === 'object') {
        return body.message || body.error || body.detail || body.title || null;
      }
      return null;
    } catch {
      return texto.trim() || null;
    }
  } catch {
    return null;
  }
}

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
      } else {
        const detalle = await leerDetalle(res);
        const fallback = ERRORES_POR_STATUS[res.status] ?? `Error ${res.status}: (Respuesta no controlada).`;
        return { ok: false, error: detalle || fallback, status: res.status };
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
      if (!id) return { ok: false, error: 'No se encontró ID en el item para actualizar' };
      return request(`/${name}/${id}`, { method: 'PATCH', body: JSON.stringify(item) });
    },
  };
}

export const productosAPI = buildCollection('productos');
export const ventasAPI = buildCollection('ventas');
export const clientesAPI = buildCollection('clientes');
export const categoriasAPI = buildCollection('categorias');
