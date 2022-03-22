const express = require("express");

const router = express.Router();

/* Routes Structure
Route
Middleware
Validator
Controller
*/

//Importing all Controllers
const adminController = require("../controllers/adminController");

//Importing all Middleware
const adminMiddleware = require("../middlewares/adminMiddleware");

//defining routes
router.post(
  "/addproduct",
  adminMiddleware.addProductMiddleware,
  adminController.addProductController
);

module.exports = router;
