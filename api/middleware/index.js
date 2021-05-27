const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/env-fallbacks");

exports.checkUsernameAvailable = require("./check-username-available");

exports.checkUserIdExists = require("./check-user-id-exists");

exports.checkUsernameExists = require("./check-username-exists");

exports.checkAdmin = require("./check-admin");

exports.restrict = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: "token invalid" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  } else {
    next({ status: 401, message: "token required" });
  }
};
