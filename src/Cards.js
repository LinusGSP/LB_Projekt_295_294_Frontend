import { React, useState } from "react"
import { useLocation } from "react-router";


export default function Cards(props) {
    const location = useLocation(); // get state

    const [index, setIndex] = useState(0) // new state of the index of the current card
    const [isClicked, setIsClicked] = useState(0) // state for which side of the card should be shown

    const words = location.state.words  // get all the learnset words
    const learnSet = location.state.learnSet // get the learnset info


    // change the current card
    const minusHandler = () => { setIndex(index - 1) }
    const plusHandler = () => { setIndex(index + 1) }

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

    // the main card
    const recordCard = 
    <div className="grid-align">
        <div className="recordCard" onClick={() => setIsClicked(isClicked + 1)}>
            <h1>{isClicked % 2 === 0 ? words[index].word : words[index].translation}</h1>
        </div>
    </div>

    // next and back button
    const buttons = 
        <div className="grid-align">
            <div >
            {index === 0 ? null : <button onClick={minusHandler} className="btn">zurück</button>}
            {index === words.length - 1 ? null : <button onClick={plusHandler}  className="btn">weiter</button>}
            </div>
        </div>

    // show current index
    const currentPos = <div className="grid-align">
    {index + 1}/{words.length}
    </div>


    return (
        <div className="content">
            {LearnSetInfo}
            {currentPos}
            {recordCard}
            {buttons}
        </div>
    )
}