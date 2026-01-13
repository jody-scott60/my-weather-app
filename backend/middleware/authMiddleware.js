require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwt_secret = process.env.jwt_secret;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400);

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(400);
  }
};

module.exports = { authMiddleware };
