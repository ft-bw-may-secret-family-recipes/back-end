const yup = require("yup");

exports.recipe = yup.object({
  recipe_name: yup
    .string()
    .trim()
    .required("recipe name required")
    .min(2, "recipe name must be at least 2 characters long")
    .max(100, "recipe name must be at most 100 characters long"),

  recipe_source: yup
    .string()
    .trim()
    .required("recipe source required")
    .min(2, "recipe source must be at least 2 characters long")
    .max(100, "recipe source must be at most 100 characters long"),

  category: yup
    .string()
    .trim()
    .required("category required")
    .min(2, "category must be at least 2 characters long")
    .max(100, "category must be at most 50 characters long"),

  recipe_steps: yup.array().of(
    yup.object({
      step_description: yup
        .string()
        .trim()
        .required("step description required")
        .min(2, "step description must be at least 2 characters long")
        .max(100, "step description must be at most 500 characters long"),

      step_number: yup
        .number()
        .required("step number required")
        .positive("step number must be positive"),

      step_ingredients: yup.array().of(
        yup.object({
          //? What happens if empty
          quantity: yup
            .number()
            .required("quantity required")
            .positive("quantity must be positive"),

          ingredient: yup.object({
            ingredient_name: yup
              .string()
              .trim()
              .required("ingredient name required")
              .min(2, "ingredient name must be at least 2 characters long")
              .max(100, "ingredient name must be at most 100 characters long"),
            ingredient_unit: yup
              .string()
              .trim()
              .required("ingredient unit required")
              .min(2, "ingredient unit must be at least 2 characters long")
              .max(100, "ingredient unit must be at most 50 characters long"),
          }),
        })
      ),
    })
  ),
});

exports.registration = yup.object({
  user_username: yup
    .string()
    .trim()
    .required("username required")
    .min(2, "username must be at least 2 characters long")
    .max(140, "username must be at most 140 characters long"),

  user_password: yup
    .string()
    .required("password required")
    .min(8, "password must be at least 8 characters long")
    .max(140, "password must be at most 140 characters long"),

  user_email: yup
    .string()
    .required("email required")
    .email("email must be a valid email")
    .max(280, "email must be at most 280 characters long"),
});

exports.login = yup.object({
  user_username: yup
    .string()
    .trim()
    .required("username required")
    .min(2, "invalid credentials")
    .max(140, "invalid credentials"),

  user_password: yup
    .string()
    .required("password required")
    .min(8, "invalid credentials")
    .max(140, "invalid credentials"),
});
