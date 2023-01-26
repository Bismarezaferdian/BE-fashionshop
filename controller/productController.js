const Product = require("../model/Product");

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);

      const saveProduct = await newProduct.save();
      res.status(200).json(saveProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updatedProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.idProduct,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res, next) => {
    const qNew = req.query.new;

    const qCategories = req.query.categories;
    try {
      let products;
      if (qNew) {
        products = await Product.find()
          .sort({ createAt: -1 })
          .limit(req.query.limit);
      } else if (qCategories) {
        products = await Product.find({ categories: { $in: qCategories } })
          .sort({ createAt: -1 })
          .limit(req.query.limit);
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        res.status(404).json("product not found");
      } else {
        await Product.findByIdAndDelete(id);
        res.status(200).json("product has been delete");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
