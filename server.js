// This will be your standard server.js file where you
// will initialize the server var mysql = require("mysql");

const express = require("express");
// Require routes

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


app.listen(PORT, function(error) {
  if (error) {
    console.log("Problem --->", error)
  } else {
    console.log(`App listening on PORT: ${PORT}`);
  }
  });