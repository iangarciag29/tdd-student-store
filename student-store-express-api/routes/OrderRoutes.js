const express = require("express");
const router = express.Router();

const {getOrder, getOrders} = require("../controllers/OrderController");

router.get("/", getOrders);
router.get("/:orderId", getOrder);

module.exports = router;