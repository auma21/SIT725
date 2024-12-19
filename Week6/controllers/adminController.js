const Pizza = require('../models/pizzaModel');

const getPizzas = async(req, res, next) => {
    Pizza.fetchAllPizzas()
      .then(pizzas => {
        res.render('admin/pizzas', {
          prods: pizzas,
          pageTitle: 'Admin Pizzas',
          path: '/admin/pizzas'
        });
      })
      .catch(err => console.log(err));
  };

  module.exports = {getPizzas}
  