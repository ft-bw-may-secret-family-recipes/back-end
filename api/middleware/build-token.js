const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/env-fallbacks");

exports.buildToken = (user) => {
  const payload = {
    sub: user.user_id,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
