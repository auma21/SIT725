const { connectDB, getDB } = require('../util/d_base');
const { createBooking, findAllActiveBookings } = require('../models/BookingModel');
const chai = require('chai');
const expect = chai.expect;

describe('Model Testing', function () {
    before(async function () {
        await connectDB();
    });

    after(async function () {
        const db = getDB();        
        
    });

    it('should insert a new booking into the database', async function () {
        const booking = {
            name: 'Jane',
            restaurantName: 'Domino',
            email: 'jane@example.com',
            pizzas: 'BBQ Chicken',
        };
        const result = await createBooking(booking);
        expect(result.insertedId).to.not.be.null;
    });

    it('should return the correct total count of bookings', async function () {
        const totalBookings = await findAllActiveBookings(1, 10);             
        expect(totalBookings.total).to.greaterThan(1);
    });

    it('should retrieve the first page of bookings with a limit of 10', async function () {
        const bookings = await findAllActiveBookings(1, 10);        
        expect(bookings.limit).to.equal(10);
        expect(bookings.bookings[0].name).to.equal('Chris Ajai');
    });


});