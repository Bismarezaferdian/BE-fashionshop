const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRouth");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRouter");
const orderRoute = require("./routes/orderRouter");
const cors = require("cors");
dotenv.config();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect monggo db "))
  .catch((err) => console.log(err));

app.listen(process.env.PORT_URL || port, () => {
  console.log(`Example app listening on port ${port}`);
});
