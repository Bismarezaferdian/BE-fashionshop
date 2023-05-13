const Cart = require("../model/Cart");
const Product = require("../model/Product");

const cartController = {
  getAllcart: async (req, res, next) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      // const carts = await Cart.find();

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //ADD CART DAN UPDATE/ADD PRODUCT DI DALAM CART
  updateProductChart: async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.id });
    try {
      //cari cart berdasarkan id user
      //jika userId tidak ada create new userId and cart

      if (!cart) {
        const newCart = new Cart({
          userId: req.params.id,
          products: [req.body.products],
          total: req.body.products.price * req.body.products.quantity,
          weight: req.body.products.weight,
        });
        const saveCart = await newCart.save();
        return res.status(200).json(saveCart);
      }

      //cari apakah product yang mau di tambahkan ada di product cart
      const existingProductIndex = cart.products.find(
        (product) =>
          product._id === req.body.products._id &&
          product.variant.color === req.body.products.variant.color &&
          product.variant.size === req.body.products.variant.size
      );

      //jika tidak ada
      if (!existingProductIndex) {
        // Push product kiriman dari user
        //jika data product di ambil dari db product

        cart.products.push(req.body.products);
        // console.log(req.body.products.weight);
        cart.total += req.body.products.price * req.body.products.quantity;
        cart.weight += req.body.products.weight;
        // cart.products.push({
        //   _id: req.body.product._id,
        //   title: req.body.product.title,
        //   imgDisplay: req.body.product.imgDisplay,
        //   size: req.body.product.size,
        //   color: req.body.product.color,
        //   price: req.body.product.price,
        //   quantity: req.body.product.quantity,
        // });
      } else {
        // Increment the quantity of an existing product
        // existingProductIndex.quantity += req.body.products.quantity;
        existingProductIndex.quantity += 1;
        cart.total += existingProductIndex.price;
        cart.weight += req.body.products.weight;
      }
      // console.log(existingProductIndex.quantity, cart.total);
      const newProductCart = await cart.save();
      return res.status(200).json(newProductCart);
    } catch (error) {
      console.log(error);
      cart.total = 0;
      return res.status(500).json(error);
    }
  },

  //hanya delete product di dalam cart
  deleteProductCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      //cari product di database berdasarkan id product daru user

      if (cart) {
        const productInCart = cart.products.find(
          (product) =>
            product._id === req.body.products._id &&
            product.color === req.body.products.color &&
            product.size === req.body.products.size
        );

        //jika product ada dan quantity nya lebih dari satu
        if (productInCart && productInCart.quantity > 1) {
          //qty di kurangi 1 (untuk button minus )
          productInCart.quantity -= 1;
          cart.total -= productInCart.price;
          cart.weight -= productInCart.weight;

          //jika prooduct kurangdari samadengan 1
        } else if (productInCart && productInCart.quantity == 1) {
          //delete berdasarkan product id
          cart.products.splice(
            cart.products.findIndex(
              (product) =>
                product._id === req.body.products._id &&
                product.color === req.body.products.color &&
                product.size === req.body.products.size
            ),
            1
          );
          cart.total -= productInCart.price;
          cart.weight -= productInCart.weight;
        }
      }

      //save cart
      // await cart.save();
      const savecart = await cart.save();
      return res.status(200).json(savecart);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //USER DAN ADMIN TIDAK DAPAT UPDATE CART

  // updateCart: async (req, res) => {
  //   try {
  //     const updateCart = await Cart.findByIdAndUpdate(
  //       req.params.idCart,
  //       {
  //         $set: req.body,
  //       },
  //       { new: true }
  //     );
  //     res.status(200).json(updateCart);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },

  //User dan admin tidak bisa delete cart

  deleteCart: async (req, res) => {
    try {
      const id = req.params.id;
      const cart = await Cart.findById(id);
      if (!cart) {
        res.status(404).json("cart not found");
      } else {
        await Cart.findByIdAndDelete(id);
        console.log("cart has been delete");
        res.status(200).json("cart has been delete");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //USER DAN ADMIN TIDAK BISA MENAMBAHKAN CART
  // addCart: async (req, res) => {
  //   try {
  //     const newCart = new Cart(req.body);

  //     const saveCart = await newCart.save();
  //     res.status(200).json(saveCart);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
};

module.exports = cartController;
