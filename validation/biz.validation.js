const Joi = require("joi");
const validate = require("./validate");

const newBizSchema = Joi.object({
  bizName: Joi.string().min(2).max(255).required().trim(),
  bizDescription: Joi.string().min(2).trim(),
  bizAddress: Joi.string().min(5).max(255).required().trim(),
  bizPhone: Joi.string()
    .min(2)
    .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/)
    .required(),
  bizImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
});
const updateBizSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim().allow(""),
  bizName: Joi.string().max(255).trim().allow(""),
  bizDescription: Joi.string().trim().allow(""),
  bizAddress: Joi.string().max(255).trim().allow(""),
  bizPhone: Joi.string()
    .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/)
    .allow(""),
  bizImg: Joi.string()
    .regex(/^http(s?)\:\/\/(\.?)/)
    .allow(""),
});
const deleteBizSchema = Joi.object({
  id: Joi.string().length(24).hex().trim(),
});
const findCardByIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const validateNewBizSchema = (userInput) => {
  return validate(newBizSchema, userInput);
};
const validateUpdateBizSchema = (userInput) => {
  return validate(updateBizSchema, userInput);
};
const validateDeleteBizSchema = (userInput) => {
  return validate(deleteBizSchema, userInput);
};
const validateFindByIdBizSchema = (userInput) => {
  return validate(findCardByIdSchema, userInput);
};

module.exports = {
  validateNewBizSchema,
  validateUpdateBizSchema,
  validateDeleteBizSchema,
  validateFindByIdBizSchema,
};
