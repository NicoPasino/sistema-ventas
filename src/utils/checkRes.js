
export function CheckRes(res, { onSuccess, onMessage, showPopup } = {}) {
  if (res?.error) {
    showPopup?.({ type: 'error', message: getTitleByType('error') });
    onMessage?.('error', res.error);
  } else if (res?.message) {
    showPopup?.({ type: 'warning', message: getTitleByType('warning') });
    onMessage?.('warning', res.message);
  } else {
    showPopup?.({ type: 'success', message: getTitleByType('success') });
    onSuccess?.();
  }
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
