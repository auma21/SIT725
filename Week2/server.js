const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

const addTwoNumber = (n1, n2) => {
  return n1 + n2;
};

app.get("/addTwoNumber", (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  const result = addTwoNumber(n1, n2);
  console.log("and this matches too");
  res.json({ statuscocde: 200, data: result });
});

// Basic routes for calculator operations
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Calculator API! Use endpoints /add, /subtract, /multiply, /divide."
  );
});

// Addition
app.get("/add", (req, res) => {
  const { n1, n2 } = req.query;
  const result = parseFloat(n1) + parseFloat(n2);
  res.json({ statuscocde: 200, data: result });
});

// Subtraction
app.get("/subtract", (req, res) => {
  const { n1, n2 } = req.query;
  const result = parseFloat(n1) - parseFloat(n2);
  res.json({ statuscocde: 200, data: result });
});

// Multiplication
app.get("/multiply", (req, res) => {
  const { n1, n2 } = req.query;
  const result = parseFloat(n1) * parseFloat(n2);
  res.json({ statuscocde: 200, data: result });
});

// Division
app.get("/divide", (req, res) => {
  const { n1, n2 } = req.query;
  if (parseFloat(n2) === 0) {
    result = "Division by zero is not allowed.";
    res.json({ statuscocde: 404, result: result });
  } else {
    const result = parseFloat(n1) / parseFloat(n2);
    res.json({ statuscocde: 200, data: result });
  }
});

//GET About 
app.get('/about', function(req, res){
  res.send("About us");
});

// POST - Create a new data
app.post('/post', function (req, res) {
  res.send('New post created')
})

// PUT - Update a data
app.put('post/postid', function (req, res) {
  res.send('PUT request to putpage')
})

// Handle invalid routes
app.use((req, res) => {
  result =
    "Invalid endpoint. Please use /add, /subtract, /multiply, or /divide.";
  res.json({ statuscocde: 404, result: result });
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
