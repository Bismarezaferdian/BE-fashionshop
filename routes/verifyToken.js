const jwt = require("jsonwebtoken");

const cekCookie = (req, res) => {
  console.log(req.cookies);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.Cookies.token;
  // const token = req.cookies.access_token;
  console.log(req.cookies.token);

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json("token not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authentification !");
  }
};

const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you not allow to do that !");
    }
  });
};

module.exports = { cekCookie, verifyToken, verifyAuthorization };
