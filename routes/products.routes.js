const express = require("express");

// Controllers
const {
  getAllProducts,
  createNewProduct,
  getProductWithId,
} = require("../controllers/products.controller");
const {
  protectAdmin,
  protectSession,
} = require("../middlewares/auth.middlewares");

// Middlewares
const { productExist } = require("../middlewares/productExist.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", productExist, getProductWithId);

productsRouter.use(protectSession);

productsRouter.post("/", protectAdmin, createNewProduct);

module.exports = { productsRouter };
