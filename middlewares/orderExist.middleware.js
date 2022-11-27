const { Orders } = require("../models/order.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findOne({ where: { id } });

  if (!order) {
    return next(new AppError("Order id not found", 404));
  }
  console.log(order);
  req.order = order;
  next();
});

module.exports = { orderExist };
