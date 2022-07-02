const express = require("express");
const router = express.Router();

// Application store controller.
const { getProducts, getProduct, createOrder, getOrders, getOrder } = require("../controllers/store.controller");

router.get("/", getProducts);
router.get("/:productId", getProduct)
router.post("/", createOrder)

module.exports = router;