const Order = require("../model/Order");
const Product = require("../model/Product");

const orderController = {
  addOrder: async (req, res) => {
    const userId = await Order.findOne({ userId: req.body.userId });
    try {
      if (!userId) {
        for (let i = 0; i < req.body.products.product.length; i++) {
          await Product.updateOne(
            {
              _id: req.body.products.product[i]._id,
              "variant._id": req.body.products.product[i].variant.id,
            },
            {
              $inc: {
                "variant.$.stock": -req.body.products.product[i].quantity,
              },
            },
            { new: true }
          );
        }
        const newOrder = new Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
      } else {
        userId.products.push(req.body.products);
        for (let i = 0; i < req.body.products.product.length; i++) {
          await Product.updateOne(
            {
              _id: req.body.products.product[i]._id,
              "variant._id": req.body.products.product[i].variant.id,
            },
            {
              $inc: {
                "variant.$.stock": -req.body.products.product[i].quantity,
              },
            },
            { new: true }
          );
          // const newOrder = new Order(userId);
          const saveOrder = await userId.save();

          console.log(req.body.products);
          res.status(200).json(req.body.product);
        }
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updateProduct = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteOrder: async (req, res) => {
    const id = req.params.id;
    try {
      const order = await Order.findById(id);
      if (!order) {
        res.status(404).json("your order not found !");
      } else {
        await Order.findByIdAndDelete(id);
        res.status(200).json("Order has been delete !");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await Order.findOne({ userId: req.params.idUser });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const allOrder = await Order.find().populate({
        path: "user",
        select: "_id firstname",
      });
      res.status(200).json(allOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getIncome: async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        // {
        //   $group: {
        //     _id: "$month",
        //     total: { $sum: "$sales" },
        //   },
        // },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderController;
