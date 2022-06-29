import {useContext} from "react";
import {CartContext} from "../context/CartProvider";

const useShoppingCart = () => {
    const {cartItems, total, quantity, addItem, removeItem, deleteItem, emptyCart} = useContext(CartContext);
    return {cartItems, total, quantity, addItem, removeItem, deleteItem, emptyCart};
}

export default useShoppingCart;