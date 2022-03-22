const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); //for parsing object (strings/arrays), on POST/PUT request
app.use(express.json({})); // for parsing json object, on POST/PUT request
const validator = require("validator");

const admin = require("./routes/admin");
const shop = require("./routes/shop");
const auth = require("./routes/auth");

app.use([admin, shop, auth]);

const PORT = 4444;

app.listen(PORT, async () => {
  console.log(`Server is running on port #${PORT}`);
});

app.get("/", async (req, res) => {
  res.send(`
    <h1>Welcome Page</h1>`);
});

app.post("/testRoute", async (req, res) => {
  console.log(req.body);
});
