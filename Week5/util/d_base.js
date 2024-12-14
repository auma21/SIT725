const uri = require("./db_uri").uri;

const { MongoClient, ServerApiVersion } = require("mongodb");

let _db;

// Create a new MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = callback => {
    client.connect()
    .then(client =>{
      _db = client.db();
      console.log("Connected to MongoDB");
      callback();
    })  
  .catch(error => {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  })
};


const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.connectDB = connectDB;
exports.getDB = getDB;
