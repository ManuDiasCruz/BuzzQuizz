import {useState} from "react";

import data from "../../data";
import "./style.css";
import LogoPequeno from "./../../assets/img/logo-pequeno.png";

import Flashcard from "./../Flashcard";
import Icone from "./../Icone";

function Deck() {

  const [respostas, setRespostas] = useState([]);
  const [questoes, setQuestoes] = useState([]);

  function montarFlashcards() {
    if(questoes.length === 0) {
      data.sort(comparador);
      setQuestoes([...data]);
      return <></>;
    }
    else {
      return questoes.map((questao, indice) => {
        const {frente, verso} = questao;
        return <Flashcard 
          key={frente + indice}
          indice={indice + 1}
          frente={frente}
          verso={verso}
          aoFinalizar={resposta => setRespostas([...respostas, resposta])}
        />
      })
    }
  }

  function montarFooter() {
    let resultado = <></>;
    
    if(respostas.length === questoes.length && questoes.length > 0) {
      if(!respostas.includes("erro")) {
        resultado =  (
          <div className="resultado">
            <span><Icone icone="festinha" /> Parabéns!</span>
            <p>Você não esqueceu de nenhum flashcard!</p>
          </div>
        ) 
      } else {
        resultado = (
          <div className="resultado">
            <span><Icone icone="triste" /> Putz!</span>
            <p>Ainda faltam alguns...Mas não desanime!</p>
          </div>
        )
      }
    }


    return (
      <>
      {resultado}
      <p>{respostas.length}/{questoes.length} concluídos</p>
      { respostas.map(resposta => <Icone icone={resposta} />) }
      </>
    )
  }

  const flashcards = montarFlashcards();
  const footer = montarFooter();

  return (
    <div className="Deck">
      <header>
        <img src={LogoPequeno} alt="ZapRecall" />
        <h1>Zap Recall</h1>
      </header>
      <main>
        {flashcards}
      </main>
      <footer>
        {footer}
      </footer>
    </div>
  )
}

function comparador() {
  return Math.random() - 0.5;
}

export default Deck;