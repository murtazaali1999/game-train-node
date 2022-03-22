const {
  getProductEntity,
  getProductByIdEntity,
  getProductByNameEntity,
  getProductByPriceRangeEntity,
} = require("../models/product");

module.exports = {
  getProductController: async (req, res, next) => {
    getProductEntity(req, res, next);
  },
  getProductByIdController: async (req, res, next) => {
    getProductByIdEntity(req, res, next);
  },
  getProductByNameController: async (req, res, next) => {
    getProductByNameEntity(req, res, next);
  },
  getProductByPriceRangeController: async (req, res, next) => {
    getProductByPriceRangeEntity(req, res, next);
  },
};
