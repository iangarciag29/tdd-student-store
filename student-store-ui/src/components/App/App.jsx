import * as React from "react"
import Home from "../Home/Home"
import {BrowserRouter} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <main className="w-full min-h-screen flex flex-row relative md:fixed inset-0">
                    <Sidebar/>
                    <Home/>
                </main>
            </BrowserRouter>
        </div>
    )
}
