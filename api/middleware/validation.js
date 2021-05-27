const {
  recipe: recipeSchema,
  registration: registrationSchema,
  login: loginSchema,
} = require("../../utils/validation-schemas");

exports.validateRecipe = async (req, _res, next) => {
  if (!req.body) {
    return next({ status: 400, message: "cannot add empty recipe" });
  }
  try {
    const validRecipe = await recipeSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = validRecipe;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

exports.validateRegistration = async (req, _res, next) => {
  if (!req.body) {
    return next({
      status: 400,
      message: "user_username, user_password required, and user_email",
    });
  }
  try {
    const validRegistration = await registrationSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = validRegistration;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

exports.validateUser = async (req, _res, next) => {
  if (!req.body) {
    return next({
      status: 400,
      message: "user_username, user_password required",
    });
  }
  try {
    const validLogin = await loginSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = validLogin;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
