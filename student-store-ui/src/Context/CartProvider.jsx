import {createContext, useCallback, useState} from "react";
import useAppError from "../hooks/useAppError";
import {v4 as uuidv4} from "uuid";

export const CartContext = createContext({
    cartItems: [],
    total: 0,
    quantity: 0,
    addItem: () => {
    },
    removeItem: () => {
    },
    deleteItem: () => {
    }
});

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const {addError} = useAppError();

    const removeItem = id => {
        const item = cartItems.filter(item => item.id === id);
        if (item.length !== 1) {
            addError("QUANTITY_MISMATCH", 500, "Item doesn't exist in the shopping cart.");
            return;
        }
        if (item[0].quantity === 1) {
            deleteItem(item[0].id);
            return;
        }
        setQuantity(quantity => quantity - 1);
        setTotal(total => total - item[0].product.price);
    }

    const addItem = product => {
        console.log("cartItems", cartItems);
        const item = cartItems.find(item => item.product.id === product.id)
        if (item) {
            // ALREADY EXISTS.
            console.log("STOP RIGHT THERE.")
            return;
        } else {
            // DOES NOT EXIST AND SHOULD BE ADDED.
            console.log("ITEM DOES NOT EXIST AND IS BEING ADDED.")
            const id = uuidv4();
            setCartItems(cartItems => [...cartItems, {
                id: id,
                product: product,
                quantity: 1
            }]);
            console.log(cartItems)
        }
        setQuantity(quantity => quantity + 1);
        setTotal(total => total + product.price);
    }

    const deleteItem = id => {
        const item = cartItems.find(item => item.id === id);
        if (!item) {
            addError("ITEM_NOT_FOUND", 500, "Item couldn't be found.");
            return;
        }
        const totalAmount = item.product.price * item.quantity;
        setQuantity(quantity => quantity - item.quantity);
        setTotal(total => total - totalAmount);
        setCartItems(items => items.filter(item => item.id !== id));
    }

    const contextValue = {
        cartItems,
        total,
        quantity,
        addItem: useCallback(product => addItem(product), []),
        removeItem: useCallback(id => removeItem(id), []),
        deleteItem: useCallback(id => deleteItem(id), [])
    }

    return <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
}