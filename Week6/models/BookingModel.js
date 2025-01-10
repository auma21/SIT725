const getDB = require("../util/d_base").getDB;
const { ObjectId } = require("mongodb");

class Booking {  
  static async createBooking(booking) {
    const db = getDB();
    return await db.collection("bookings").insertOne(booking);
    
  }
 
  static async findById(bookingId) {
    const db = getDB();
    return await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(bookingId) });
  }

   // Fetch all 
   static async findAllActiveBookings(page, limit) {
    const db = getDB();
    const bookings = await db
      .collection("bookings")
      .find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    const total = await db
      .collection("bookings")
      .countDocuments({ isActive: true });

    return { bookings, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
  
}

module.exports = Booking;
