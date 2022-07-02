const controller = {};

// Application store model.
const Store = require("../models/store");

/**
 * Get orders method that returns every order in the system.
 * @param {*} req Request
 * @param {*} res Response
 */
controller.getOrders = (req, res) => {
    res.status(200).json({
        orders: Store.listOrders()
    })
};

/**
 * Get specific order based on ID.
 * @param {*} req Request
 * @param {*} res Response
 */
controller.getOrder = (req, res) => {
    const { orderId } = req.params;
    res.status(200).json({
        order: Store.fetchOrder(orderId)
    })
};

module.exports = controller;