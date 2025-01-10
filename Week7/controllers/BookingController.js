const Booking = require("../models/BookingModel");

const handleCreateBooking = [
  async (req, res) => {
    const {
      name,
      email,
      restaurantName,
      contactPhone,
      specialRequest,
      pizzas,
    } = req.body;

    // Validate inputs
    if (!name || !email || !pizzas) {
      return res.status(400).render("pizza_form", {
        pageTitle: "Booking",
        message: "All fields are required.",
      });
    }

    console.log("req.body:", req.body);
    const sanitizedData = {
      name: req.body.name,
      restaurantName: req.body.restaurantName,
      email: req.body.email,
      contactPhone: req.body.contactPhone,
      specialRequest: req.body.specialRequest.replace(/[<>]/g, ""),
      pizzas: req.body.pizzas,
      pizzaImageUrl: req.body.pizzaImageUrl,
      isActive: true,
      dateCreated: new Date(),
      dateModified: new Date(),
    };

    try {
      await Booking.createBooking(sanitizedData);

      res.redirect("/pizza/bookings");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Error creating booking.");
    }
  },
];

// Render create a restaurant
const renderCreateBooking = [
  (req, res) => {
    const pizzaOptions = [
      "The Lot",
      "Peri Peri Chicken",
      "Mega Meatlovers",
      "Loaded supreme",
      "Beef & Bacon Burger",
      "Garlic Prawn",
    ];
    res.render("pizza_form", {
      pageTitle: "Book Pizza",
      restaurantName: "Domino",
      contactName: "Chris Ajai",
      email: "ChrisAjai@email.com",
      phone: "123 456 789",
      pizzaOptions,
      message: null,
    });
  },
];

const renderActiveBookings = [
  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    try {
      const { bookings, total } = await Booking.findAllActiveBookings(
        page,
        limit
      );

      const totalPages = Math.ceil(total / limit);

      res.render("bookings", {
        pageTitle: "Bookings",
        bookings,
        currentPage: page,
        totalPages,
        total,
        limit,
      });
    } catch (err) {
      res.status(500).render("bookings", {
        pageTitle: "Bookings",
        message: err.message,
      });
    }
  },
];

module.exports = { renderActiveBookings, renderCreateBooking, handleCreateBooking };