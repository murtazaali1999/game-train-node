const express = require("express");
const fs = require("fs"); //fs = File System
const router = express.Router();

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

router.post("/signup", async (req, res) => {
  const { name, age, email, password } = req.body;
  const myObj = JSON.stringify(req.body);

  fs.writeFile("myJson.json", myObj, (err) => {
    err ? console.log(err.message) : console.log("Saved Sucessfully");
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let myObj = null;

  fs.readFile("myJson.json", "utf8", (err, data) => {
    const myObj = JSON.parse(data);
    console.log(myObj);
    console.log(
      myObj?.email,
      req.body.email,
      myObj?.password,
      req.body.password
    );
    myObj?.email == req.body.email && myObj?.password == req.body.password
      ? res.redirect("/welcomePage")
      : res.redirect("/get/signinForm");
  });
});

router.get("/welcomePage", async (req, res) => {
  res.send(`
    <h1>Welcome</h1>`);
});
module.exports = router;
