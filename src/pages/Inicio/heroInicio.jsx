import { useContext } from "react";
import { Button } from "../../components/shared/botones";
import { NewIcon } from "../../assets/icons";
import { UserSettingsContext } from "../../context/userSettingsContext";

export function HeroInicio({ fechaLarga, usuario }) {
  const { handleTab } = useContext(UserSettingsContext);

  return (
    <section className="heroInicio">
      <div className="heroTexto">
        <h1 className="heroTitulo">{fechaLarga}</h1>
        <p className="heroSubtitulo">Bienvenido, {usuario}.</p>
      </div>

      <Button variant="success" size="md" onClick={() => handleTab("Venta")}>
        <NewIcon /> Nueva venta
      </Button>

    </section>
  );
}
