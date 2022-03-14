const express = require("express");

const router = express.Router();

router.post("/product", async (req, res, next) => {
  console.log(req.body);
  next();
});

module.exports = router;
