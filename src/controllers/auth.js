const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { createJWT, verifyAccessToken } = require("../utils/auth");

exports.signup = (req, res, next) => {
  let { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(422).json({ error: "Password is required" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(422).json({
          error: "Email already exists",
        });
      }

      user = new User({
        email: email,
        password: password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user
            .save()
            .then((response) => {
              res.status(200).json({
                success: true,
                result: response,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(422).json({ error: "Password is required" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              error: "Incorrect Password",
            });
          }

          let access_token = createJWT(user.email, user._id, 3600);
          jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err)
              return res.status(500).json({
                error: err,
              });

            if (decoded)
              return res.status(200).json({
                success: true,
                token: access_token,
                user: user,
              });
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.checkToken = async (req, res) => {
  const { token } = req.params;
  verifyAccessToken(token, res);
};
