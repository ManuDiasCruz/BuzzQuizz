import {useState} from "react";

import Logo from "./../../assets/img/logo.png";
import "./style.css";

function Inicio() {
  const [visivel, setVisivel] = useState(true);

  return (
    visivel ? <div className="Inicio">
      <img src={Logo} alt="Zap Recall!" />
      <h1>ZapRecall</h1>
      <button onClick={() => setVisivel(false)}>Iniciar Recall!</button>
    </div>: <></>
  )
}

export default Inicio;