const ESTILOS_BASE = `
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: #fff;
    color: #111;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 12px;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #bbb; padding: 6px 8px; text-align: left; }
  th { background: #f2f2f2; }
  tr { break-inside: avoid; }
  a { color: inherit; text-decoration: none; }
`;

const ESPERA_PRINT_MS = 2000;

let imprimiendo = false;

export function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Imprime contenido HTML en un iframe oculto, sin afectar al resto de la app.
// `contenido` puede ser un string HTML o un nodo del DOM (usa su outerHTML).
export function imprimirContenido({ titulo = "Impresión", contenido = "", estilos = "" } = {}) {
  if (imprimiendo || typeof window === "undefined") return false;

  const html = typeof contenido === "string"
    ? contenido
    : (contenido && typeof contenido.outerHTML === "string" ? contenido.outerHTML : "");
  if (!html) return false;

  imprimiendo = true;

  const iframe = document.createElement("iframe");
  iframe.title = "Área de impresión";
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = "position:fixed;left:-10000px;top:0;width:100%;height:100%;border:0;";

  const documento = `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<title>${escaparHtml(titulo)}</title>
<style>${ESTILOS_BASE}\n${estilos}</style>
</head>
<body>${html}</body>
</html>`;

  let terminado = false;
  let temporizador = null;

  function limpiar() {
    if (terminado) return;
    terminado = true;
    if (temporizador !== null) window.clearTimeout(temporizador);
    iframe.remove();
    imprimiendo = false;
  }

  temporizador = window.setTimeout(limpiar, ESPERA_PRINT_MS);

  iframe.addEventListener("load", () => {
    const ventana = iframe.contentWindow;
    if (!ventana) {
      limpiar();
      return;
    }

    ventana.addEventListener("afterprint", limpiar, { once: true });

    try {
      ventana.focus();
      ventana.print();
    } catch {
      limpiar();
    }
  }, { once: true });

  iframe.srcdoc = documento;
  document.body.appendChild(iframe);

  return true;
}
