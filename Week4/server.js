const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

// db connection
const uri =
  "mongodb+srv://admin:4t0RU02kBzNBG2if@clustersit725.4jpqj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSIT725";

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Create a pizza
app.post("/api/menu", async (req, res, next) => {
  try {
    const newMenu = req.body;

    const client = new MongoClient(uri);

    await client.connect();

    const collection = client.db("test").collection("menus");

    const result = await collection.insertMany(newMenu);

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
app.get("/api/menus", async (req, res) => {
    try {
        
        const client = new MongoClient(uri);
        await client.connect();
        const menus = client.db("test").collection("menus").find({});
        res.status(200).json(menus);
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
