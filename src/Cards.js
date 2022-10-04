import { React, useState } from "react"
import { useLocation } from "react-router";


export default function Cards(props) {
    const location = useLocation();
    const [index, setIndex] = useState(0)

    const words = location.state.words
    const learnSet = location.state.learnSet

    const minusHandler = () => { setIndex(index - 1) }
    const plusHandler = () => { setIndex(index + 1) }

    let creationDate = new Date(learnSet.creationDate)
    let lastEdited = new Date(learnSet.lastEdited)

    const LearnSetInfo = <div>
    <h1>{learnSet.name} {learnSet.language1?.flag} ➜ {learnSet.language2?.flag}  </h1>
    <div className="learnsetinfo">
            <div className="date">
                <p><strong>Erstell datum:</strong> <br />{creationDate.getDate() + "/" + creationDate.getMonth()+ "/" + creationDate.getFullYear() }</p>
                <p><strong>Zuletzt bearbeited:</strong> <br/>{lastEdited.getDate() + "/" + lastEdited.getMonth()+ "/" + lastEdited.getFullYear() }</p>
            </div>
            <div className="language">
                <p><strong>Erste Sprache:</strong> <br />{learnSet.language1?.name}</p>
                <p><strong>Zweite Sprache:</strong> <br />{learnSet.language2?.name}</p>
            </div>
        </div>
    </div>

    const recordCard = 
    <div className="recordCard">
        <div>
            <h1>{words[index].translation}</h1>
        </div>
    </div>

    const buttons = <div className="grid-align">
        {index === 0 ? null : <button onClick={minusHandler}>zurück</button>}
        {index === words.length - 1 ? null : <button onClick={plusHandler}>weiter</button>}
        </div>

    return (
        <div className="content">
            {LearnSetInfo}
            {recordCard}
            {buttons}
        </div>
    )
}