const fs = require("fs"); //fs = File System

module.exports = {
  addProductEntity: async (req, res, next) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      if (data.length == 0) {
        console.log("no data in exsiting file");
        const myList = [];
        myList.push(req.body);
        fs.writeFile("products.json", JSON.stringify(myList), (err) => {
          err
            ? console.log(err.message)
            : console.log("Product Saved Sucessfully");
        });
      } else {
        const myList = JSON.parse(data);
        myList.push(req.body);
        const newList = JSON.stringify(myList);
        fs.writeFile("products.json", newList, (err) => {
          err
            ? res
                .status(500)
                .json({ message: "There was an error saving credentials" })
            : res.status(200).json({ message: "Product saved successfully" });
        });
      }
    });
  },
};
