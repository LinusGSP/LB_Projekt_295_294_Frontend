import React from "react";
import { Link } from "react-router-dom";


export default class GlobalNavigation extends React.Component{


    render(){
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/">LearnSets</Link>
                    </li>

                </ul>
                
            </nav>
        );
    }
}