// Errors
const { BadRequestError } = require("../utils/errors");

const { storage } = require("../data/storage");

/**
 * Application store structure and main functionallity.
 */
class Store {
    
    /**
     * Get all the available products inside the database.
     * @returns Product array.
     */
    static listProducts() {
        try {
            return storage.get("products").value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    /**
     * Get specific product stored in the local database.
     * @param {int} id Product ID.
     * @returns Product object.
     */
    static fetchProduct(id) {
        try {
            return storage.get("products").find({ id: Number(id) }).value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    /**
     * Creates and stores a new order into the local database.
     * @param {object} data Required information to create order. 
     * @returns Order data object.
     */
    static createOrder({
        shoppingCart,
        user
    }) {
        try {

            if (!shoppingCart || !user) throw new BadRequestError("Information is missing.");

            const uniqueValues = new Set(shoppingCart.map(v => v.itemId));
            if (uniqueValues.size < shoppingCart.length) throw new BadRequestError();

            let total = 0;
            for (let i = 0; i < shoppingCart.length; i++) {
                let {
                    quantity,
                    itemId
                } = shoppingCart[i];
                if (!quantity || !itemId) throw new BadRequestError();
                total += shoppingCart[i].quantity * Store.fetchProduct(shoppingCart[i].itemId).price;
            };

            total *= 1.0875;

            const purchase = {
                id: storage.get("purchases").value().length + 1,
                name: user.name,
                email: user.email,
                order: shoppingCart,
                total,
                createdAt: new Date().toString(),
                receipt: `Receipt #${storage.get("purchases").value().length + 1}, by user: ${user.name}. Total price: $${parseFloat(total).toFixed(2)}`
            }

            storage.get("purchases").push(purchase).write();
            return purchase;
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    /**
     * Retreives all the orders from the local database.
     * @returns Purchases array.
     */
    static listOrders() {
        try {
            return storage.get("purchases").value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    /**
     * Retreives an specific order from the local database.
     * @param {int} id Order id.
     * @returns Order data object.
     */
    static fetchOrder(id) {
        try {
            return storage.get("purchases").find({ id: Number(id) }).value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }
}

module.exports = Store;