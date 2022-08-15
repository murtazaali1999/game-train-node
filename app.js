//Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const index = require("./library/index");

require("dotenv").config();

//ENV//
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

//Middlewares//
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cors());

//Models
require("./models/transactionsModel");

//Routes//
const transaction = require("./routes/tranasactionsRoutes");
app.use([transaction]);

//Connection//
mongoose.connect(MONGOURI, () => {
  console.log("MongoDB connection made successfully");
  app.listen(PORT, () => {
    console.log(`Server is running on port #${PORT}`);
  });
});

//TestConnection//
app.get("/", async (req, res) => {
  res.send("<h1>Connection Working</h1>");
});
