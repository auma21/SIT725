const express = require("express");
const router = express.Router();
const {
  handleCreateBooking,
  renderActiveBookings,
  renderCreateBooking,
} = require("../controllers/BookingController");


  // Pizza routes
  router.get("/booking", renderCreateBooking);
  router.get("/bookings", renderActiveBookings);

  router.post("/booking", handleCreateBooking);


module.exports =  router;
