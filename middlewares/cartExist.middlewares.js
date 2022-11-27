const { Cart } = require("../models/cart.model");
const { ProductsInCart } = require("../models/productsInCart.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const cartExist = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
    include: { model: ProductsInCart },
  });

  if (!cart) {
    return next(new AppError("You don't have a cart active", 404));
  }

  req.cart = cart;
  next();
});

module.exports = { cartExist };
