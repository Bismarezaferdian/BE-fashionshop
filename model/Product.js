const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    desc: { type: String, require: true },
    imgDisplay: {
      publicId: { type: String },
      imgId: { type: String, required: true },
      imgUrl: { type: String, required: true },
    },
    imgDetail: [
      {
        publicId: { type: String },
        imgId: { type: String, required: true },
        imgUrl: { type: String, required: true },
      },
    ],
    //harusnya categoriesId
    categories: [
      {
        type: ObjectId,
        ref: "CategoriesProducts",
      },
    ],
    variant: [
      {
        stock: { type: Number, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
    weight: { type: Number, require: true },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
