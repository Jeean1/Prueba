const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");
const { Orders } = require("../models/order.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { RegisterSales } = require("../models/registerSale.model");

dotenv.config({ path: "./config.env" });

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Orders.findAll();

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const getOrderWithId = catchAsync(async (req, res, next) => {
  const { order } = req;

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const GetAllRegisteredSales = catchAsync(async (req, res, next) => {
  const registerSale = await RegisterSales.findAll();

  if (!registerSale) {
    return next(new AppError("Registered sales not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { registerSale },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return next(new AppError("Invalid role", 400));
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  //comparo contraseñas desencriptadas y verifico qué el usuario exista
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials or user not found", 400));
  }

  //No muestro la contraseña en el response
  user.password = undefined;

  //genero JWT

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const createRegisteredSalesDaily = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { dateFinish } = req.body;
  const orders = await Orders.findAll();

  let totalSales = [];

  let subtotal = 0;
  let iva = 0;
  orders.forEach((i, length) => {
    if (
      new Date(i.date) <= new Date(dateFinish) &&
      new Date(i.date) < new Date()
    ) {
      subtotal += i.subtotal;
      iva += i.iva;
      totalSales.push(i);
    }
  });

  let total = subtotal + iva;

  //Necesito mostrar todas las orders registradas en el día de hoy, solamente de hoy.

  const registerSellsToday = await RegisterSales.create({
    quantitySales: totalSales.length,
    userId: sessionUser.id,
    subtotal,
    iva,
    total,
  });

  res.status(200).json({
    status: "success",
    data: { registerSellsToday },
  });
});

module.exports = {
  getAllOrders,
  createUser,
  getOrderWithId,
  GetAllRegisteredSales,
  login,
  createRegisteredSalesDaily,
};
