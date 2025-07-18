import './modal.css'

export function Modal({ children }) {
  if (children) return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{children}</h2>
        {/* <button className="modalCloseButton" onClick={onClose}>X</button> */}
      </div>
    </div>
  );
}