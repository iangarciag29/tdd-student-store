const express = require("express");
const router = express.Router();

// Application order controller.
const { getOrder, getOrders } = require("../controllers/order.controller");

router.get("/", getOrders);
router.get("/get-order/:orderId", getOrder)

module.exports = router;