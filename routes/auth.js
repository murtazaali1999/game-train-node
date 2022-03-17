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

  fs.readFile("myJson.json", "utf8", (err, data) => {
    if (data.length == 0) {
      console.log("no data in exsiting file");
      //if file already exists
      //make list here
      //also insert
      const myList = [];
      myList.push(req.body);
      fs.writeFile("myJson.json", JSON.stringify(myList), (err) => {
        err ? console.log(err.message) : console.log("Saved Sucessfully");
      });
    } else {
      console.log("data in exsiting file");
      //take list and insert
      const myList = JSON.parse(data);
      myList.push(req.body);
      const newList = JSON.stringify(myList);
      fs.writeFile("myJson.json", newList, (err) => {
        err ? res.status(400).json({message:"There was an error saving credentials"}) : res.status(200).json({message:"Credentials saved successfully"})
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let myObj = null;

  fs.readFile("myJson.json", "utf8", (err, data) => {
    const myList = JSON.parse(data);
    let userCheck = false;
    myList.map((user) => {
      console.log(user)
      if (user.email == email && user.password == password) {
        userCheck = true;
      }
    });
    userCheck ? res.status(200).json({message:"Welcome User"}) : res.status(403).json({message:"This user does not exist"});
  });
});

router.get("/welcomePage", async (req, res) => {
  res.send(`
    <h1>Welcome</h1>`);
});
module.exports = router;
