const { getBy } = require("../users/users-model");

const checkUsernameExists = (req, res, next) => {
  getBy({ user_username: req.body.user_username })
    .then(([user]) => {
      if (user) {
        req.foundUser = user;
        next();
      } else {
        next({ status: 404, message: "username not found" });
      }
    })
    .catch(next);
};

module.exports = checkUsernameExists;
