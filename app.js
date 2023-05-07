const express = require("express");
const app = express();
const mongoose = require("mongoose");
var path = require("path");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRouth");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRouter");
const categorieRoute = require("./routes/categorieRoute");
const categoriesProductsRoute = require("./routes/categoriesProductsRoute");
const ongkirRoute = require("./routes/ongkirRouter");
const orderRoute = require("./routes/orderRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
dotenv.config();
const port = 3000;

// app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
//model development
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3001",
      "http://localhost:3002",
      " https://api.rajaongkir.com/starter",
      "https://fe-sneakers-three.vercel.app/",
    ],
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

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH,OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// parse application/json requests
app.use(bodyParser.json());
//mode deploy
// app.use(cors());
// parse application/x-www-form-urlencoded requests
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categorieRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/catproducts", categoriesProductsRoute);
app.use("/api/v1/cekOngkir", ongkirRoute);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect monggo db "))
  .catch((err) => console.log(err));

app.listen(process.env.PORT_URL || port, () => {
  console.log(`Example app listening on port ${port}`);
});
