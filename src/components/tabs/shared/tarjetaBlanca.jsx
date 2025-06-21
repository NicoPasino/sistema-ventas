import './tarjetas.css'

export function TarjetaBlanca ({title, text, children}) {
  return (
    <div className="tarjetaBlanca">
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  )
}