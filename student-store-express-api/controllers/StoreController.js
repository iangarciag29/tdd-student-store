const StoreModel = require("../models/StoreModel");
const controller = {}

controller.getProducts = (req, res) => {
    res.status(200).send({
        products: StoreModel.getAllProducts()
    });
}

controller.getProduct = (req, res) => {
    const {productId} = req.params;
    res.status(200).send({
        product: StoreModel.fetchProducts(productId),
    });
}

controller.createOrder = (req, res) => {
    const {shoppingCart, user} = req.body;
    const purchase = StoreModel.createOrder({shoppingCart, user});
    res.status(201).send({
        purchase
    })
}

module.exports = controller;