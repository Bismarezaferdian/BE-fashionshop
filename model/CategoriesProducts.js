const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesProductSchema = new Schema(
  {
    name: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoriesProducts", CategoriesProductSchema);
