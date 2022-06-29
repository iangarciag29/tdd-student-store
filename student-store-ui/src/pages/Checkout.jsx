import useShoppingCart from "../hooks/useShoppingCart";
import {Link} from "react-router-dom";
import {Button, Label, Modal, TextInput, Tooltip} from "flowbite-react";
import {useEffect, useState} from "react";

const Checkout = () => {

    const {cartItems, quantity, total, addItem, removeItem} = useShoppingCart();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems]);

    if (cartItems.length === 0) return <div className="text-center p-20 flex flex-col space-y-10">
        <h4 className="font-bold text-3xl">You do not have any items in your cart.</h4>
        <div>
            <Link to="/products" className="px-10 py-2 rounded-md bg-blue-900 text-gray-50 hover:bg-blue-800">Go
                shopping</Link>
        </div>
    </div>

    return <div className="text-center py-10">
        <h1 className="font-bold text-2xl">Checkout</h1>
        <hr className="my-10 mx-20"/>
        <div className="container px-10 flex flex-row">
            <div className="w-2/3 text-left px-10">
                <h3 className="uppercase font-semibold">Your item(s).</h3>
                <div className="space-y-2 mt-5">
                    {cartItems?.map(item => <div key={item.id} className="flex flex-row p-5 bg-gray-100">
                        <div className="w-2/3 flex flex-row overflow-hidden">
                            <div className="grid items-center pr-5 pl-3">
                                {item.quantity}
                            </div>
                            <div>
                                <Tooltip content={<p className="text-xs">[DEBUG-ITEM-ID] ${item.id}</p>}>
                                    <h4 className="font-bold">{item.product.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{item.product.description}</p>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="w-1/3 text-center flex flex-row justify-around">
                            <div className="flex flex-col text-xs gap-y-2">
                                <button onClick={() => addItem(item.product)}
                                        className="px-4 py-1 rounded bg-green-300 text-green-900 shadow hover:bg-green-500 hover:text-green-100">Add
                                </button>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="px-4 py-1 rounded bg-red-300 text-red-900 shadow hover:bg-red-500 hover:text-red-100">Remove
                                </button>
                            </div>
                            <div className="grid items-center">
                                <h4 className="text-2xl font-black">${item.product.price}</h4>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className="w-1/3 px-5">
                <h3 className="uppercase font-semibold text-xl">Summary</h3>
                <ul className="py-10">
                    <li>{quantity} item(s).</li>
                </ul>
                <h3 className="uppercase font-semibold text-xl">Total</h3>
                <ul className="py-10">
                    <li>${parseFloat(total).toFixed(2)}</li>
                </ul>
                <div className="text-center">
                    <Button onClick={() => setShowModal(true)}
                            class="bg-blue-900 px-10 py-2 rounded-md text-gray-50 hover:bg-blue-800">
                        Pay now
                    </Button>
                </div>
            </div>
        </div>
        <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
        >
            <Modal.Header>
                Complete checkout
            </Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="name"
                                value="Your name"
                            />
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            required={true}
                            palceholder="John Doe"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="emailInput"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="emailInput"
                            type="email"
                            placeholder="name@fb.com"
                            required={true}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        alert(`Thank you ${name} for buying from us, we will send a confirmation email to ${email}!`);
                        setShowModal(false);
                        setName("");
                        setEmail("");
                    }}>
                    Pay ${total}
                </Button>
                <Button
                    color="gray"
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default Checkout;
