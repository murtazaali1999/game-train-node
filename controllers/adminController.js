const { addProductEntity } = require("../models/admin");

module.exports = {
  addProductController: async (req, res, next) => {
    addProductEntity(req, res, next);
  },
};
