// Models
const { Cart } = require("./cart.model");
const { Orders } = require("./order.model");
const { Products } = require("./products.model");
const { ProductsInCart } = require("./productsInCart.model");
const { RegisterSales } = require("./registerSale.model");
const { User } = require("./user.model");

const initModels = () => {
  // User Relations

  // 1 User <---> M Orders
  User.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(User);

  // 1 User <---> M RegisterSale
  User.hasMany(RegisterSales, { foreignKey: "userId" });
  RegisterSales.belongsTo(User);

  // 1 User(admin) <---> M products
  User.hasMany(Products, { foreignKey: "userId" });
  Products.belongsTo(User);

  // 1 User(Client) <---> 1 Cart
  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);

  // Products Relations

  // 1 Product 1 <---> 1 ProductsInCart
  Products.hasOne(ProductsInCart, { foreignKey: "productId" });
  ProductsInCart.belongsTo(Products);

  // Cart Relations

  // 1 Cart <---> 1 Order
  Cart.hasOne(Orders, { foreignKey: "cartId" });
  Orders.belongsTo(Cart);

  // 1 Cart ---> M ProductsInCart
  Cart.hasMany(ProductsInCart, { foreignKey: "cartId" });
  ProductsInCart.belongsTo(Cart);
};

module.exports = { initModels };
