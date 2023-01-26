const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    desc: { type: String, require: true },
    imgDisplay: { type: String, require: true },
    imgDetail: [String],
    categories: { type: Array },
    size: [String],
    color: { type: Array },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
