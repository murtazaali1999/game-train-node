const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); //for using body parser
/* app.use(express.json({})); */ // for parsing json

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
