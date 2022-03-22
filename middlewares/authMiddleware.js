const joi = require("joi");

const loginMiddleware = async (req, res, next) => {
  const result = await loginValidatorSchema.validateAsync(req.body);
  next();
};

const loginValidatorSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signupMiddleware = async (req, res, next) => {
  const result = await signupValidatorScheme.validateAsync(req.body);
  next();
};

const signupValidatorScheme = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  age: joi.number().required(),
});

const changePasswordMiddleware = async (req, res, next) => {
  const result = await changePasswordValidatorSchema.validateAsync(req.body);
  next();
};

const changePasswordValidatorSchema = joi.object({
  email: joi.string().email().required(),
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

module.exports = {
  loginMiddleware,
  signupMiddleware,
  changePasswordMiddleware,
};
