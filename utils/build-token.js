const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./env-fallbacks");

exports.buildToken = (user) => {
  const payload = {
    sub: user.user_id,
    name: user.user_username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
