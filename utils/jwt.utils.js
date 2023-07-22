require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const generateAccessToken = (email) => {
  return jwt.sign(email, jwtSecret, { expiresIn: "1800s" });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { authenticateToken, generateAccessToken, verifyToken };
