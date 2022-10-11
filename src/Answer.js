import { React, useState } from "react"
import { useLocation } from "react-router";
import LearnSetInfo from "./LearnSetInfo";


export default function Answer(props) {
    const location = useLocation();
    const [index, setIndex] = useState(0) // new state of the index of the current card
    const [show, setShow] = useState(0) // state for which side of the result should be shown

    const words = location.state.words
    const learnSet = location.state.learnSet

    const plusHandler = () => { setIndex(index + 1); setShow(0) } // go to the next word
    const minusHandler = () => { setIndex(index - 1); setShow(0) } // go to the previous word
    const showResult = () => { setShow(1) } // show the correct answer

    const checkAnswer = () => {
        let answer = document.getElementById("answer").value
        answer === words[index].word ? alert("Correct!") : alert("Wrong, try again") // check if answer is correct
        setShow(1)
    }

    // Displays the words
    const firstWord = <div className="grid-align">
        <h1>{words[index].translation}</h1>
    </div>

    // shows the input box
    const input = <div className="grid-align inp">
            <input id="answer" type="text" placeholder="Gib die Übersetzung ein"></input>
    </div>


    // go forward or back
    const changeButton = 
        <div className="grid-align">
            <div>
                {index === 0 ? null : <button onClick={minusHandler} className="btn">zurück</button>}
                {index === words.length -1 ? null : <button onClick={plusHandler} className="btn">weiter</button>}
            </div> 
            <div>
                <button onClick={showResult} className="btn">Lösung anzeigen</button>
                <button onClick={checkAnswer} className="btn">Enter</button>
            </div>
        </div>

    // second word
    const secondWord = <div className="grid-align">
        {show ? <h1>{words[index].word}</h1> : null}
    </div>

    // displays the current index
    const currentPos = <div className="grid-align">
        {index + 1}/{words.length}
    </div>


    return (
        <div className="content">
            <LearnSetInfo learnSet={learnSet} classNames="clear"/>
            {currentPos}
            {firstWord}
            {input}
            {changeButton}
            {secondWord}
        </div>
    )
}