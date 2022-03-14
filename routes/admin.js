const express = require("express");

const router = express.Router();

router.post("/post/addproduct", async (req, res) => {
  res.write(
    "<html><form metod =`POST` action=`/product` ><input type=`submit`/><button type=`submit`></button></form></html>"
  );
  next();
});

module.exports = router;
