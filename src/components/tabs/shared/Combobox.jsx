import { useState, useRef, useEffect, useCallback } from 'react';
import "./Combobox.css";

export function Combobox({
  items = [],
  value,
  onChange,
  placeholder = "Seleccionar...",
  renderItem,
  renderSelected,
  getItemKey,
  getItemLabel,
  maxItems = 20,
  showCreateButton = false,
  onCreate,
  disabled = false,
  className
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionsRef = useRef([]);

  const filteredItems = items
    .filter((item) => {
      if (!filter) return true;
      const label = getItemLabel ? getItemLabel(item) : String(item);
      return label.toLowerCase().includes(filter.toLowerCase());
    })
    .slice(0, maxItems);

  const handleSelect = useCallback((item) => {
    onChange?.(item);
    setIsOpen(false);
    setFilter("");
    setHighlightedIndex(-1);
  }, [onChange]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setFilter("");
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Funciones para el uso del teclado en el combobox
  useEffect(() => {
    function handleKeyDown(event) {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setFilter("");
          setHighlightedIndex(-1);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
            handleSelect(filteredItems[highlightedIndex]);
          }
          break;
        case "Tab":
          setIsOpen(false);
          setFilter("");
          setHighlightedIndex(-1);
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, highlightedIndex, handleSelect]);

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFilter("");
      setHighlightedIndex(-1);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (item) => {
    handleSelect(item);
  };

  const handleOptionMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  const selectedItem = value
    ? items.find((item) => getItemKey(item) === getItemKey(value))
    : null;

  const displayValue = renderSelected
    ? renderSelected(selectedItem)
    : selectedItem
    ? getItemLabel
      ? getItemLabel(selectedItem)
      : String(selectedItem)
    : placeholder;

  return (
    <div className={`combobox ${className}`} ref={triggerRef}>
      <button
        type="button"
        className={`combobox-trigger ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="combobox-options"
      >
        <span className="combobox-value">{displayValue}</span>
        <span className="combobox-arrow">▼</span>
      </button>

      {isOpen && (
        <div
          className="combobox-dropdown"
          ref={dropdownRef}
          role="listbox"
          id="combobox-options"
        >
          <input
            type="text"
            className="combobox-filter"
            placeholder="Filtrar..."
            value={filter}
            onChange={handleFilterChange}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />

          <div className="combobox-options" role="listbox">
            {filteredItems.length === 0 && (
              <div className="combobox-empty">No hay resultados</div>
            )}
            {filteredItems.map((item, index) => (
              <div
                key={getItemKey(item)}
                ref={(el) => (optionsRef.current[index] = el)}
                className={`combobox-option ${highlightedIndex === index ? "highlighted" : ""}`}
                role="option"
                aria-selected={highlightedIndex === index}
                onClick={() => handleOptionClick(item)}
                onMouseEnter={() => handleOptionMouseEnter(index)}
              >
                {renderItem ? renderItem(item) : getItemLabel(item)}
              </div>
            ))}
          </div>

          {showCreateButton && !selectedItem && (
            <button
              type="button"
              className="combobox-create-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCreate?.();
              }}
            >
              + Crear
            </button>
          )}
        </div>
      )}
    </div>
  );
}