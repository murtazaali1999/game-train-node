const express = require("express");
const router = express.Router();

//importing all controllers
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");

//importing all middleware
const loginMiddleware = require("../middlewares/loginMiddleware");
const signupMiddleware = require("../middlewares/signupMiddleware");

//defining routes
router.post("/signup",signupMiddleware.signupMiddleware,signupController.signupController)
router.post("/login",loginMiddleware.loginMiddleware,loginController.loginController);


//old code
router.get("/get/signupForm", async (req, res) => {
  return res.send(` <form method='POST' action="/signup">
    <div>
        <label>Name</label>
        <input type= 'text' name='name' />

        
        <label>Age</label>;
        <input type= 'text' name='age' />

        <label>Email</label>
        <input type= 'text' name='email' />
       
        
        <label>Password</label> 
        <input type= 'text' name='password' />


        <button type='submit'>Sumbit & Save</button>
    </div>
</form>`);
});
router.get("/get/signinForm", async (req, res) => {
  res.send(` <form method='POST' action="/signin">
    <div>
        <label>Email</label>
        <input type= 'text' name='email' />
       
        <label>Password</label> 
        <input type= 'text' name='password' />

        <button type='submit'> Submit </button>
    </div>
</form>`);
});
router.get("/welcomePage", async (req, res) => {
  res.send(`
    <h1>Welcome</h1>`);
});
module.exports = router;
