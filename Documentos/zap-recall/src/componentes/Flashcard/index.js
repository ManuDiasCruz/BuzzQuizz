import {useState} from "react";

import Icone from  "./../Icone";

import "./style.css";

function Flashcard(props) {

  function montarConteudoEtapa() {
    
    const {etapa, resultado} = status;
    if(etapa === 1) {
      return (
        <div 
          className="painel fechado" 
          onClick={()=>setStatus({...status, etapa: 2})}
        >
          <p>Flashcard {indice}</p>
          <Icone icone="play" />
        </div>
      )
    }

    if(etapa === 2) {
      return (
        <div className="painel aberto">
          <p>{frente}</p>
          <div className="icone" onClick={()=>setStatus({...status, etapa: 3})}>
            <Icone icone="setinha" />
          </div>
        </div>
      )
    }

    if(etapa === 3) {
      const botoes = [
        { texto: "Não lembrei", resultado: "erro" },
        { texto: "Quase não lembrei", resultado: "duvida" },
        { texto: "Zap!", resultado: "acerto"}
    ]
      return (
        <div className="painel aberto">
          <p>{verso}</p>
          <div className="botoes">
          {
            botoes.map(({texto, resultado}) => {
              return (
                <button 
                  key={resultado}
                  className={resultado} 
                  onClick={() => {
                    setStatus({etapa: 4, resultado});
                    aoFinalizar(resultado);
                  }}
                >
                  {texto}
                </button>
              )
            })
          }
          </div>
        </div>
      )
    }

    if(etapa === 4) {
      return (
        <div className="painel fechado finalizado">
          <p className={resultado}>Flashcard {indice}</p>
          <Icone icone={resultado} />
        </div>
      )
    }
  }
  
  const [status, setStatus] = useState({
    etapa: 1,
    resultado: ""
  });
  const {frente, verso, indice, aoFinalizar} = props;

  const conteudo = montarConteudoEtapa();
  return <div className="Flashcard">{conteudo}</div>
}

export default Flashcard;