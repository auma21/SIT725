const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const connectDB = require("./util/d_base").connectDB;

const PizzaRoutes = require("./routes/PizzaRoutes");

const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

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

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  // Emit random numbers every second
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    socket.emit("randomNumber", { number: randomNumber });
    console.log("Emmiting Number " + randomNumber);
  }, 1000);
});

connectDB()
  .then(() => {
    app.use("/pizza", PizzaRoutes);
    
    http.listen(PORT, () => {
      console.log(`address: http://localhost:${PORT}`);
    });
    
  })
  .catch((err) => console.error(err));

module.exports = {http, app};
