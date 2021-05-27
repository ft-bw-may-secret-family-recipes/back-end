const router = require("express").Router();
const Users = require("../users/users-model");
const {
  checkUsernameAvailable: checkAvailable,
  checkUsernameExists: checkExists,
  // validateRegistration, validateUser
} = require("../middleware/index");

const bcrypt = require("bcrypt");
const { BCRYPT_ROUNDS } = require("../../utils/env-fallbacks");
const { buildToken } = require("../middleware/build-token");

router.post(
  "/register",
  // validateRegistration,
  checkAvailable,
  (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.user_password, BCRYPT_ROUNDS);

    user.user_password = hash;

    Users.add(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

router.post(
  "/login",
  // validateUser,
  checkExists,
  (req, res, next) => {
    let { user_password } = req.body;

    const { user_password: hash } = req.foundUser;

    if (bcrypt.compareSync(user_password, hash)) {
      const token = buildToken(req.foundUser);
      res.status(200).json(token);
    } else {
      next({ status: 401, message: "invalid credentials" });
    }

    Users();
  }
);

module.exports = router;
