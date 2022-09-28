import React from "react";


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
        let learnSetName = document.getElementById("learnsetname").value
        let lang1_id = document.getElementById("language1").value
        let lang2_id = document.getElementById("language2").value

        if (lang1_id === lang2_id) {return alert("Languages cant be equal")}
        if (learnSetName === "") {return alert("Learnsetname cant be empty")}
       
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
            body: JSON.stringify(newLearnSet), 
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => console.log(response))
    }

    render(){

        let language1Options = this.state.languages.map((e, i) => { return <option key={i} value={e.id}>{e.name}</option> })
        let language2Options = this.state.languages.map((e, i) => { return <option key={i} value={e.id}>{e.name}</option> })

        let inputData = <div>
            <input id="learnsetname" type="text" placeholder="Name of Learnset"></input>

            <select id="language1">
                {language1Options}
            </select>

            <select id="language2">
                {language2Options}
            </select>

            <button onClick={this.createSet}>Create</button>
        </div>


        return (
            <div>
                <h1>This is the CreateLearnSet</h1>
                {inputData}
            </div>
        )
    }
}