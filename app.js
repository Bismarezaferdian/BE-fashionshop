const express = require("express");
const app = express();
// const request = require("request");
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
const midtransRoute = require("./routes/midtransRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

// const port = 8000;

const connect = () => {
  try {
    mongoose.connect(process.env.URI);
    // console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use(express.static(path.join(__dirname, "public")));
//model development
// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "http://localhost:3001",
//       // "http://localhost:3002",
//       "http://192.168.76.80:3001",
//       " https://api.rajaongkir.com/starter",
//       "https://fe-sneakers-three.vercel.app/",
//       "https://app.sandbox.midtrans.com/snap/v1/transactions",
//       "https://be-fashionshop-production.up.railway.app/",
//     ],
//   })
// );
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// parse application/json requests
//mode deploy
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded requests
// app.use(bodyParser.json());
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
app.use("/api/v1/midtrans/transaction", midtransRoute);
// app.use("/", (req, res) => {
//   res.send("welcome to server");
// });

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("connect monggo db "))
//   .catch((err) => console.log(err));

app.listen(process.env.PORT || 8000, function () {
  connect();
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
