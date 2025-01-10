const uri = require("./db_uri").uri;
const { MongoClient, ServerApiVersion } = require("mongodb");

const aum_db_Name = "week6";

let _db;

const connectDB = async () => {
  // Create a new MongoClient instance
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  _db = client.db(aum_db_Name);
  console.log("Connected to MongoDB");
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

const closeDB = async (client) => {
  await client.close();
  console.log("MongoDB connection closed");
};

module.exports = { connectDB, getDB, closeDB };
