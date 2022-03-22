const express = require("express");

const router = express.Router();

//importing all controllers
const productController = require("../controllers/productController");

//importing all middleware
const productMiddleware = require("../middlewares/productMiddleware");

/* Routes Structure
Route
Middleware
Validator
Controller
*/

//defining routes
router.get("/getproduct", productController.getProductController); //gets all product

router.get(
  "/getproductbyid",
  productMiddleware.getProductByIdMiddleware,
  productController.getProductByIdController
); //get single product by id

router.get(
  "/getproductbyname",
  productMiddleware.getProductByNameMiddleware,
  productController.getProductByNameController
); //get single product by name

router.get(
  "/getproductbypricerange",
  productMiddleware.getProductByPriceRangeMiddleware,
  productController.getProductByPriceRangeController
); //gets product by price range ? < ? > ?

module.exports = router;
