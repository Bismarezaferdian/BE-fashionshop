const { default: axios } = require("axios");

// axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
// axios.defaults.headers.common["key"] = "ab76b98996e28a10c509b66f6ced839a";
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

const cekOngkirController = {
  getProvince: async (req, res) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      key: process.env.RAJAONGKIR_KEY,
    };
    const url = process.env.RAJAONGKIR_URL;
    try {
      const response = await axios.get(`${url}/province`, {
        headers,
      });
      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  },

  //get city by provinsi
  getCity: async (req, res) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      key: process.env.RAJAONGKIR_KEY,
    };
    const url = process.env.RAJAONGKIR_URL;
    const provId = req.params.provId;
    try {
      const response = await axios.get(`${url}/city?province=${provId}`, {
        headers,
      });
      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  },

  // getCost
  getCost: async (req, res) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      key: process.env.RAJAONGKIR_KEY,
    };
    const url = process.env.RAJAONGKIR_URL;
    try {
      const response = await axios.post(
        `${url}/cost`,
        {
          origin: req.body.origin,
          destination: req.body.destination,
          weight: req.body.weight,
          courier: req.body.courier,
        },
        { headers }
      );
      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cekOngkirController;
