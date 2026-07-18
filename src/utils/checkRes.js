export function CheckRes(res, { onSuccess, onError, showPopup } = {}) {
  if (res?.message || res?.error) {
    const message = res.message || res.error;
    showPopup?.({ type: 'error', message });
    onError?.(message);
  } else {
    showPopup?.({ type: 'success', message: 'Operación realizada correctamente.' });
    onSuccess?.();
  }
}
