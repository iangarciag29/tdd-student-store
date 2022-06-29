const express = require("express");
const router = express.Router();

const {getProducts, getProduct, createOrder} = require("../controllers/StoreController");

router.get("/", getProducts);
router.get("/:productId", getProduct);
router.post("/", createOrder);


module.exports = router;