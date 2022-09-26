import React from "react"

import { Link, useParams } from "react-router-dom";

class LearnSetComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.id,
            learnSet: {},
            words: [] 
        }
    }

    componentDidMount(){
        Promise.all([
            fetch("http://localhost:8080/api/learnset/" + this.state.id)               // Fetch Information about the learnset
                .then(response => response.json())
                .then(jsonData => this.setState({learnSet: jsonData})),    
            fetch("http://localhost:8080/api/word/set/" + this.state.id)               // Fetch all words containe in the learnset
                .then(response => response.json())
                .then(jsonData => this.setState({words: jsonData }))
        ]).catch(() => window.location.assign("/notfound"))                            // If the words set is not found redirect to page not found
    }

    render(){
        const learnSet = this.state?.learnSet;
    
        // Learnset Info
        const LearnSetInfo = 
        <>
            <h1>{learnSet.name}</h1>
            <h2>{learnSet.language2?.name + " -> " + learnSet.language1?.name}</h2>,
        </>



        // Learning Methods Buttons
        const Links = 
        <>
            <Link to={"/" + this.state.id + "/answer"} state={{...this.state}}>Answer Mode</Link><br />
            <Link to={"/" + this.state.id + "/cards"} state={{...this.state}}>Cards Mode</Link><br /> 
            <Link to={"/" + this.state.id + "/choice"} state={{...this.state}}>Choose Mode</Link><br />
        </>


        // TODO Create Delete method
        // Word List
        const Words = this.state.words.map((e, i) => {
            return (
                <tr key={i}>
                    <td>{e.word}</td>
                    <td>{e.translation}</td>
                    <td>{e.marked ? 1 : 0}</td>
                    <td><button>Delete</button></td>
                </tr>
            )
        });


        // TODO Create New word method
        // Wordlist table
        const Table = <table>
        <tbody>
            <tr>
                <th>{learnSet.language2?.name}</th>
                <th>{learnSet.language1?.name}</th>
                <th>Marked</th>
                <th><button>New</button></th> 
            </tr>
            {Words}
        </tbody>
    </table>

        
        // TODO Update all flags: https://www.countryflags.com/
        return (
            <div>
                {LearnSetInfo}
                {Links}
                {Table}
            </div>
        )
    }
}


export default function LearnSet(props) {
    let { id } = useParams();
    return (
        <LearnSetComponent id={id}/>
    )
}