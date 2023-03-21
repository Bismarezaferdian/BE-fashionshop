const CategoriesProducts = require("../model/CategoriesProducts");

const categoriesProductsController = {
  addCategoriesProducts: async (req, res) => {
    try {
      const name = req.body;
      const categorie = await CategoriesProducts.find();
      if (categorie.length > 0) {
        const categoryName = [];
        for (let i = 0; i < categorie.length; i++) {
          categoryName.push(categorie[i].name);
        }
        if (categoryName.includes(name.name)) {
          res.status(200).json("sudah ada ");
        } else {
          const newCataegoriesProducts = new CategoriesProducts(req.body);
          const saveCategoriesProduct = await newCataegoriesProducts.save();
          res.status(200).json(saveCategoriesProduct);
        }
      } else {
        const newCataegoriesProducts = new CategoriesProducts(req.body);
        const saveCategoriesProduct = await newCataegoriesProducts.save();
        res.status(200).json(saveCategoriesProduct);
      }
      // res.status(200).json(saveCategoriesProduct);
    } catch (error) {
      console.log(error);
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
      console.log(categoriesProducts);
      if (!categoriesProducts) {
        res.status(404).json("Product not found");
      }

      await CategoriesProducts.findByIdAndDelete(req.params.id);
      console.log("success");
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
