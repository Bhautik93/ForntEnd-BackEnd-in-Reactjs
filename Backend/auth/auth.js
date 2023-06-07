const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUserToken = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send({ status: false, message: "Invalid token", err });
  }
};

module.exports = verifyUserToken;
