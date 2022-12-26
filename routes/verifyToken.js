const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
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
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you not allow to do that !");
    }
  });
};

module.exports = { verifyToken, verifyAuthorization };
