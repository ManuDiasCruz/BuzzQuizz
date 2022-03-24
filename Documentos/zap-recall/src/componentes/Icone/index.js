import { ReactComponent as Acerto } from "./../../assets/img/checkmark-circle-icon.svg";
import { ReactComponent as Erro } from "./../../assets/img/close-circle-icon.svg";
import { ReactComponent as Duvida } from "./../../assets/img/help-circle-icon.svg";
import { ReactComponent as Play } from "./../../assets/img/play-outline-icon.svg";

import Festinha from "./../../assets/img/party.png";
import Setinha from "./../../assets/img/setinha.png";
import Triste from "./../../assets/img/sad.png";

import "./style.css";

function Icone (props) {
  const icones = {
    acerto: <Acerto fill="#2FBE34" />,
    erro: <Erro fill="#FF3030" />,
    duvida: <Duvida fill="#FF922E" />,
    play: <Play />,
    setinha: <img src={Setinha} alt="virar" />,
    festinha: <img src={Festinha} alt="festinha" />,
    triste: <img src={Triste} alt="triste" />
  };

  const {icone} = props;
  const css = `Icone ${icone}`;
  return <span className={css}>{icones[icone]}</span>
}

export default Icone;