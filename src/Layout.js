import { Outlet } from "react-router-dom";
import GlobalNavigation from "./GlobalNavigation";

export default function Layout(params) {
    return (
        <div className="App">
            <GlobalNavigation />
            <Outlet />
        </div>
    );
}