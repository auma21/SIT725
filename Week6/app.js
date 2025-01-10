const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const connectDB = require("./util/d_base").connectDB;

const PizzaRoutes = require("./routes/PizzaRoutes");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

connectDB()
  .then(() => {
    app.use("/pizza", PizzaRoutes);
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));


module.exports = app;