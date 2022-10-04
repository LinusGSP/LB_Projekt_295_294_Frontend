import React from "react"
import { Link } from "react-router-dom"


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            learnsets: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/learnset")
        .then(response => response.json())
        .then(jsonData => {this.setState({ learnsets : jsonData}); console.log(this.state);})      
    }

    changeRoute = (id) => {
        window.location.assign(id)
    }


    render(){
        let display_sets = this.state.learnsets.map(e => {
            let creationDate = new Date(e.creationDate)
            let lastEdited = new Date(e.lastEdited)
            return (
                <div className="card" key={e.id} onClick={() => this.changeRoute(e.id)}>
                    <h2>{e.id} {e.name} {e.language1.flag} ➜ {e.language2.flag}</h2>
                    <div className="learnsetinfo">
                        <div className="date">
                            <p><strong>Erstell datum:</strong> <br />{creationDate.getDate() + "/" + creationDate.getMonth()+ "/" + creationDate.getFullYear() }</p>
                            <p><strong>Zuletzt bearbeited:</strong> <br/>{lastEdited.getDate() + "/" + lastEdited.getMonth()+ "/" + lastEdited.getFullYear() }</p>
                        </div>
                        <div className="language">
                            <p><strong>Erste Sprache:</strong> <br />{e.language1.name}</p>
                            <p><strong>Zweite Sprache:</strong> <br />{e.language2.name}</p>
                        </div>
                    </div>
                    {}
                </div>
            );
        })

        return (
            <div className="content">
                
            
                <div className="title">
                    <h1>Wilkommen bei QuizMe</h1>
                </div>
                <p>Wähle eine Lernset aus oder <Link to="/create">erstelle</Link> dein eigenes</p>
                <div className="cards">
                    { display_sets }
                </div>
            </div>
        )
    }
}

