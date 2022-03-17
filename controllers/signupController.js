const fs = require("fs"); //fs = File System

module.exports = {
  signupController: async (req, res,next) => {
    
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
              : res.status(200).json({ message: "Credentials saved successfully" });
          });
        }
      });
  },
};
