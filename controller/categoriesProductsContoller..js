const CategoriesProducts = require("../model/CategoriesProducts");

const categoriesProductsController = {
  addCategoriesProducts: async (req, res) => {
    try {
      const newCataegoriesProducts = new CategoriesProducts(req.body);
      const saveCategoriesProduct = await newCataegoriesProducts.save();
      res.status(200).json(`${saveCategoriesProduct} has been added`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCategoriesProducts: async (req, res) => {
    try {
      const updateCategoriesProducts =
        await CategoriesProducts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
      res.status(200).json(`${updateCategoriesProducts} has been updated`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCategoriesProducts: async (req, res) => {
    try {
      const categoriesProducts = await CategoriesProducts.findById(
        req.params.id
      );
      if (!categoriesProducts) {
        res.status(404).json("Product not found");
      }

      await CategoriesProducts.findByIdAndDelete(req.params.id);
      res.status(200).json("product has been delete !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCategoriesProduct: async (req, res) => {
    try {
      const allProduct = await CategoriesProducts.find();
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoriesProductsController;
