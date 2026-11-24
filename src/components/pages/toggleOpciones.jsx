export function ToggleOpciones({ ariaLabel, opciones, valor, onChange }) {
  return (
    <div className="serieToggle" role="group" aria-label={ariaLabel}>
      {opciones.map((opcion) => {
        const activo = opcion.value === valor;
        return (
          <button
            key={String(opcion.value)}
            type="button"
            className={activo ? 'activo' : ''}
            aria-pressed={activo}
            onClick={() => onChange(opcion.value)}
          >
            {opcion.label}
          </button>
        );
      })}
    </div>
  );
}