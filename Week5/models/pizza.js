const mongodb = require("mongodb");
const getDB = require("../util/d_base").getDB;
const ObjectId = mongodb.ObjectId;

class Pizza {
  constructor(name, price, id, ingredients) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;    
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDB();
    return db.collection("pizzas").insertOne(this);
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("pizzas")
      .find()
      .toArray()
      .then((pizzas) => {
        console.log(pizzas);
        return pizzas;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(pizzaId) {
    const db = getDB();
    return db
      .collection('pizzas')
      .find({ _id: new mongodb.ObjectId(pizzaId) })
      .next()
      .then(pizza => {
        console.log(pizza);
        return pizza;
      })
      .catch(err => {
        console.log(err);
      });
  }
  
}

exports.Pizza = Pizza;
