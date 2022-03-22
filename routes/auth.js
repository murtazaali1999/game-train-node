const express = require("express");
const router = express.Router();

/* Routes Structure
Route
Middleware
Validator
Controller
*/

//importing all controllers
const authController = require("../controllers/authController");

//importing all middleware
const authMiddleware = require("../middlewares/authMiddleware");

//defining routes
router.post(
  "/signup",
  authMiddleware.signupMiddleware,
  authController.signupController
);

router.post(
  "/login",
  authMiddleware.loginMiddleware,
  authController.loginController
);

router.patch(
  "/changepassword",
  authMiddleware.changePasswordMiddleware,
  authController.changePasswordController
);

module.exports = router;
