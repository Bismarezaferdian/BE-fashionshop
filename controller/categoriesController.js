const Categories = require("../model/Categories");

const categoriesController = {
  addCategories: async (req, res) => {
    try {
      const newCategories = new Categories(req.body);
      const saveCategories = await newCategories.save();
      res.status(200).json(saveCategories);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCategories: async (req, res) => {
    try {
      const updateCategories = await Categories.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateCategories);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllCategorie: async (req, res) => {
    try {
      const categorie = await Categories.find();
      res.status(200).json(categorie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  searchCategories: async (req, res) => {
    try {
      const categorie = await Categories.findById(req.params.id);
      res.status(200).json(categorie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCategorie: async (req, res) => {
    try {
      const categorie = await Categories.findById(req.params.id);
      if (!categorie) {
        res.status(404).json("categorie not found");
      }
      await Categories.findByIdAndDelete(req.params.id);
      res.status(200).json("success Delete");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoriesController;
