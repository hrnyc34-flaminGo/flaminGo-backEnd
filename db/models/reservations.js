const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;
const db = require('../../db');

const reservationsSchema = new Schema({
  bookingGuest: {type: Object, required: true},
  'room_id': {type: ObjectId},
  'roomType_id': {type: ObjectId, required: true},
  checkIn: {type: Date, required: true},
  checkOut: {type: Date, required: true},
  guestList: {type: Array, default: []},
  totalCost: {type: Number, default: 0}
}, {
  versionKey: false
});

const Reservation = mongoose.model('Reservation', reservationsSchema);

Reservation.find().limit(10).exec().then( res => console.log(res));

module.exports = Reservation;
