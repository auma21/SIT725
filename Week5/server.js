const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log("App is running on http://localhost " + port);
});
