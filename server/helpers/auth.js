const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  //  const token;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (err) {
      res.status(401).send("Invalid token");
    }
  }

  if (!token) {
    res.status(401).send("Token not found ");
  }
};
