const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const path = require("path");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

// Not good idea to expose password.
const dbURI =
  "mongodb+srv://admin:4t0RU02kBzNBG2if@clustersit725.4jpqj.mongodb.net/";

async function insertData() {
  const client = new MongoClient(dbURI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db("myDB");

    const collection = db.collection("pizzaMenu");

    const pizzas = [
      {
        name: "Margherita",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 8.99,
      },
      {
        name: "Pepperoni",
        ingredients: ["tomato", "mozzarella", "pepperoni"],
        price: 9.99,
      },
      {
        name: "Veggie Supreme",
        ingredients: ["tomato", "bell peppers", "onion", "olives"],
        price: 10.49,
      },
    ];

    // Insert the data
    const result = await collection.insertMany(pizzas);

    console.log(
      `${result.insertedCount} documents inserted:`,
      result.insertedIds
    );
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function fetchAllData() {
  const client = new MongoClient(dbURI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db("myDB");
    const collection = db.collection("pizzaMenu");

    // Fetch all documents from the collection
    const data = await collection.find().toArray();

    // Print the data
    console.log(data);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function createPizza(params) {
  const client = new MongoClient(dbURI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db("myDB");

    const collection = db.collection("pizzaMenu");

    const newPizza = [
      {
        name: register.body.name,
        ingredients: register.body.ingredients,
        price: register.body.price,
      },
    ];

    // Insert the data
    const result = await collection.insertOne(newPizza);

    console.log(
      `${result.insertedCount} documents inserted:`,
      result.insertedIds
    );
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

app.post("/api/pizza", (req, res) => {
  let pizza = req.body;
  insertData(pizza, (err, result) => {
    if (!err) {
      res.json({ statusCode: 201, data: result, message: "success" });
    }
  });
});

app.get("/api/pizzas", (req, res) => {
  fetchAllData((err, result) => {
    if (!err) {
      res.json({
        statusCode: 200,
        data: result,
        message: "get all pizzas successful",
      });
    }
  });
});

app.get("/api/pizzas", (req, res) => {
  fetchAllData((err, result) => {
    if (!err) {
      res.json({
        statusCode: 200,
        data: result,
        message: "get all pizzas successful",
      });
    }
  });
});

// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log("App is running on http://localhost " + port);
});
