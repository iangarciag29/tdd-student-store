import {Link, useParams} from "react-router-dom";
import useAppError from "../hooks/useAppError";
import {useEffect, useState} from "react";
import {Spinner} from "flowbite-react";
import axios from "axios";
import {API_URL} from "../api";
import orders from "./Orders";

const Order = () => {

    const {id} = useParams();

    const {addError} = useAppError();
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL + "/orders/get-order/" + id).then(res => {
                setTimeout(() => {
                    setOrder(res.data.order);
                    (async () => {
                        await res.data.order.order.map(item => {
                            axios.get(API_URL + "/store/" + item.itemId).then(res => {
                                setItems(items => [...items, {product: res.data.product, quantity: item.quantity}]);
                            });
                        })
                    })();
                    setIsLoading(false);
                }, 500);
            }).catch(err => {
                addError(err.code, err.response.status, err.response.statusText);
            })
        })()
        console.log(order)
    }, [id]);

    if (isLoading) return <div className="text-center my-20">
        <Spinner/>
    </div>

    return <div className="flex flex-col">
        <div className="text-center relative">
            <h3 className="font-semibold text-xl uppercase">Order <span
                className="text-xs text-gray-500">(ID: {order.id})</span></h3>
            <div className="absolute top-0 bottom-0 left-14">
                <Link to="/orders" className="text-xs uppercase bg-blue-900 text-gray-50 px-4 py-1 rounded-lg">Back</Link>
            </div>
        </div>
        <hr className="mx-[5%] my-10"/>
        <div className="flex flex-row">
            <div className="w-2/3 flex flex-col px-10">
                <h4 className="font-bold uppercase mb-5">Products</h4>
                <div className="flex flex-col space-y-2">
                    {items?.map((item, idx) => <div className="rounded-md bg-gray-100 p-5 flex flex-row justify-between" key={idx}>
                        <div className="h-20 w-20 object-cover bg-cover rounded-full flex-none mr-5" style={{
                            background: `url(${item.product.image}) center center no-repeat`,
                            backgroundSize: "cover"
                        }}/>
                        <div className="grid items-center flex-none">
                            <div className="flex flex-col max-w-sm">
                                <h5 className="font-semibold">{item.product.name}</h5>
                                <p className="truncate text-gray-400">{item.product.description}</p>
                            </div>
                        </div>
                        <div className="grid items-center">
                            <div className="flex flex-col text-center">
                                <h5 className="font-semibold text-xl">{item.quantity}</h5>
                                <p className="uppercase font-bold text-xs">Quantity</p>
                            </div>
                        </div>
                        <div className="grid items-center mr-5">
                            <h5 className="font-normal text-xl">${parseFloat(item.product.price).toFixed(2)}</h5>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className="w-1/3 flex flex-col mx-auto p-5 text-center border-l space-y-[10%]
            ">
                <h4 className="font-bold uppercase mb-5">Client data</h4>
                <div className="flex flex-col text-base space-y-[5%]">
                    <p>Name: <span className="text-sm">{order.name}</span></p>
                    <p>Email: <a href={`mailto:${order.email}`} className="text-sm">{order.email}</a></p>
                </div>
                <hr className="mx-[20%]"/>
                <div className="flex flex-col text-base space-y-[5%]">
                    <p>Amount paid: <span className="text-sm">${parseFloat(order.total).toFixed(2)}</span></p>
                    <p>Items in order: <span className="text-sm">{order.order.length}</span></p>
                </div>
                <div>
                    <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    </div>
}

export default Order;