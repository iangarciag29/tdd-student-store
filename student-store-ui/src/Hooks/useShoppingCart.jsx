import {useContext} from "react";
import {CartContext} from "../components/Context/CartProvider";

const useShoppingCart = () => {
    const {items, total, quantity, addItem, removeItem, deleteItem} = useContext(CartContext);
    return {items, total, quantity, addItem, removeItem, deleteItem};
}

export default useShoppingCart;