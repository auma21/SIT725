const express = require("express");
const path = require("path");
const connectDB = require("./util/d_base").connectDB;

const app = express();
var port = process.env.port || 3000;

const adminRoutes = require('./routes/adminRoute');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);

// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


connectDB(() => {
  app.listen(port, () => {
    console.log("App is running on http://localhost " + port);
  });
});
