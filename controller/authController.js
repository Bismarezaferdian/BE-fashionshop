const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// const { use } = require("../routes/authRouth");

const authController = {
  register: async (req, res) => {
    const {
      firstname,
      lastname,
      phonenumber,
      address,
      image,
      email,
      password,
      isAdmin,
    } = req.body;

    const user = await User.findOne({ email: req.body.email });
    //   !user && res.status(404).send("user not found !"); server langsung err harus di return
    if (user) return res.status(404).send("user already axist");
    try {
      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        address: address,
        image: image,
        email: email,
        isAdmin: isAdmin,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.PASS_SEC
        ).toString(),
      });

      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      //   !user && res.status(404).send("user not found !"); server langsung err harus di return
      if (!user) return res.status(404).send("notfound user");

      const inputPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );

      const OriginalPassword = inputPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password)
        return res.status(500).json("wrong password !");

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      // console.log(user);

      const { password, ...others } = user._doc;
      res
        .cookie("token", accessToken, {
          expires: new Date(Date.now() + 60000),
          httpOnly: true,
          sameSite: "Strict",
          path: "/",
        })
        .status(200)
        .json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
