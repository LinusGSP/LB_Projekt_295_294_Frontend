import React from "react";
import './Styling/Create.css'

export default class CreateLearnSet extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            languages: [],
            language: ""
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/language")
            .then(response => response.json())
            .then(data => this.setState({languages: data}))
    }


    createSet = () => {
        let learnSetName = document.getElementById("learnsetname").value // gets inputed Name
        let lang1_id = document.getElementById("language1").value // gets inputed first lang
        let lang2_id = document.getElementById("language2").value // gets inputed second lang

        // Validation
        if (lang1_id === lang2_id) {return alert("Languages cant be equal")}
        if (learnSetName === "") {return alert("Learnsetname cant be empty")}
       
        // new learnSet object
        let newLearnSet = {
            "name": learnSetName,
            "language1": {
                "id": lang1_id
            },
            "language2": {
                "id": lang2_id
            }
        }
        

        fetch("http://localhost:8080/api/learnset", {
            method: "POST", 
            body: JSON.stringify(newLearnSet), // !!! Stringify !!!
            headers: {'Content-Type': 'application/json'}
        })
        
        window.location.assign("/") // send back to home page
    }

    render(){

        // the language selector
        let language1Options = this.state.languages.map((e, i) => { return <option key={i} value={e.id}>{e.name}</option> })
        let language2Options = this.state.languages.map((e, i) => { return <option key={i} value={e.id}>{e.name}</option> })


        // learnSet input name
        const inputName = <div className="grid-align inp">
            <input id="learnsetname" type="text" placeholder="Name of Learnset"></input>
        </div>

        // dropdown
        let inputLanguage = <div className="grid-align">

                <div className="dropdown">
                    <p>First Language: </p>
                    <select id="language1">
                        {language1Options}
                    </select>
                </div>
                <div className="dropdown">
                    <p>Second Language: </p>
                    <select id="language2">
                        {language2Options}
                    </select>

                </div>

        </div>


        // submit button
        const send = <div className="grid-align">
            <button onClick={this.createSet} className="btn">Create</button>
        </div>

        return (
            <div className="content">
                <h1>Hier kannst du ein neues Lernset erstellen.</h1>
                {inputName}
                {inputLanguage}
                {send}
            </div>
        )
    }
}