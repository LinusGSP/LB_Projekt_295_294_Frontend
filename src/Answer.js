import {React, useState} from "react"
import { useLocation } from "react-router";


export default function Answer(props) {
    const location = useLocation();
    const [index, setIndex] = useState(0) 

    const words = location.state.words
    const learnSet = location.state.learnSet

    const handler = () => {
        setIndex(index + 1)
    }

    return (
        <div>
            <h1>{learnSet.name}</h1>
            <h1>{words[index]?.translation}</h1>
            <button onClick={handler}>next</button>
        </div>
    )
}