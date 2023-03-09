const Joi = require("joi");
const validate = require("./validate");
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().trim(),
  email: Joi.string().min(8).max(255).email().required().trim(),
  password: Joi.string()
    // .regex(
    //   new RegExp(
    //     "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
    //   )
    // )
    .required(),
  avatar: Joi.string(),
  isAdmin: Joi.boolean(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(8).max(255).email().required().trim(),
  password: Joi.string()
    // .regex(
    //   new RegExp(
    //     "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
    //   )
    // )
    .required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().min(8).max(255).email().required().trim(),
});

const updateUserSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
  name: Joi.string().min(2).max(255).trim(),
  email: Joi.string().min(8).max(255).email().trim(),
  password: Joi.string(),
  // .regex(
  //   new RegExp(
  //     "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
  //   )
  // )
  avatar: Joi.string(),
  isAdmin: Joi.boolean(),
});

const deleteUserSchema = Joi.object({
  id: Joi.string().length(24).hex().trim(),
});

const validateRegisterSchema = (userInput) => {
  return validate(registerSchema, userInput);
};
const validateLoginSchema = (userInput) => {
  return validate(loginSchema, userInput);
};

const validateForgotPasswordSchema = (userInput) => {
  return validate(forgotPasswordSchema, userInput);
};

const validateUpdateUserSchema = (userInput) => {
  return validate(updateUserSchema, userInput);
};

const validateDeleteUserSchema = (userInput) => {
  return validate(deleteUserSchema, userInput);
};

module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
  validateForgotPasswordSchema,
  validateUpdateUserSchema,
  validateDeleteUserSchema,
};
