const controller = {};

// Application store model.
const Store = require("../models/store");

/**
 * Get all products in the local database.
 * @param {*} req Request
 * @param {*} res Response
 */
controller.getProducts = (req, res) => {
    res.status(200).json({
        products: Store.listProducts()
    })
};

/**
 * Get specific product based on ID.
 * @param {*} req Request
 * @param {*} res Response
 */
controller.getProduct = (req, res) => {
    const { productId } = req.params;
    res.status(200).json({
        product: Store.fetchProduct(productId)
    })
};

/**
 * Creates a new order & stores it in the local database.
 * @param {*} req Request
 * @param {*} res Response
 */
controller.createOrder = (req, res) => {
    const {
        shoppingCart,
        user
    } = req.body;

    const purchase = Store.createOrder({
        shoppingCart,
        user
    });
    res.status(201).json({
        purchase
    })
};

module.exports = controller;
