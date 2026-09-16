import { useContext } from "react";
import { UserSettingsContext } from "../../../context/userSettingsContext.jsx";
import { NotFoundIcon } from "../../../assets/icons.jsx";

export default function NotFound() {
  const { handleTab } = useContext(UserSettingsContext);

  return (
    <div style={styles.contenedor}>
      <NotFoundIcon />
      <h2 style={styles.titulo}>Vista no encontrada</h2>
      <p style={styles.texto}>
        Lo sentimos, la vista que estás buscando no existe o fue movida.
      </p>
      <button onClick={() => handleTab("Inicio")} style={styles.boton}>
        Ir al Inicio
      </button>
    </div>
  );
}

const styles = {
  contenedor: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    gap: "10px",
  },
  titulo: {
    margin: "10px 0 0",
    textTransform: "uppercase",
    fontSize: "1.4em",
  },
  texto: {
    color: "var(--colorLight)",
    margin: "0 0 15px",
  },
  boton: {
    backgroundColor: "var(--colorInfo)",
    color: "#111",
    border: "none",
    borderRadius: "6px",
    padding: "10px 25px",
    fontSize: "1em",
    cursor: "pointer",
    fontWeight: "bold",
  },
};