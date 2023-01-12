const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRouth");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRouter");
const orderRoute = require("./routes/orderRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const port = 3000;

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect monggo db "))
  .catch((err) => console.log(err));

app.listen(process.env.PORT_URL || port, () => {
  console.log(`Example app listening on port ${port}`);
});
