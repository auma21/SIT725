const mongodb = require("mongodb");
const getDB = require("../util/d_base").getDB;
const ObjectId = mongodb.ObjectId;

async function fetchAllPizzas() {
  const pizzas = await getDB().collection("pizzas")
    .find()
    .toArray()
    .then((pizzas) => {
      // console.log(pizzas);
      return pizzas;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {fetchAllPizzas};