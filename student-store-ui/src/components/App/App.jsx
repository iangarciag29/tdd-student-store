import * as React from "react"
import Home from "../Home/Home"
import {BrowserRouter} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import {ErrorProvider} from "../Context/ErrorProvider";
import {CartProvider} from "../Context/CartProvider";

export default function App() {
    return (
        <ErrorProvider>
            <CartProvider>
                <div className="app">
                    <BrowserRouter>
                        <main className="w-full min-h-screen flex flex-row relative md:fixed inset-0">
                            <Sidebar/>
                            <Home/>
                        </main>
                    </BrowserRouter>
                </div>
            </CartProvider>
        </ErrorProvider>
    )
}
