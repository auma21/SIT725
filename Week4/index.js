let express = require("express");
let app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = require("./db_uri");
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db("test").collection("menus");
    console.log("connected to the db");
  } catch (ex) {
    console.error(ex);
  }
}

// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/menus", (req, res) => {
  getAllPizzas((err, result) => {
    if (!err) {
      res.json({
        statusCode: 200,
        data: result,
        message: "get all cats successful",
      });
    }
  });
});

function postPizza(cat, callback) {
  collection.insertOne(cat, callback);
}

function getAllPizzas(callback) {

  collection.find({}).toArray(callback);
}

app.listen(port, () => {
  console.log("express server started");
  runDBConnection();
});
