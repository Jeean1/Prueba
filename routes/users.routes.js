const express = require("express");

// Controllers
const {
  createUser,
  getAllOrders,
  getOrderWithId,
  GetAllRegisteredSales,
  Login,
  login,
  createRegisteredSalesDaily,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");
const { orderExist } = require("../middlewares/orderExist.middleware");

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidators, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.get("/orders", getAllOrders);

usersRouter.get("/orders/:id", orderExist, getOrderWithId);

usersRouter.get("/salesInfoDaily", GetAllRegisteredSales);

usersRouter.post("/salesInfoDaily", createRegisteredSalesDaily);

module.exports = { usersRouter };
