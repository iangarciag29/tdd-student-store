import {useContext} from "react";
import {CartContext} from "../components/Context/CartProvider";

const useShoppingCart = () => {
    const {cartItems, total, quantity, addItem, removeItem, deleteItem} = useContext(CartContext);
    return {cartItems, total, quantity, addItem, removeItem, deleteItem};
}

export default useShoppingCart;