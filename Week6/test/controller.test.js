const { connectDB, getDB } = require('../util/d_base');
const { expect } = require('chai');
const { createBooking } = require('../models/BookingModel');

describe('Controller Testing', function () {
    before(async function () {
        await connectDB();
        const db = getDB();
        
    });


    it('should create a booking', async function () {
        const mockRequest = {
            body: {
                name: 'John',
                restaurantName: 'Domino',
                email: 'john@example.com',
                pizzas: 'Pepperoni',
            },
        };

        const booking = await createBooking(mockRequest.body);        
        expect(booking.insertedId).to.not.be.undefined;        
    });
});