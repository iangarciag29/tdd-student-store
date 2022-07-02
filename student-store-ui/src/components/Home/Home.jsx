import * as React from "react"
import "./Home.css"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ToTopBtn from "../ToTop/ToTopBtn";
import {Route, Routes} from "react-router-dom";
import Landing from "../../pages/Landing";
import Checkout from "../../pages/Checkout";
import Products from "../../pages/Products";
import Product from "../../pages/Product";
import Orders from "../../pages/Orders";
import Order from "../../pages/Order";

export default function Home() {
    return (<div className="w-5/6 bg-gray-50 flex flex-col">
        <Navbar/>
        <div className="overflow-y-auto py-32 px-10">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/payment" element={<Checkout/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/order/:id" element={<Order/>}/>
            </Routes>
        </div>
        <Footer/>
        <ToTopBtn/>
    </div>)
}
