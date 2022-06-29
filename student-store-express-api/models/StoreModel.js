const {BadRequestException} = require("../errors");
const {storage} = require("../data/storage");

class StoreModel {
    static getAllProducts = () => {
        try {
            return storage.get("products").value();
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    static fetchProducts = id => {
        try {
            return storage.get("products").find({id: Number(id)}).value();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    static createOrder = ({shoppingCart, user}) => {
        try {
            if (!shoppingCart || !user) throw new BadRequestException("Both shopping cart and user are needed.");
            const keys = new Set(shoppingCart.map(item => item.id));
            if (keys.size < shoppingCart.length) throw new BadRequestException();

            let totalAmount = 0;
            for (let i = 0; i < shoppingCart.length; i++) {
                let {itemID, quantity} = shoppingCart[i];
                if (!quantity || !itemID) throw new BadRequestException();
                totalAmount += shoppingCart[i].quantity * StoreModel.fetchProducts(itemID).price;
            }

            totalAmount *= 1.0875; // TAX 💵
            const order = {
                id: storage.get("purchases").value().length + 1,
                name: user.name,
                email: user.email,
                items: shoppingCart,
                totalAmount,
                timestamp: new Date().toString()
            }

            storage.add(order.id, order);
            return order;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    static listOrders = () => {
        try {
            return storage.get("purchases").value();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    static fetchOrder = id => {
        try {
            return storage.get("purchases").find({id: Number(id)}).value();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}


module.exports = StoreModel;