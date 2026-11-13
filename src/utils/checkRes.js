
export function CheckRes(res, { onSuccess, onMessage, showPopup } = {}) {
  if (res?.error) {
    // Si el llamador ya muestra el detalle inline (Alert), no duplicarlo en el popup.
    if (onMessage) onMessage('error', res.error);
    else showPopup?.({ type: 'error', message: res.error || getTitleByType('error') });
    return;
  }

  showPopup?.({ type: 'success', message: getTitleByType('success') });
  onSuccess?.();
}

export function getTitleByType(type) {
  switch (type) {
    case 'success':
      return 'Operación realizada correctamente.';
    case 'error':
      return 'Hubo un error al realizar la operación.';
    case 'warning':
      return 'Hubo un problema al realizar la operación.';
    case 'info':
      return 'Información.';
    default:
      return '';
  }
}
