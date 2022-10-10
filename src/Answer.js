import { React, useState } from "react"
import { useLocation } from "react-router";


export default function Answer(props) {
    const location = useLocation();
    const [index, setIndex] = useState(0)
    const [show, setShow] = useState(0)

    const words = location.state.words
    const learnSet = location.state.learnSet

    const plusHandler = () => { setIndex(index + 1); setShow(0) }
    const minusHandler = () => { setIndex(index - 1); setShow(0) }

    const showResult = () => {
        setShow(1)
    }

    const checkAnswer = () => {
        let answer = document.getElementById("answer").value
        if (answer === words[index].word) {
            alert("Correct!")
        } else {
            alert("Wrong, try again")
        }
        setShow(1)
    }

    // create new date from unix
    let creationDate = new Date(learnSet.creationDate)
    let lastEdited = new Date(learnSet.lastEdited)

    // all learnset infos
    const LearnSetInfo = <div>
    <h1 onClick={() => window.location.replace("http://localhost:3000/" + learnSet.id)}>{learnSet.name} {learnSet.language1?.flag} ➜ {learnSet.language2?.flag}  </h1>
    <div className="learnsetinfo">
            <div className="date">
                <p><strong>Erstell datum:</strong> <br />{creationDate.toLocaleDateString()}</p>
                <p><strong>Zuletzt bearbeited:</strong> <br/>{lastEdited.toLocaleDateString()}</p>
            </div>
            <div className="language">
                <p><strong>Erste Sprache:</strong> <br />{learnSet.language1?.name}</p>
                <p><strong>Zweite Sprache:</strong> <br />{learnSet.language2?.name}</p>
            </div>
        </div>
    </div>


    // shows the first word
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

    //
    const currentPos = <div className="grid-align">
        {index + 1}/{words.length}
    </div>


    return (
        <div className="content">
            {LearnSetInfo}
            {currentPos}
            {firstWord}
            {input}
            {changeButton}
            {secondWord}
        </div>
    )
}