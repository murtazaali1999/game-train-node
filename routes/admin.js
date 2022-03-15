const express = require("express");

const router = express.Router();

router.get("/post/addproduct", async (req, res) => {
  res.send(`
  <form method='POST' action="/product">
        <div>
            <input type= 'text' name='product' />
            <button type='submit'> Add Product </button>
        </div>
  </form>
  `);
});

router.post("/product", async (req, res) => {
  res.send(req.body);
});

module.exports = router;
