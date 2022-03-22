const fs = require("fs"); //fs = File System
module.exports = {
  getProductEntity: async (req, res, next) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list

      if (myList?.length == 0) {
        return res.status(403).json({ message: "no data is existant" });
      } else {
        res.status(200).json({ message: myList });
      }
    });
  },
  getProductByIdEntity: async (req, res, next) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list
      let singleProduct = null;
      myList.map((product) => {
        if (product?.ID == req.body?.ID) {
          singleProduct = product;
        }
      });
      if (singleProduct == null) {
        return res
          .status(403)
          .json({ message: "product is not defined by this id" });
      } else {
        return res.status(200).json({ message: singleProduct });
      }
    });
  },
  getProductByNameEntity: async (req, res, next) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list
      let singleProduct = null;
      myList.map((product) => {
        if (product?.Name == req.body?.Name) {
          singleProduct = product;
        }
      });
      if (singleProduct == null) {
        return res
          .status(403)
          .json({ message: "product is not defined by this name" });
      } else {
        return res.status(200).json({ message: singleProduct });
      }
    });
  },
  getProductByPriceRangeEntity: async (req, res, next) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      const myList = JSON.parse(data); //parsing the string list into object list
      let products = [];
      myList.map((product) => {
        if (
          product?.Price >= Number(req.body?.min_price) &&
          product?.Price <= Number(req.body?.max_price)
        ) {
          products.push(product);
        }
      });
      if (products == null) {
        return res.status(403).json({
          message: "product is not defined by this min and max range",
        });
      } else {
        return res.status(200).json({ message: products });
      }
    });
  },
};
