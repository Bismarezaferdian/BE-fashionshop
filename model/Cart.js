const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartScheema = new Schema({
  userId: { type: String, require: true },

  products: [
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
  qty: { type: Number },
  weight: { type: Number },
  total: { type: Number },
});

module.exports = mongoose.model("Cart", cartScheema);

// const Cart = require("path/to/cartModel");

// router.put("/add-to-cart", async (req, res) => {
//   try {
//     // Find the cart associated with the user
//     const cart = await Cart.findOne({ userId: req.body.userId });

//     // If the cart does not exist, create a new one
//     if (!cart) {
//       const newCart = new Cart({
//         userId: req.body.userId,
//         products: [
//           {
//             _id: req.body.product._id,
//             title: req.body.product.title,
//             imgDisplay: req.body.product.imgDisplay,
//             size: req.body.product.size,
//             color: req.body.product.color,
//             price: req.body.product.price,
//             quantity: req.body.product.quantity,
//           },
//         ],
//       });
//       await newCart.save();
//       return res.status(200).send({ message: "Product added to cart" });
//     }

//     // If the cart exists, update the products array
//     const existingProductIndex = cart.products.findIndex(
//       (product) => product._id === req.body.product._id
//     );
//     if (existingProductIndex === -1) {
//       // Push a new product object
//       cart.products.push({
//         _id: req.body.product._id,
//         title: req.body.product.title,
//         imgDisplay: req.body.product.imgDisplay,
//         size: req.body.product.size,
//         color: req.body.product.color,
//         price: req.body.product.price,
//         quantity: req.body.product.quantity,
//       });
//     } else {
//       // Increment the quantity of an existing product
//       cart.products[existingProductIndex].quantity += req.body.product.quantity;
//     }

//     // Save the updated cart
//     await cart.save();

//     // Return a success response
//     return res.status(200).send({ message: "Product added to cart" });
//   } catch (error) {
//     // Return an error response
//     return res.status(500).send({ message: "Error adding product to cart" });
//   }
// });
