import './botones.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const baseClasses = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const stateClasses = [
    disabled && 'btn-disabled',
    loading && 'btn-loading',
  ].filter(Boolean).join(' ');

  const combinedClass = [baseClasses, variantClass, sizeClass, stateClasses, className].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner" aria-hidden="true"></span>}
      <span className={loading ? 'btn-text-hidden' : ''}>{children}</span>
    </button>
  );
}

export function IconButton({
  children,
  variant = 'secondary',
  size = 'lg',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  title,
  ...props
}) {
  const baseClasses = 'btn btn-icon';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const stateClasses = [
    disabled && 'btn-disabled',
    loading && 'btn-loading',
  ].filter(Boolean).join(' ');

  const combinedClass = [baseClasses, variantClass, sizeClass, stateClasses, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={combinedClass}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      {...props}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true"></span> : children}
    </button>
  );
}

export function SubmitButtons({
  onSubmit,
  onCancel,
  submitText = 'Confirmar',
  cancelText = 'Cancelar',
  submitVariant = 'success',
  cancelVariant = 'danger',
  disabled = false,
  loading = false,
  className = '',
}) {
  return (
    <div className={`submit-btns ${className}`}>
      <Button
        type="button"
        variant={cancelVariant}
        disabled={disabled || loading}
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        variant={submitVariant}
        disabled={disabled || loading}
        loading={loading}
        onClick={onSubmit}
      >
        {submitText}
      </Button>
    </div>
  );
}

export default { Button, IconButton, SubmitButtons };