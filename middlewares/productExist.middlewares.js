const { Products } = require("../models/products.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const productExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.findOne({ where: { id } });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  req.product = product;
  next();
});

module.exports = { productExist };
