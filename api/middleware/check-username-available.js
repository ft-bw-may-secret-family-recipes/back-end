const { getBy } = require("../users/users-model");

const checkUsernameAvailable = (req, res, next) => {
  getBy({ user_username: req.body.user_username })
    .then(([user]) => {
      user ? res.status(400).json({ message: "username unavailable" }) : next();
    })
    .catch(next);
};

module.exports = checkUsernameAvailable;
