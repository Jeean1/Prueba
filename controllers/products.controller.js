const { Products } = require("../models/products.model");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Products.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "200",
    data: { products },
  });
});

const getProductWithId = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

const createNewProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, userId, price, iva } = req.body;

  const newProduct = await Products.create({
    title,
    description,
    quantity,
    userId,
    price,
    iva,
  });

  res.status(200).json({
    status: "success",
    data: { newProduct },
  });
});

module.exports = { getAllProducts, getProductWithId, createNewProduct };
