import React from "react"
import { Link } from "react-router-dom"
import LearnSetInfo from "./LearnSetInfo"
import './Styling/Home.css' 

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            learnsets: []
        }
    }

    componentDidMount() {
        // fetch all learnset data
        fetch("http://localhost:8080/api/learnset")
        .then(response => response.json())
        .then(jsonData => {this.setState({ learnsets : jsonData}); console.log(this.state);})      
    }

    render(){

        // map over every learnset 
        let display_sets = this.state.learnsets.map(e => {
            return (
                <LearnSetInfo key={e.id} learnSet={e} classNames="card hover-size"/>
            );
        })

        return (
            <div className="content">
                <div className="center title">
                    <h1>Wilkommen bei QuizMe</h1>
                </div>
                <p className="center">Wähle eine Lernset aus oder <Link to="/create">erstelle</Link> dein eigenes</p>
                <div className="grid-align">
                    { display_sets }
                </div>
            </div>
        )
    }
}

