import { React, useState } from "react"
import { useLocation } from "react-router";
import LearnSetInfo from "./LearnSetInfo";


export default function Cards(props) {
    const location = useLocation(); // get state

    const [index, setIndex] = useState(0) // new state of the index of the current card
    const [isClicked, setIsClicked] = useState(0) // state for which side of the card should be shown

    const words = location.state.words  // get all the learnset words
    const learnSet = location.state.learnSet // get the learnset info

    // change the current card
    const minusHandler = () => { setIndex(index - 1) }
    const plusHandler = () => { setIndex(index + 1) }

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
            <LearnSetInfo learnSet={learnSet} classNames="clear"/>
            {currentPos}
            {recordCard}
            {buttons}
        </div>
    )
}