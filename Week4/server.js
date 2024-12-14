const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const uri = require("./db_uri");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDBConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("test").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
runDBConnection().catch(console.dir);

// Create a pizza
app.post("/api/pizza", async (req, res, next) => {
  try {
    const newPizza = req.body;

    const client = new MongoClient(uri);
    await client.connect();
    const collection = client.db("test").collection("menus");
    const result = await collection.insertMany(newPizza);
    
    const ids = result.insertedIds;
    res
      .status(200)
      .send({ message: "Menu created", ids: result.insertedCount });

    for (let id of Object.values(ids)) {
      console.log(`Inserted a menu with id ${id}`);
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create menu", details: err.message });
  } finally {
    // Close the connection
    await client.close();
  }
});

// TODO: Read
app.get("/api/menu", async (req, res) => {
    try {        
        const client = new MongoClient(uri);
        await client.connect();
        const menuName = client.db("test").collection("menus").findOne({name: res});
        console.log(menuName);
      } catch (err) {
        res
          .status(500)
          .send({ error: "Failed to get menus", details: err.message });
      } finally {
        // Close the connection
        await client.close();
      }      
});

// Update
// TODO Delete
app.delete("/api/delete/:id", async (req, res) => {
  try {
    
    const myPizza = req.body.id;
    console.log(myPizza);

    const client = new MongoClient(uri);
    await client.connect();
    const collection = client.db("test").collection("menus");

    const deleteResult = await collection.deleteOne(myPizza);

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ error: "pizza not found" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to delete item", details: err.message });
  } finally {
    // Close the connection
    await client.close();
  }
});

// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log("App is running on http://localhost " + port);
});
