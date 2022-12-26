const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    desc: { type: String, require: true },
    img: { type: String, require: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
