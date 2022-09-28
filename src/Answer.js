import {React, useState} from "react"
import { useLocation } from "react-router";


export default function Answer(props) {
    const location = useLocation();
    const [index, setIndex] = useState(0) 
    const [show, setShow] = useState(0)

    const words = location.state.words
    const learnSet = location.state.learnSet

    const plusHandler = () => { setIndex(index + 1); setShow(0)}
    const minusHandler = () => { setIndex(index - 1); setShow(0) }

    const showResult = () => {
        setShow(1)
    }

    const checkAnswer = () => {
        let answer = document.getElementById("answer").value
        if (answer === words[index].word){
            alert("Correct")
        } else {
            alert("Wrong")
        } 
    }

    return (
        <div>
            <h1>{learnSet.name}</h1>
            <h1>{words[index].translation}</h1>
            
            <input id="answer" type="text" placeholder="Gib die Übersetzung ein"></input>
            
            {index === 0 ? null : <button onClick={minusHandler}>zurück</button>}
            {index === words.length ? null : <button onClick={plusHandler}>weiter</button>}

            <button onClick={showResult}>antwort Anzeigen</button>
            <button onClick={checkAnswer}>Enter</button>
            {show ? <h1>{words[index].word}</h1> : null}
        </div>
    )
}