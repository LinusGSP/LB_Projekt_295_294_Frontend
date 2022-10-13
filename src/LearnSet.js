import React from "react"

import { Link, useParams } from "react-router-dom";
import './Styling/LearnSet.css'
import LearnSetInfo from "./LearnSetInfo";

class LearnSetComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            learnSet: {},
            words: []
        }
    }

    componentDidMount() {
        // Get Learnset and word data
        Promise.all([
            fetch("http://localhost:8080/api/learnset/" + this.state.id)                // Fetch Information about the learnset
                .then(response => response.json())
                .then(jsonData => {
                    console.log(jsonData);
                    this.setState({ learnSet: jsonData })
                }),
            fetch("http://localhost:8080/api/word/set/" + this.state.id)                // Fetch all words contained in the learnset
                .then(response => response.json())
                .then(jsonData => this.setState({ words: jsonData }))
        ]).catch(() => window.location.assign("/notfound"))                             // If the words set is not found redirect to page not found
    }


    // Delete a word in the table
    deleteHandler = (word, index) => {
        const requestData = {
            method: "DELETE",
        }

        fetch("http://localhost:8080/api/word/" + word.id, requestData)          // Delete word from Database
            .then(() =>
                this.setState({
                    words: this.state.words                                         // Remove word from state
                        .filter((_, i) => { return i !== index })
                }),
            )
    }

    createHandler = () => {
        // Creates a new Table row with input fields

        const table = document.getElementById("wordtable")
        var row = table.insertRow(1);

        // create input fields
        row.insertCell(0).innerHTML = "<input id='inp1' type='text'></input>";
        row.insertCell(1).innerHTML = "<input id='inp2' type='text'></input>"
        row.insertCell(2);
        row.insertCell(3).innerHTML = "<button id='btn1'>Send</button>"

        // Send Button
        let btn1 = document.getElementById("btn1")
        btn1.addEventListener("click", this.sendHandler)

    }

    editHandler = (e, i) => {
        const row = document.getElementById("wordtable").rows[i + 1].cells

        row[0].innerHTML = `<input id='inp1' type='text' value="${e.word}"></input>`;
        row[1].innerHTML = `<input id='inp2' type='text' value="${e.translation}"></input>`;
        row[2].innerHTML = `<button>Submit</button>`

        row[2].addEventListener("click", () => this.putHadler(i))
    }

    // Edits a already existing word
    putHadler = (i) => {

        // get the word/translation input from the table row
        let word = document.getElementById("inp1").value
        let translation = document.getElementById("inp2").value


        // Validation
        if (word === "") return alert("word 1 cant be empty")
        if (translation === "") return alert("word 2 cant be empty")

        // word object
        let learnWord = {
            "translation": translation + " ",
            "word": word + " ",
            "learnSetId": this.state.id,
            "id": this.state.words[i].id
        }

        // request data
        const requestData = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(learnWord)                                   // !!! Stringify !!!
        }

        fetch("http://localhost:8080/api/word", requestData)
            .then(response => response.json())
            .then(jsonData => {
                this.setState((prevState) => {
                    return { words: [...prevState.words.map((obj) => obj.id === jsonData.id ? jsonData : obj)] }
                })
            })

        const row = document.getElementById("wordtable").rows[i + 1].cells

        row[2].innerHTML = "<td className={small-b}>Edit</td>"

    }

    sendHandler = () => {
        // Creates new word object and send POST request
        let word = document.getElementById("inp1").value
        let translation = document.getElementById("inp2").value

        // Validation
        if (word === "") return alert("word 1 cant be empty")
        if (translation === "") return alert("word 2 cant be empty")

        // Word object
        let learnWord = {
            "translation": translation,
            "word": word,
            "learnSetId": this.state.id,
        }

        // request data
        const requestData = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(learnWord)                                   // !!! Stringify !!!
        }

        fetch("http://localhost:8080/api/word", requestData)
            .then(response => response.json())
            .then(word => {
                this.setState((prevState) => {
                    return ({ words: [word, ...prevState.words] })                // add the word to the state
                })
            }
            )
            .then(() => document.getElementById("wordtable").deleteRow(1)) // Delete the input row
    }

    // shuffle the word list
    shuffle = () => {
        this.setState({ words: this.state.words.sort(function () { return Math.random() - 0.5 }) })
    }

    render() {
        const learnSet = this.state?.learnSet

        // Learning Methods Links
        const Links =
            <div className="grid-align">
                {
                    this.state.words.length === 0 ? null :              // check if atleast 1 word in list
                        <div className="links">
                            <Link className="hover-size" to={"/" + this.state.id + "/answer"} state={{ ...this.state }}>Answer Mode</Link>
                            <Link className="hover-size" to={"/" + this.state.id + "/cards"} state={{ ...this.state }}>Cards Mode</Link>
                            <Link className="hover-size" onClick={this.shuffle}>Mischeln</Link>
                        </div>
                }
            </div>

        // Words rows
        const Words = this.state.words.map((e, i) => {
            return (
                <tr key={i} className="hover-size">
                    <td>{e.word}</td>
                    <td>{e.translation}</td>

                    <td onClick={() => this.editHandler(e, i)} className="small-btn">Edit</td>
                    <td onClick={() => this.deleteHandler(e, i)} className="small-btn">Delete</td>
                </tr>
            )
        });


        // Wordlist table
        const Table = <table id="wordtable">
            <tbody>
                <tr className="hover-size">
                    <th>{learnSet.language2?.name}</th>
                    <th>{learnSet.language1?.name}</th>

                    <th>Edit</th>
                    <th onClick={this.createHandler} className="small-btn">New</th>
                </tr>
                {Words}
            </tbody>
        </table>


        return (
            <div className="content">
                <LearnSetInfo learnSet={learnSet} classNames="clear" />
                {Links}
                {Table}
            </div>
        )
    }
}


export default function LearnSet(props) {
    // A intermediat function so the useParams method can be called and passed on the learnset id
    let { id } = useParams();
    return (
        <LearnSetComponent id={id} />
    )
}