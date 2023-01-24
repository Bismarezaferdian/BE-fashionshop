const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesSchema = new Schema(
  {
    brand: { type: String, require: true },
    img: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
