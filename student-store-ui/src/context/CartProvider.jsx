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
        const item = cartItems.find(item => item.id === id);
        if (!item) {
            addError("QUANTITY_MISMATCH", 500, "Item doesn't exist in the shopping cart.");
            return;
        }
        if (item.quantity === 1) {
            deleteItem(item.id);
            return;
        } else {
            let updatedCart = cartItems.map(cartItem => {
                if (cartItem.id === item.id) {
                    let prevItem = cartItem;
                    prevItem.quantity--;
                    return prevItem;
                }
                return cartItem;
            })
            setCartItems(updatedCart);
        }
        setQuantity(quantity => quantity - 1);
        setTotal(total => total - item.product.price);
    }

    const addItem = product => {
        const item = cartItems.find(item => item.product.id === product.id)
        if (item) {
            let updatedCart = cartItems.map(cartItem => {
                if (cartItem.id === item.id) {
                    let prevItem = cartItem;
                    prevItem.quantity++;
                    return prevItem;
                }
                return cartItem;
            })
            setCartItems(updatedCart);
        } else {
            const id = uuidv4();
            setCartItems(cartItems => [...cartItems, {
                id,
                product,
                quantity: 1
            }]);
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
        addItem: useCallback(product => addItem(product), [cartItems]),
        removeItem: useCallback(id => removeItem(id), [cartItems]),
        deleteItem: useCallback(id => deleteItem(id), [cartItems])
    }

    return <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
}