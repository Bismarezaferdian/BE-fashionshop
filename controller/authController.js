const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// const { use } = require("../routes/authRouth");

const authController = {
  register: async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    try {
      const newUser = new User({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.PASS_SEC
        ).toString(),
        isAdmin: isAdmin,
      });

      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      //   !user && res.status(404).send("user not found !"); server langsung err harus di return
      if (!user) return res.status(404).send("notfound");

      const inputPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );

      const OriginalPassword = inputPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password)
        return res.status(500).status("wrong password !");

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
      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};

module.exports = authController;
