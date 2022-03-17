const fs = require("fs"); //fs = File System

module.exports = {
  loginController: async (req, res,next) => {
    const { email, password } = req.body; //destructuring

    fs.readFile("myJson.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list
      let userCheck = false;
      myList.map((user) => {
        console.log(user);
        if (user.email == email && user.password == password) {
          //checking if user exists or not
          userCheck = true;
        }
      });
      userCheck
        ? res.status(200).json({ message: "Welcome User" })
        : res.status(403).json({ message: "This user does not exist" });
    });
  },
};
