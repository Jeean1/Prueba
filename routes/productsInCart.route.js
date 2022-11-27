const express = require("express");
const {
  getAllProductsInCartActives,
  addProductToCart,
  purchaseAllProductsActivesInCart,
} = require("../controllers/productsInCart.controller");
const { protectSession } = require("../middlewares/auth.middlewares");
const { cartExist } = require("../middlewares/cartExist.middlewares");

// Controllers

// Middlewares

const productsInCartRouter = express.Router();

productsInCartRouter.use(protectSession);

productsInCartRouter.get("/", getAllProductsInCartActives);

productsInCartRouter.post("/add-product", addProductToCart);

productsInCartRouter.post(
  "/purchase",
  cartExist,
  purchaseAllProductsActivesInCart
);

module.exports = { productsInCartRouter };
