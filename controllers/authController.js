const {
  loginEntity,
  signupEntity,
  changePasswordEntity,
} = require("../models/user");

module.exports = {
  loginController: async (req, res, next) => {
    loginEntity(req, res, next);
  },
  signupController: async (req, res, next) => {
    signupEntity(req, res, next);
  },
  changePasswordController: async (req, res, next) => {
    changePasswordEntity(req, res, next);
  },
};
