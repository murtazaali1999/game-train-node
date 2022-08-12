const joi = require("joi");

const getProductMiddleware = async (req, res, next) => {
  return next();
};

const getProductByIdMiddleware = async (req, res, next) => {
  const result = getProductByIdValidatorSchema
    .validateAsync(req.body)
    .catch((err) => {
      return res.status(400).json({ message: "error in id" });
    });
};

const getProductByIdValidatorSchema = joi.object({
  ID: joi.string().required(),
});

const getProductByNameMiddleware = async (req, res, next) => {
  const result = getProductByNameValidatorSchema
    .validateAsync(req.body)
    .catch((err) => {
      return res.status(400).json({ message: "error in name" });
    });
};

const getProductByNameValidatorSchema = joi.object({
  Name: joi.string().required(),
});

const getProductByPriceRangeMiddleware = async (req, res, next) => {
  const result = getProductByPriceRangeValidatorSchema
    .validateAsync(req.body)
    .catch((err) => {
      return res.status(400).json({ message: "error in max or min price" });
    });
};

const getProductByPriceRangeValidatorSchema = joi.object({
  min_price: joi.number().min(100).required(),
  max_price: joi.number().max(10000).required(),
});

module.exports = {
  getProductMiddleware,
  getProductByIdMiddleware,
  getProductByNameMiddleware,
  getProductByPriceRangeMiddleware,
};
