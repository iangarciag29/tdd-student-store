import * as React from "react"
import {Badge, Dropdown, Tooltip} from "flowbite-react";
import {DollarIcon} from "../../icons/DollarIcon";
import {TrashIcon} from "../../icons/TrashIcon";
import {PlusIcon} from "../../icons/PlusIcon";
import {MinusIcon} from "../../icons/MinusIcon";
import {Link} from "react-router-dom";
import useShoppingCart from "../../Hooks/useShoppingCart";

export default function Navbar() {

    const {items, total, addItem, removeItem, deleteItem} = useShoppingCart();

    return (
        <nav className="navbar w-5/6 h-20 bg-gray-50 shadow flex flex-row-reverse px-10 justify-around fixed">
            <div className="grid items-center px-10 z-40 cursor-default" title="My Cart">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>}
                    placement="left-start"
                >
                    <Dropdown.Header>
                        <span className="block text-sm font-bold text-center mb-1">
                          Shopping Cart
                        </span>
                    </Dropdown.Header>
                    {items.length === 0 && <div className="px-10 py-5"><p>Your cart is empty!</p></div>}
                    {items?.map(item => <Dropdown.Item key={item.id}>
                        <div className="flex flex-row space-x-20">
                            <p>{item.product.name}</p>
                            <div className="flex flex-row space-x-3">
                                <Badge icon={MinusIcon}
                                       class="bg-sky-200 rounded-full p-1 pt-1 text-sky-900 hover:bg-sky-800 hover:text-gray-50"
                                       onClick={() => removeItem(item.id)}/>
                                <p>{item.quantity}</p>
                                <Badge icon={PlusIcon}
                                       class="bg-sky-200 rounded-full px-1 pt-1 text-sky-900 hover:bg-sky-800 hover:text-gray-50"
                                       onClick={() => addItem(item.product)}
                                />
                            </div>
                            <div className="flex flex-row space-x-3">
                                <Tooltip
                                    content={`$${item.product.price} per unit`}
                                    trigger="hover"
                                >
                                    <p>${item.product.price * item.quantity}</p>
                                </Tooltip>
                            </div>
                            <Badge icon={TrashIcon} onClick={() => deleteItem(item.id)}
                                   class="bg-red-200 rounded-full px-1 pt-1 text-red-800 hover:bg-red-800 hover:text-gray-50"/>
                        </div>
                    </Dropdown.Item>)}
                    <Dropdown.Divider/>
                    <Dropdown.Item>
                        <div className="flex flex-row justify-between">
                            <p className="font-bold">Total</p>
                            <span>${parseFloat(total).toFixed(2)}</span>
                        </div>
                    </Dropdown.Item>
                    {items.length !== 0 && <Dropdown.Item>
                        <div className="mx-auto text-center">
                            <button
                                className="bg-blue-900 px-8 py-1 text-xs text-gray-50 rounded-md inline-flex space-x-2 hover:bg-blue-800">
                                <DollarIcon/>
                                <Link to="/payment"><span>Go to Pay</span></Link>
                            </button>
                        </div>
                    </Dropdown.Item>}
                </Dropdown>

            </div>
            <div className="w-2/3 grid items-center">
                <form className="flex items-center z-10">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="simple-search"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                               placeholder="Search for some products..." required=""/>
                    </div>
                    <button type="submit"
                            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-900 rounded-lg border border-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </nav>
    )
}
