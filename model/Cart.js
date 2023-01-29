const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartScheema = new Schema({
  // userId: { type: String, require: true },
  // products: [
  //   { productId: { type: String }, quantity: { type: Number, default: 1 } },
  // ],
  userId: { type: String, require: true },
  products: [
    { _id: String, require: true },
    { title: String, require: true },
    { imgDisplay: String, require: true },
    { size: String, require: true },
    { color: String, require: true },
    { price: Number, require: true },
    { quantity: Number, require: true },
  ],
});

module.exports = mongoose.model("Cart", cartScheema);
