const fs = require("fs"); //fs = File System
module.exports = {
  loginEntity: async (req, res, next) => {
    fs.readFile("myJson.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list
      let userCheck = false;
      myList.map((user) => {
        console.log(user);
        if (
          user.email == req.body.email &&
          user.password == req.body.password
        ) {
          //checking if user exists or not
          userCheck = true;
        }
      });
      userCheck
        ? res.status(200).json({ message: "Welcome User" })
        : res.status(403).json({ message: "This user does not exist" });
    });
  },
  signupEntity: async (req, res, next) => {
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
          err
            ? res
                .status(500)
                .json({ message: "There was an error saving credentials" })
            : res
                .status(200)
                .json({ message: "Credentials saved successfully" });
        });
      }
    });
  },
  changePasswordEntity: async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;

    fs.readFile("myJson.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list
      let userCheck = false;
      const newList = myList.map((user) => {
        console.log(user);
        if (user.email == email && user.password == oldPassword) {
          //checking if user exists or not
          userCheck = true;
          user.password = newPassword;
        }
      });

      userCheck
        ? fs.writeFile("myJson.json", JSON.stringify(myList), () => {
            console.log("password updated successfully");
          })
        : console.log("there was an error saving this password");

      userCheck
        ? res
            .status(200)
            .json({ message: "Your Password has been updated successfully" })
        : res.status(403).json({ message: "This user does not exist" });
    });
  },
};
