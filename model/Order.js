const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: { type: String, require: true },
    user: {
      type: ObjectId,
      ref: "User",
    },
    products: [
      {
        product: [
          {
            _id: { type: String, require: true },
            title: { type: String, require: true },
            imgDisplay: { type: String, require: true },
            price: { type: Number, require: true },
            quantity: { type: Number, require: true },
            // productId: { type: String, require: true },
            weight: { type: Number, require: true },
            //seharusnya mengambil dari variant langsung jadi update
            variant: {
              color: { type: String, required: true },
              size: { type: String, required: true },
              stock: { type: Number, required: true },
              id: { type: String, require: true },
            },
          },
        ],
        pengiriman: {
          jasaKirim: { type: String, require: true },
          service: { type: String, require: true },
          weight: { type: Number, require: true },
        },
        idOrderMidtrans: { type: String },
        pajak: { type: Number, required: true },
        status: { type: String, default: "pending" },
        total: { type: Number, require: true },
        address: { type: String, require: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
