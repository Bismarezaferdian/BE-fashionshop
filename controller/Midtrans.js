const { default: axios } = require("axios");
const Order = require("../model/Order");

const MidtransController = {
  transaction: async (req, res) => {
    try {
      const url = process.env.MIDTRANS_SANDBOX_URL;
      const data = req.body;
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(process.env.SERVER_KEY_MIDTRANS).toString("base64"),
      };

      const response = await axios.post(url, data, { headers });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  cekStatus: async (req, res) => {
    try {
      const idMidtrans = req.params.idMidtrans;
      // const orderId = req.params.orderId;
      const url = process.env.GETSTATUS_MIDTRANS_URL.replace(
        "${ORDER_ID}",
        idMidtrans
      );

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(process.env.SERVER_KEY_MIDTRANS).toString("base64"),
      };
      const response = await axios.get(url, {
        headers,
      });

      await Order.updateOne(
        { "products.idOrderMidtrans": idMidtrans },
        { $set: { "products.$.status": response.data.transaction_status } },
        {
          new: true,
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = MidtransController;
