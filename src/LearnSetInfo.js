import randomColor from "./Styling/RandomColor";

export default function LearnSetInfo(props) {
    /* This Component creates a information card from a learnSet */

    const learnSet = props.learnSet
    const classNames = props.classNames

    // create new date from unix
    const creationDate = new Date(learnSet.creationDate)
    const lastEdited = new Date(learnSet.lastEdited)

    return (
        <div className={classNames} onClick={() => window.location.href = `http://localhost:3000/${learnSet.id}`} style={{backgroundColor: randomColor()}}>
            <h1 className="name">{learnSet.name} <br /> {learnSet.language1?.flag} ➜ {learnSet.language2?.flag}</h1>
            <div className="grid-container">
                <div className="item-1">
                    <p><strong>Erstell datum:</strong> <br />{creationDate.toLocaleDateString()}</p>
                    <p><strong>Zuletzt bearbeited:</strong> <br/>{lastEdited.toLocaleDateString()}</p>
                </div>
                <div className="item-2">
                    <p><strong>Erste Sprache:</strong> <br />{learnSet.language1?.name}</p>
                    <p><strong>Zweite Sprache:</strong> <br />{learnSet.language2?.name}</p>
                </div>
            </div>
    </div>
    )
}