const { default: axios } = require("axios");

axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = "ab76b98996e28a10c509b66f6ced839a";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
const cekOngkirController = {
  getProvince: async (req, res) => {
    try {
      const response = await axios.get(`/province`);
      //   " https://api.rajaongkir.com/starter/city",
      //   {
      //     headers: {
      //       key: "ab76b98996e28a10c509b66f6ced839a",
      //     },
      //     params: {
      //       // Cari berdasarkan nama kota
      //       // province: "5",
      //       // id: "39",
      //       province: "5",
      //       // id: "39",
      //     },
      //   }
      // );

      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  },

  //get city by provinsi
  getCity: async (req, res) => {
    const provId = req.params.provId;
    // const cityId = req.params.cityId;
    try {
      const response = await axios.get(`/city?province=${provId}`);
      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  },

  // getCost
  getCost: async (req, res) => {
    // const params = req.params;
    try {
      const response = await axios.post("/cost", {
        origin: req.body.origin,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: req.body.courier,
      });
      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log("error");
    }
  },
};

module.exports = cekOngkirController;
