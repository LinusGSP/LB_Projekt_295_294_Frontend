import {React, useState} from "react"
import { useLocation } from "react-router";


export default function Cards(props) {
    const location = useLocation();
    const [index, setIndex] = useState(0) 

    const words = location.state.words
    const learnSet = location.state.learnSet

    const minusHandler = () => { setIndex(index - 1)}
    const plusHandler = () => { setIndex(index + 1)}
    
    return (
        <div>
            <h1>{learnSet.name}</h1>
            <h1>{words[index].translation}</h1>
            <h1>{words[index].word}</h1>
            {index === 0 ? null : <button onClick={minusHandler}>zurück</button>}
            {index === words.length? null : <button onClick={plusHandler}>weiter</button>}
        </div>
    )
}