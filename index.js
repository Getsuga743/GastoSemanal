
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.redirect("/");
  res.sendFile("/public/index.html")
  
});

app.listen(4000, function () {
  console.log("Server started in port 4000");
});









