const StoreModel = require("../models/StoreModel");
const controller = {}

controller.getOrders = (req, res) => {
    res.status(200).send({
        orders: StoreModel.listOrders()
    })
}

controller.getOrder = (req, res) => {
    const {orderId} = req.params;
    res.status(200).json({
        order: StoreModel.fetchOrder(orderId)
    })
}

module.exports = controller