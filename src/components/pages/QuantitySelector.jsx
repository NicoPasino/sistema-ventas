import './QuantitySelector.css';

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  disabled = false,
}) {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={`quantity-selector ${disabled ? "disabled" : ""}`}>
      <button
        type="button"
        className="quantity-btn"
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <input
        type="number"
        className="quantity-input"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Cantidad"
      />
      <button
        type="button"
        className="quantity-btn"
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}