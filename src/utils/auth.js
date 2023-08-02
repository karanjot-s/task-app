const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.createJWT = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration,
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1].replace('"', "");

  if (token == null)
    return res.status(401).json({
      error: "Token is required",
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        error: "Token invalid",
        err: err,
        token: token,
      });

    req.user = user;
    next();
  });
};

exports.verifyAccessToken = async (token, res) => {
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(406).json({ error: "Invalid token" });

    User.findById(user.userId)
      .then((doc) => {
        return res.status(200).json({ success: true, user: doc });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Something went wrong" });
      });
  });
};
