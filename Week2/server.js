var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

const addTwoNumber = (n1, n2) => {
  return n1 + n2;
};

app.put("/", (req, res) => {
  res.send("PUT request to homepage");
});

app.post("/", (req, res) => {
  res.send("POST request to homepage");
});

app.get("/addTwoNumber", (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  const result = addTwoNumber(n1, n2);
  console.log("and this matches too");
  res.json({ statuscocde: 200, data: result });
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
