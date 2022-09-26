import React from "react"

import { Link } from "react-router-dom";


export default class LearnSet extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            learnSet: {},
            words: [] 
        }
    }
    
    componentDidMount(){
        console.log(window.location.pathname.split("/"));
        const id = window.location.pathname.split("/")[2];                  // Gets the learnset id from the URL
        
        this.setState( { id: id })

        Promise.all([
            fetch("http://localhost:8080/api/learnset/" + id)               // Fetch Information about the learnset
                .then(response => response.json())
                .then(jsonData => this.setState({learnSet: jsonData})),     // If the words set is not found redirect to page not found
            fetch("http://localhost:8080/api/word/set/" + id)               // Fetch all words containe in the learnset
                .then(response => response.json())
                .then(jsonData => this.setState({words: jsonData }))
        ]).catch(() => window.location.assign("/notfound"))
    }

    // function from: https://dev.to/jorik/country-code-to-flag-emoji-a21
    getFlagEmoji = (countryCode) => { 
        if (!countryCode) {return null }
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char =>  127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
      }

    render(){
        const learnSet = this.state?.learnSet;
        // Learnset Info
        const LearnSetInfo = 
        <>
            <h1>{learnSet.name}</h1>
            <h2>{learnSet.language2?.name + " -> " + learnSet.language1?.name}</h2>
        </>


        // Learning Methods Buttons
        const Links = 
        <>
            <Link to={"/learnset/" + this.state.id + "/answer"}>Answer Mode</Link><br />
            <Link to={"/learnset/" + this.state.id + "/cards"}>Cards Mode</Link><br />
            <Link to={"/learnset/" + this.state.id + "/choice"}>Choose Mode</Link><br />
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