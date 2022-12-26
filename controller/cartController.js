const Cart = require("../model/Cart");

const cartController = {
  addCart: async (req, res) => {
    try {
      const newCart = new Cart(req.body);

      const saveCart = await newCart.save();
      res.status(200).json(saveCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCart: async (req, res) => {
    try {
      const updateCart = await Cart.findByIdAndUpdate(
        req.params.idCart,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllcart: async (req, res, next) => {
    try {
      const carts = await Cart.find();

      res.status(200).json(carts);
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
  deleteCart: async (req, res) => {
    try {
      const id = req.params.id;
      const cart = await Cart.findById(id);
      if (!cart) {
        res.status(404).json("cart not found");
      } else {
        await Cart.findByIdAndDelete(id);
        res.status(200).json("cart has been delete");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = cartController;
