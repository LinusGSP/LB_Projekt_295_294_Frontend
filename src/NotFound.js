import React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.Component{

    render(){
        return (
            <div className="content">
                <h1>the page was not not found</h1>
                <h2><Link to="/">Home</Link></h2>
            </div>
            )
    }
} 