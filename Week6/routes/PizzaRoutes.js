const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController");

// Pizza routes
router.get("/booking", BookingController.renderCreateBooking);
router.get("/bookings", BookingController.renderActiveBookings);

router.post("/booking", BookingController.handleCreateBooking);

module.exports = router;
