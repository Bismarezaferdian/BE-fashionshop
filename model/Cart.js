const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartScheema = new Schema({
  userId: { type: String, require: true },
  products: [
    { productId: { type: String }, quantity: { type: Number, default: 1 } },
  ],
});

module.exports = mongoose.model("Cart", cartScheema);
