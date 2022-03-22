const joi = require("joi");

const addProductMiddleware = async (req, res, next) => {
  if (!req.body.ID || !req.body.Name || !req.body.Quantity || !req.body.Price) {
    return res.status(400).json({ message: "one or more fields are missing" });
  }

  const result = addProductValidatorSchema.validateAsync(req.body);
  next();
};

const addProductValidatorSchema = joi.object({
  ID: joi.number().required(),
  Name: joi.string().required(),
  Quantity: joi.number().min(20).max(500).required(),
  Price: joi.number().min(10).max(500).required(),
});

module.exports = {
  addProductMiddleware,
  addProductValidatorSchema,
};
