import React from "react";
import { Outlet } from "react-router-dom";

import GlobalNavigation from "./GlobalNavigation";

export default class Layout extends React.Component{

    render() {
        return (
            <div className="App">
                <GlobalNavigation />
                <div className="content">
                    <header className="App-header">
                        <Outlet />
                    </header>
                </div>
            </div>
        );
    }
}