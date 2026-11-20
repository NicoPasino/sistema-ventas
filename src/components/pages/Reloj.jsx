import { useEffect, useState } from 'react';
import { getDate } from '../../utils/getDate';

// Reloj informativo en vivo. Se aísla en su propio componente para que el
// setInterval no re-renderice al padre.
export function Reloj() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);

    // Al volver a la pestaña el intervalo puede venir atrasado: resincronizar.
    const sincronizar = () => setNow(new Date());
    document.addEventListener('visibilitychange', sincronizar);
    window.addEventListener('focus', sincronizar);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', sincronizar);
      window.removeEventListener('focus', sincronizar);
    };
  }, []);

  const { fechaLarga, horaLarga } = getDate(now);

  return (
    <span className="ventaReloj" title="Fecha y hora del sistema">
      {fechaLarga} · <span className="ventaRelojHora">{horaLarga}</span>
    </span>
  );
}
