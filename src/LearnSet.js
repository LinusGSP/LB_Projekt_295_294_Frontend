import React from "react"

import { Link, useParams } from "react-router-dom";

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
                .then(jsonData => this.setState({ learnSet: jsonData })),
            fetch("http://localhost:8080/api/word/set/" + this.state.id)                // Fetch all words contained in the learnset
                .then(response => response.json())
                .then(jsonData => this.setState({ words: jsonData }))
        ]).catch(() => window.location.assign("/notfound"))                             // If the words set is not found redirect to page not found
    }

    deleteHandler = (word, index) => {
        // Delete a word in the table
        fetch("http://localhost:8080/api/word/" + word.id, { method: "DELETE" })          // Delete word from Database
            .then(() =>
                this.setState({
                    words: this.state.words                                  // Remove word from state
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
        row.insertCell(3);
        row.insertCell(4).innerHTML = "<button id='btn1'>Send</button>"

        // Send Button
        let btn1 = document.getElementById("btn1")
        btn1.addEventListener("click", this.sendHandler)

    }

    editHandler = (e, i) => {
        const row = document.getElementById("wordtable").rows[i + 1].cells

        row[0].innerHTML = `<input id='inp1' type='text' value="${e.word}"></input>`;
        row[1].innerHTML = `<input id='inp2' type='text' value="${e.translation}"></input>`;
        row[3].innerHTML = `<button>Submit</button>`

        row[3].addEventListener("click", () => this.putHadler(i))
    }

    putHadler = (i) => {
        let inp1 = document.getElementById("inp1")
        let inp2 = document.getElementById("inp2")

        let editedWord = {
            "translation": inp2.value + " ",
            "word": inp1.value + " ",
            "learnSetId": this.state.id,
            "marked": null
        }

        fetch("http://localhost:8080/api/word/" + this.state.words[i].id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedWord)                                   // !!! Stringify !!!
        })
            .then(response => response.json())
            .then(jsonData => {
                this.setState((prevState) => {
                    return { words: [...prevState.words.map((obj) => obj.id === jsonData.id ? jsonData : obj)] }
                })
            })

        const row = document.getElementById("wordtable").rows[i + 1].cells

        row[3].innerHTML = "<td><button>Edit</button></td>"

    }

    sendHandler = () => {
        // Creates new word object and sends it to the Backend
        let inp1 = document.getElementById("inp1")
        let inp2 = document.getElementById("inp2")
        let newWord = {
            "translation": inp2.value,
            "word": inp1.value,
            "learnSetId": this.state.id,
            "marked": null
        }
        console.log(newWord);

        fetch("http://localhost:8080/api/word", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newWord)                                   // !!! Stringify !!!
        })
            .then(response => response.json())
            .then(word => this.setState((prevState) => {
                return ({ words: [word, ...prevState.words] })                // add the word to the state
            }))
            .then(() => document.getElementById("wordtable").deleteRow(1)) // Delete the input row
    }

    render() {
        const learnSet = this.state?.learnSet;

        let creationDate = new Date(learnSet.creationDate)
        let lastEdited = new Date(learnSet.lastEdited)
        // Learnset Info
        const LearnSetInfo =
            <div>
                <h1>{learnSet.name} {learnSet.language1?.flag} ➜ {learnSet.language2?.flag}  </h1>
                <div className="learnsetinfo">
                    <div className="date">
                        <p><strong>Erstell datum:</strong> <br />{creationDate.getDate() + "/" + creationDate.getMonth() + "/" + creationDate.getFullYear()}</p>
                        <p><strong>Zuletzt bearbeited:</strong> <br />{lastEdited.getDate() + "/" + lastEdited.getMonth() + "/" + lastEdited.getFullYear()}</p>
                    </div>
                    <div className="language">
                        <p><strong>Erste Sprache:</strong> <br />{learnSet.language1?.name}</p>
                        <p><strong>Zweite Sprache:</strong> <br />{learnSet.language2?.name}</p>
                    </div>
                </div>
            </div>



        // Learning Methods Links
        const Links =
            <div className="links">
                <Link className="hover-size" to={"/" + this.state.id + "/answer"} state={{ ...this.state }}>Answer Mode</Link>
                <Link className="hover-size" to={"/" + this.state.id + "/cards"} state={{ ...this.state }}>Cards Mode</Link>
            </div>

        // Word List
        const Words = this.state.words.map((e, i) => {
            return (
                <tr key={i} className="hover-size">
                    <td>{e.word}</td>
                    <td>{e.translation}</td>
                    <td>{e.marked ? 1 : 0}</td>
                    <td><button onClick={() => this.editHandler(e, i)}>Edit</button></td>
                    <td><button onClick={() => this.deleteHandler(e, i)}>Delete</button></td>
                </tr>
            )
        });


        // TODO Create New word method
        // Wordlist table
        const Table = <table id="wordtable">
            <tbody>
                <tr className="hover-size">
                    <th>{learnSet.language2?.name}</th>
                    <th>{learnSet.language1?.name}</th>
                    <th>Marked</th>
                    <th>Edit</th>
                    <th><button onClick={this.createHandler}>New</button></th>
                </tr>
                {Words}
            </tbody>
        </table>


        // TODO Update all flags: https://www.countryflags.com/
        return (
            <div className="content">
                {LearnSetInfo}
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