const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, require: true },
    address: { type: String, require: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
