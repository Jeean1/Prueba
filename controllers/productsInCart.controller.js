const { Cart } = require("../models/cart.model");
const { Products } = require("../models/products.model");
const { ProductsInCart } = require("../models/productsInCart.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");
const { Orders } = require("../models/order.model");

const getAllProductsInCartActives = catchAsync(async (req, res, next) => {
  const productsInCart = await ProductsInCart.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { productsInCart },
  });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  //Consigo la información del productId, para poder realizar el subtotal, el iva, y total

  const product = await Products.findOne({ where: { id: productId } });

  // modifico el iva que trae el producto para dar el iva verdadero.
  let ivaValue = 0;
  if (product.iva === 5) {
    ivaValue = 0.05;
  } else if (product.iva === 19) {
    ivaValue = 0.19;
  }
  const subtotal = product.price * quantity;

  const iva = subtotal * ivaValue;

  const total = subtotal + iva;

  //Verifico sí el cliente tiene un carro activo.
  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
  });
  // De lo contrario le creo el carrito y añado.
  if (!cart) {
    const newCart = await Cart.create({
      userId: sessionUser.id,
    });

    const addingProductToCart = await ProductsInCart.create({
      cartId: newCart.id,
      productId,
      quantity,
      subtotal, //realizar cuenta en este controlador.
      iva,
      total,
    });

    res.status(200).json({
      status: "success",
      data: { addingProductToCart },
    });
  }
  //Sí tiene un carro activo, sólo añado
  const addingProductToCart = await ProductsInCart.create({
    cartId: cart.id,
    productId,
    quantity,
    subtotal,
    iva,
    total,
  });

  res.status(200).json({
    status: "success",
    data: { addingProductToCart },
  });
});

const purchaseAllProductsActivesInCart = catchAsync(async (req, res, next) => {
  //Busco un carrito activo para el cliente en sesión.
  const { cart, sessionUser } = req;
  //Creo las variables de subtotal, iva, total para añadirlos después a la creación de order
  let subtotal = 0;
  let iva = 0;
  // Sí tiene un carro activo, le cambio a los products de estado a purchase
  const changeStatusProductPurchased = cart.dataValues.productInCars.map(
    async (productInCart) => {
      const productInCartActive = await ProductsInCart.findOne({
        where: { id: productInCart.id, status: "active" },
      });

      //Sí encuentra producto activo, actualiza a purchased.
      if (productInCartActive) {
        subtotal += productInCartActive.subtotal;
        iva += productInCartActive.iva;
        await productInCartActive.update({ status: "purchased" });
      }
    }
  );

  await Promise.all(changeStatusProductPurchased);

  //total del carrito
  let total = subtotal + iva;

  //Cambio el estado del carrito a purchased

  await cart.update({ status: "purchased" });

  // Creo una orden para el usuario qué ha realizado la compra

  const newOrder = await Orders.create({
    userId: sessionUser.id,
    date: new Date(),
    cartId: cart.id,
    subtotal,
    iva,
    total,
  });

  res.status(200).json({
    data: { newOrder },
  });
});

module.exports = {
  getAllProductsInCartActives,
  purchaseAllProductsActivesInCart,
  addProductToCart,
};
