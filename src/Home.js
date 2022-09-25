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
        .then(jsonData => this.setState({ learnsets : jsonData}))      
    }


    render(){

        let display_sets = this.state.learnsets.map(e => {
            return (
                <div key={e.id}>
                    <Link to={"/learnset/" + e.id}>{e.name}</Link>

                </div>
            );
        })

        return (
            <div>
                <h1>Home</h1>
                { display_sets }
            </div>
        )
    }
}

